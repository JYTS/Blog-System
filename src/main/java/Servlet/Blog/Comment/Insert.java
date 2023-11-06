package Servlet.Blog.Comment;

import Dao.BlogDao;
import Dao.CommentDao;
import Dao.UserDao;
import model.Blog;
import model.Comment;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/comment/insert")
public class Insert extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        int id = Integer.parseInt(req.getParameter("articleid"));
        String username = req.getParameter("username");
        String content = req.getParameter("text");
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
                if (blog == null)
                    resp.setStatus(104);
                else
                    resp.setStatus(102);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
