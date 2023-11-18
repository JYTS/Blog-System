package Servlet.Blog.tags;

import Dao.TagDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Tag;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/tag/getnTags")
public class Getsn extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int num = Integer.parseInt(req.getParameter("num"));

        TagDao tagDao = new TagDao();
        try {
            List<Tag> tags = tagDao.selectAll();
            ObjectNode outputJson = JsonNodeFactory.instance.objectNode();
            ArrayNode arrayNode = outputJson.putArray("tags");
            for (Tag tag : tags){
                if (num > 0){
                    num--;
                } else {
                    break;
                }
                ObjectNode json = JsonNodeFactory.instance.objectNode();
                json.put("tag", tag.getName());
                arrayNode.add(json);
            }
            String respJson = objectMapper.writeValueAsString(outputJson);
            resp.setContentType("application/json;charset=utf8");
            resp.getWriter().write(respJson);
            resp.sendError(403);
        } catch (SQLException e) {
            e.printStackTrace();
            resp.sendError(403);
        }
    }
}
