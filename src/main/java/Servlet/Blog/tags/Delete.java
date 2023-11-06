package Servlet.Blog.tags;


import Dao.BlogDao;
import Dao.TagDao;
import model.Blog;
import model.Tag;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/tag/delete")
public class Delete extends HttpServlet{
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) {
        int id = Integer.parseInt(req.getParameter("articleID"));
        String name = req.getParameter("tagName");
        BlogDao blogDao = new BlogDao();
        TagDao tagDao = new TagDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null) {
                Tag tag = tagDao.selectOne(blog.getBlogId(), name);
                if (tag != null) {
                    tagDao.delete(tag.getTagId());
                    resp.setStatus(200);
                } else {
                    resp.setStatus(106);
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
