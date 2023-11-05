package Test;
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
import java.sql.Timestamp;

@WebServlet("/insert")
public class TestInsert extends HttpServlet {
    private ObjectMapper objectMapper=new ObjectMapper();
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        BlogDao blogDao=new BlogDao();
        Blog blog = new Blog();
        blog.setBlogId(1);
        blog.setContent("你好");
        blog.setTitle("测试博客");
        blog.setUserId(1);
        blog.setPostTime(Timestamp.valueOf("2023-10-17 2:18:13"));
        try {
            blogDao.insert(blog);
            resp.getWriter().write("succeed");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}