package Servlet.Blog.tags;

import Dao.BlogDao;
import Dao.TagDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Blog;
import model.Tag;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/tag/getTags")
public class Gets extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("article_id"));

        BlogDao blogDao = new BlogDao();
        TagDao tagDao = new TagDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null){
                List<Tag> tags = tagDao.selectFromBlog(id);
                ObjectNode outputJson = JsonNodeFactory.instance.objectNode();
                outputJson.put("article_id", blog.getBlogId());
                ArrayNode arrayNode = outputJson.putArray("tags");
                for (Tag tag : tags){
                    ObjectNode json = JsonNodeFactory.instance.objectNode();
                    json.put("tag", tag.getName());
                    arrayNode.add(json);
                }
                String respJson = objectMapper.writeValueAsString(outputJson);
                resp.setContentType("application/json;charset=utf8");
                resp.getWriter().write(respJson);
                resp.sendError(403);
            } else {
                resp.sendError(403);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.sendError(403);
        }
    }
}
