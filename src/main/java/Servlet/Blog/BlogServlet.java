package Servlet.Blog;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.Blog;
import Dao.BlogDao;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
@WebServlet("/blog")
public class BlogServlet extends HttpServlet {
    private ObjectMapper objectMapper=new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //从数据库中查询到博客列表，转成json格式，直接返回
        //查询数据库
        BlogDao blogDao=new BlogDao();
        List<Blog> blogs= null;
        try {
            blogs = blogDao.selectAll();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        //将blogs转成json格式
        String respJson=objectMapper.writeValueAsString(blogs);
        resp.setContentType("application/json;charset=utf8");
        resp.setStatus(200);
        resp.getWriter().write(respJson);
    }
}