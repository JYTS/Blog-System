package Servlet.User;

import Dao.UserDao;
import model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/user/register")
public class UserRegisterServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String name = req.getParameter("username");
        String pwd = req.getParameter("password");
        String email = req.getParameter("email");

        UserDao userDao = new UserDao();
        try {
            User user = userDao.getUser(name);
            if (user == null) {
                user = new User();
                user.setUserName(name);
                user.setPassword(pwd);
                user.setEmail(email);
                try {
                    userDao.insert(user);
                    resp.setStatus(200);
                } catch (SQLException e) {
                    e.printStackTrace();
                    resp.setStatus(101);
                }
            } else {
                resp.setStatus(102);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
