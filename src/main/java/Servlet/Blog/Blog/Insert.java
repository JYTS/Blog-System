package Servlet.Blog.Blog;

import Dao.BlogDao;
import Dao.UserDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
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

@WebServlet("/blog/insert")
public class Insert extends HttpServlet{
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

        String title = jsonNode.get("title").asText();
        String username = jsonNode.get("username").asText();

        BlogDao blogDao = new BlogDao();
        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(username);
            if (user != null) {
                Blog blog = new Blog();
                blog.setTitle(title);
                blog.setContent("");
                blog.setUserId(user.getUserId());
                blogDao.insert(blog);
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
