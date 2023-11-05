package Servlet;
import Dao.UserDao;
import model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
@WebServlet("/userLogin")
public class UserLoginServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String loginName = req.getParameter("username");
        String loginPwd = req.getParameter("password");

        UserDao userDao = new UserDao();
        User user = null;
        try {
            user = userDao.getPassword(loginName);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        if (user != null) {
            if (loginPwd.equals(user.getPassword())) {
                resp.setStatus(200);
            } else {
                resp.setStatus(102);
            }
        } else{
            resp.setStatus(101);
        }
    }
}
