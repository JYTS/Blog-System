package Servlet.Blog.Blog;

import Dao.BlogDao;
import model.Blog;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/blog/delete")
public class Delete extends HttpServlet{
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        int id = Integer.parseInt(req.getParameter("id"));
        BlogDao blogDao = new BlogDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null) {
                try {
                    blogDao.delete(id);
                    resp.setStatus(200);
                } catch (SQLException e) {
                    e.printStackTrace();
                    resp.setStatus(101);
                }

            } else {
                resp.setStatus(104);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
