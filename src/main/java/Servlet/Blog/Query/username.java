package Servlet.Blog.Query;

import Dao.BlogDao;
import Dao.UserDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Blog;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Random;

@WebServlet("/query/username")
public class username extends HttpServlet{
    private ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String username = req.getParameter("username");

        BlogDao blogDao = new BlogDao();
        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(username);
            if (user != null){
                List<Blog> blogs= blogDao.selectFromUserId(user.getUserId());
                ObjectNode outputJson = JsonNodeFactory.instance.objectNode();
                ArrayNode arrayNode = outputJson.putArray("blogs");
                for (Blog blog : blogs) {
                    ObjectNode json = JsonNodeFactory.instance.objectNode();
                    json.put("id", blog.getBlogId());
                    json.put("title", blog.getTitle());
                    arrayNode.add(json);
                }
                String respJson = objectMapper.writeValueAsString(outputJson);
                resp.setContentType("application/json;charset=utf8");
                resp.getWriter().write(respJson);
                resp.setStatus(200);
            } else {
                resp.setStatus(102);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
