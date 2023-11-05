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

@WebServlet("/user/login")
public class Login extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String loginName = req.getParameter("username");
        String loginPwd = req.getParameter("password");

        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(loginName);
            if (user != null) {
                if (loginPwd.equals(user.getPassword())) {
                    resp.setStatus(200);
                } else {
                    resp.setStatus(103);
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
