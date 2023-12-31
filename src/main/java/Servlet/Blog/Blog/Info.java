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
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/blog/info")
public class Info extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));

        BlogDao blogDao = new BlogDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null) {
                UserDao userDao = new UserDao();
                User user = userDao.selectOne(blog.getUserId());
                ObjectNode json = JsonNodeFactory.instance.objectNode();
                json.put("id", blog.getBlogId());
                json.put("title", blog.getTitle());
                json.put("content", blog.getContent());
                json.put("author", user.getUserName());
                json.put("authorId", blog.getUserId());
                json.put("date", blog.getPostTime().toString());
                String respJson=objectMapper.writeValueAsString(json);
                resp.setContentType("application/json;charset=utf8");
                resp.getWriter().write(respJson);
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
