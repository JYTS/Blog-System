package Servlet.Blog.Blog;

import Dao.BlogDao;
import model.Blog;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/blog/delete")
public class Delete extends HttpServlet{
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = Integer.parseInt(req.getParameter("id"));

        BlogDao blogDao = new BlogDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null) {
                blogDao.delete(id);
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
