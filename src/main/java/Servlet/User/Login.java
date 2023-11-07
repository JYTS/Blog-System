package Servlet.User;

import Dao.UserDao;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;

@WebServlet("/user/login")
public class Login extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        String loginName = req.getParameter("username");
        String loginPwd = req.getParameter("password");

        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(loginName);
            if (user != null) {
                System.out.println("------准备判断密码---------");
                if (loginPwd.equals(user.getPassword())) {
                    resp.setStatus(200);
                } else {
                    resp.setStatus(103);
                }
                System.out.println("------判断密码结束---------");
            } else {
                resp.setStatus(102);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
