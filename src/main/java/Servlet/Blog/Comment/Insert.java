package Servlet.Blog.Comment;

import Dao.BlogDao;
import Dao.CommentDao;
import Dao.UserDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Blog;
import model.Comment;
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

@WebServlet("/comment/insert")
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

        int id = jsonNode.get("articleid").asInt();
        String username = jsonNode.get("username").asText();
        String content = jsonNode.get("text").asText();

        BlogDao blogDao = new BlogDao();
        UserDao userDao = new UserDao();
        CommentDao commentDao = new CommentDao();
        try {
            User user = userDao.selectOne(username);
            Blog blog = blogDao.selectOne(id);
            if (user != null && blog != null) {
                Comment comment = new Comment();
                comment.setUserId(user.getUserId());
                comment.setBlogId(blog.getBlogId());
                comment.setContent(content);
                commentDao.insert(comment);
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
