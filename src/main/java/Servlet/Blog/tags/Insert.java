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

@WebServlet("/tag/insert")
public class Insert extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        int id = Integer.parseInt(req.getParameter("articleID"));
        String name = req.getParameter("tagName");
        BlogDao blogDao = new BlogDao();
        TagDao tagDao = new TagDao();
        try {
            Blog blog = blogDao.selectOne(id);
            if (blog != null) {
                Tag tag = new Tag();
                tag.setName(name);
                tag.setBlogId(blog.getBlogId());
                tagDao.insert(tag);
                resp.setStatus(200);
            } else {
                resp.setStatus(104);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
