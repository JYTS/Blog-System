package Dao;
import java.sql.Connection;
import model.User;
import model.DBUtil;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
public class UserDao {
    //根据用户名获取用户密码
    public User getPassword(String username) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        User user = new User();
        user.setUserId(-1);
        try {
            connection = DBUtil.getConnection();
            String sql = "select password from user where username = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, username);
            resultSet = statement.executeQuery();
            if (resultSet.next()){
                user.setUserId(resultSet.getInt("userid"));
                user.setPassword(resultSet.getString("password"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
        if (user.getUserId() != -1)
            return user;
        else
            return null;
    }
}
