package Servlet.User;

import Dao.UserDao;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.Enumeration;

@WebServlet("/user/register")
public class Register extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        Enumeration<String> names = req.getParameterNames();
        while (names.hasMoreElements()) {
            String o = names.nextElement();
            System.out.println(1);
            System.out.println(o);
            System.out.println(req.getParameter(o));
        }
        String name = req.getParameter("username");
        String pwd = req.getParameter("password");
        String email = req.getParameter("email");

        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(name);
            if (user == null) {
                user = new User();
                user.setUserName(name);
                user.setPassword(pwd);
                user.setEmail(email);
                userDao.insert(user);
                resp.setStatus(200);
                System.out.println("------注册成功----------");
            } else {
                resp.setStatus(102);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.setStatus(101);
        }
    }
}
