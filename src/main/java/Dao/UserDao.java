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
    //根据用户名获取用户信息
    public User getUser(String username) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet;
        User user = new User();
        user.setUserId(-1);
        try {
            connection = DBUtil.getConnection();
            String sql = "select password from user where username = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, username);
            resultSet = statement.executeQuery();
            if (resultSet.next()){
                user.setUserId(resultSet.getInt("id"));
                user.setUserName(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setEmail(resultSet.getString("email"));
                user.setRegisterTime(resultSet.getTimestamp("registerTime"));
                user.setAdmin(resultSet.getBoolean("isAdmin"));
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

    public void insert(User user) throws SQLException {
        Connection connection=null;
        PreparedStatement statement=null;
        try {
            connection = DBUtil.getConnection();
            String sql = "insert into user values(null, ?, ?, ?, 0, now())";
            statement=connection.prepareStatement(sql);
            statement.setString(1, user.getUserName());
            statement.setString(2, user.getPassword());
            statement.setString(3, user.getEmail());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
    }
}
