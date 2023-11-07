package Servlet.User;

import Dao.UserDao;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import model.User;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;

@WebServlet("/user/register")
public class Register extends HttpServlet{
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        InputStream inputStream = req.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        String line;
        StringBuilder stringBuilder = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String jsonString = stringBuilder.toString();
        JsonNode jsonNode = objectMapper.readTree(jsonString);

        String name = jsonNode.get("username").asText();
        String pwd = jsonNode.get("password").asText();
        String email = jsonNode.get("email").asText();

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
