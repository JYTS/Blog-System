package Servlet.Blog.Comment;

import Dao.CommentDao;
import model.Comment;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/comment/delete")
public class Delete extends HttpServlet{
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        int id = Integer.parseInt(req.getParameter("Comment_id"));
        CommentDao commentDao = new CommentDao();
        try {
            Comment comment = commentDao.selectOne(id);
            if (comment != null) {
                commentDao.delete(comment.getCommentId());
                resp.setStatus(200);
            } else {
                resp.setStatus(105);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
