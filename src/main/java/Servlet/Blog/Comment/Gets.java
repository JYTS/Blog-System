package Servlet.Blog.Comment;

import Dao.BlogDao;
import Dao.CommentDao;
import Dao.UserDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Blog;
import model.Comment;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/comment/getComments")
public class Gets extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("articleid"));

        BlogDao blogDao = new BlogDao();
        CommentDao commentDao = new CommentDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null){
                UserDao userDao = new UserDao();
                List<Comment> comments = commentDao.selectFromBlog(id);
                ObjectNode outputJson = JsonNodeFactory.instance.objectNode();
                outputJson.put("article_id", id);
                ArrayNode arrayNode = outputJson.putArray("comments");
                for (Comment comment : comments){
                    ObjectNode json = JsonNodeFactory.instance.objectNode();
                    json.put("comment_id", comment.getCommentId());
                    User user = userDao.selectOne(comment.getUserId());
                    json.put("user_name", user.getUserName());
                    json.put("comment_text", comment.getContent());
                    json.put("timestamp", comment.getDatetime().toString());
                    arrayNode.add(json);
                }
                String respJson = objectMapper.writeValueAsString(outputJson);
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
