package Dao;

import model.User;
import model.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDao {
    //根据用户名获取用户信息
    public User selectOne(String username) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from user where username = ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, username);
            resultSet = statement.executeQuery();
            if (resultSet.next()){
                User user = new User();
                user.setUserId(resultSet.getInt("id"));
                user.setUserName(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setEmail(resultSet.getString("email"));
                user.setRegisterTime(resultSet.getTimestamp("registerTime"));
                int isAdmin = resultSet.getInt("isAdmin");
                user.setAdmin(isAdmin == 1);
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
        return null;
    }

    public User selectOne(int userId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from user where id = ?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, userId);
            resultSet = statement.executeQuery();
            if (resultSet.next()){
                User user = new User();
                user.setUserId(resultSet.getInt("id"));
                user.setUserName(resultSet.getString("username"));
                user.setPassword(resultSet.getString("password"));
                user.setEmail(resultSet.getString("email"));
                user.setRegisterTime(resultSet.getTimestamp("registerTime"));
                int isAdmin = resultSet.getInt("isAdmin");
                user.setAdmin(isAdmin == 1);
                return user;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
        return null;
    }

    public void insert(User user) throws SQLException {
        Connection connection=null;
        PreparedStatement statement=null;
        try {
            connection = DBUtil.getConnection();
            String sql = "insert into user values(null, ?, ?, ?, 0, now())";
            statement = connection.prepareStatement(sql);
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

    public void update(User user) throws SQLException {
        Connection connection=null;
        PreparedStatement statement=null;
        try {
            connection = DBUtil.getConnection();
            String sql = "UPDATE user " +
                         "SET username=?, password=?, email=?, isAdmin=? " +
                         "WHERE id=?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, user.getUserName());
            statement.setString(2, user.getPassword());
            statement.setString(3, user.getEmail());
            int isAdmin = 0;
            if (user.isAdmin()) isAdmin = 1;
            statement.setInt(4, isAdmin);
            statement.setInt(5, user.getUserId());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
    }
}