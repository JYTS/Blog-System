package Servlet.Blog.Blog;

import Dao.BlogDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Blog;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Random;

@WebServlet("/blog/rand")
public class Rand extends HttpServlet{
    private ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int num = Integer.parseInt(req.getParameter("number"));

        BlogDao blogDao = new BlogDao();
        try {
            List<Blog> blogs= blogDao.selectAll();
            ObjectNode outputJson = JsonNodeFactory.instance.objectNode();
            ArrayNode arrayNode = outputJson.putArray("blogid");
            if (num < blogs.size()) {
                int size = blogs.size();
                Random random = new Random();
                for (; num>0; num--){
                    int randomIndex = random.nextInt(blogs.size());
                    Blog blog = blogs.get(randomIndex);
                    ObjectNode json = JsonNodeFactory.instance.objectNode();
                    json.put("id", blog.getBlogId());
                    arrayNode.add(json);
                }
            } else {
                for (Blog blog : blogs) {
                    ObjectNode json = JsonNodeFactory.instance.objectNode();
                    json.put("id", blog.getBlogId());
                    arrayNode.add(json);
                }
            }
            resp.getWriter().write(String.valueOf(outputJson));
            resp.setStatus(200);
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
