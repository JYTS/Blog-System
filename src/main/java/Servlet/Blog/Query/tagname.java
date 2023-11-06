package Servlet.Blog.Query;

import Dao.BlogDao;
import Dao.TagDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Blog;
import model.Tag;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@WebServlet("/query/tagname")
public class tagname extends HttpServlet{
    private ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String name = req.getParameter("tagname");

        BlogDao blogDao = new BlogDao();
        TagDao tagDao = new TagDao();
        try {
            ObjectNode outputJson = JsonNodeFactory.instance.objectNode();
            ArrayNode arrayNode = outputJson.putArray("blogs");
            Set<Integer> unique = new HashSet<>();
            List<Tag> tags = tagDao.selectFromName(name);
            for (Tag tag : tags) {
                unique.add(tag.getBlogId());
            }
            for (Integer id : unique) {
                ObjectNode json = JsonNodeFactory.instance.objectNode();
                Blog blog = blogDao.selectOneInfo(id);
                json.put("id", blog.getBlogId());
                json.put("title", blog.getTitle());
                arrayNode.add(json);
            }
            String respJson = objectMapper.writeValueAsString(outputJson);
            resp.setContentType("application/json;charset=utf8");
            resp.getWriter().write(respJson);
            resp.setStatus(200);
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
