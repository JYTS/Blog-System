package Servlet.User;

import Dao.UserDao;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;

@WebServlet("/user/login")
public class Login extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        InputStream inputStream = req.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        String line;
        StringBuilder stringBuilder = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String jsonString = stringBuilder.toString();
        JsonNode jsonNode = objectMapper.readTree(jsonString);

        String loginName = jsonNode.get("username").asText();
        String loginPwd = jsonNode.get("password").asText();

        UserDao userDao = new UserDao();
        try {
            User user = userDao.selectOne(loginName);
            if (user != null) {
                System.out.println("------准备判断密码---------");
                if (loginPwd.equals(user.getPassword())) {
                    resp.setStatus(200);
                } else {
                    resp.sendError(404, "密码错误");
                }
                System.out.println("------判断密码结束---------");
            } else {
                resp.sendError(404, "用户名不存在");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            resp.sendError(404, "数据库出错");
        }
    }
}
