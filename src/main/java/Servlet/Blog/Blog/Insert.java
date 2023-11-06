package Servlet.Blog.Blog;

import Dao.BlogDao;
import Dao.UserDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import model.Blog;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/blog/insert")
public class Insert extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        String title = req.getParameter("title");
        String username = req.getParameter("username");
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
                resp.setStatus(102);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
