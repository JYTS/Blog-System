package Dao;

import model.Tag;
import model.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class TagDao {
    public Tag selectOne(int blogId, String name) throws SQLException{
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from tag where blogId=? and name=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, blogId);
            statement.setString(2, name);
            resultSet = statement.executeQuery();
            if (resultSet.next()){
                Tag tag = new Tag();
                tag.setTagId(resultSet.getInt("id"));
                tag.setBlogId(resultSet.getInt("blogId"));
                tag.setName(resultSet.getString("name"));
                return tag;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection, statement,resultSet );
        }
        return null;
    }

    public List<Tag> selectFromBlog(int blogId) throws SQLException {
        List<Tag> tags = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from tag where blogId=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, blogId);
            resultSet = statement.executeQuery();
            //遍历整个集合
            while(resultSet.next()){
                Tag tag = new Tag();
                tag.setTagId(resultSet.getInt("id"));
                tag.setBlogId(resultSet.getInt("blogId"));
                tag.setName(resultSet.getString("name"));
                tags.add(tag);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection, statement,resultSet );
        }
        return tags;
    }

    public List<Tag> selectFromName(String name) throws SQLException {
        List<Tag> tags = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from tag where name=?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, name);
            resultSet = statement.executeQuery();
            //遍历整个集合
            while(resultSet.next()){
                Tag tag = new Tag();
                tag.setTagId(resultSet.getInt("id"));
                tag.setBlogId(resultSet.getInt("blogId"));
                tag.setName(resultSet.getString("name"));
                tags.add(tag);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection, statement,resultSet );
        }
        return tags;
    }

    public void insert(Tag tag) throws SQLException {
        Connection connection=null;
        PreparedStatement statement=null;
        try {
            connection = DBUtil.getConnection();
            String sql = "insert into tag values(null, ?, ?)";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, tag.getBlogId());
            statement.setString(2, tag.getName());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
    }

    public void delete(int tagId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "delete from tag where id=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, tagId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,null);
        }
    }
}