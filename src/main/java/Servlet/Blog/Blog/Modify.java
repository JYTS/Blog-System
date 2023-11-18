package Servlet.Blog.Blog;

import Dao.BlogDao;
import Dao.UserDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Blog;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;

@WebServlet("/blog/modify")
public class Modify extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        InputStream inputStream = req.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        String line;
        StringBuilder stringBuilder = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String jsonString = stringBuilder.toString();
        JsonNode jsonNode = objectMapper.readTree(jsonString);

        int blogId = jsonNode.get("articleid").asInt();
        String title = jsonNode.get("title").asText();
        String username = jsonNode.get("username").asText();
        String content = jsonNode.get("content").asText();
        int parts = jsonNode.get("allnum").asInt();
        int index = jsonNode.get("index").asInt();

        BlogDao blogDao = new BlogDao();
        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(username);
            Blog blog = blogDao.selectOne(blogId);
            if (user != null && blog != null) {
                blog.setUserId(user.getUserId());
                blog.setTitle(title);
                String content_old = blog.getContent();
                if (content_old.length() <= index * 1500) {
                    int len = index * 1500 - content_old.length();
                    String content_new = content_old;
                    if (len > 0){
                        String space = new String(new char[len]).replace('\0', ' ');
                        content_new += space;
                    }
                    content_new += content;
                    blog.setContent(content_new);
                } else {
                    String content_new = content_old.substring(0, index * 1500);
                    content_new += content;
                    if (content_old.length() > (index + 1) * 1500) {
                        content_new += content_old.substring((index + 1) * 1500);
                    }
                    blog.setContent(content_new);
                }
                resp.setStatus(200);
            } else {
                resp.sendError(403);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.sendError(403);
        }
    }
}
