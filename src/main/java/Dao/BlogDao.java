package Dao;

import model.Blog;
import model.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BlogDao {
    // 1. 向博客列表中插入一个博客
    public void insert(Blog blog) throws SQLException {
        // JDBC 基本代码
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            // ①和数据库建立连接.
            connection = DBUtil.getConnection();
            // ② 构造 SQL 语句
            String sql = "insert into blog values(null, ?, ?, ?, now())";
            statement = connection.prepareStatement(sql);
            //第一个参数表示的是第几个？的位置
            statement.setString(1, blog.getTitle());
            statement.setString(2, blog.getContent());
            statement.setInt(3, blog.getUserId());
            // ③执行 SQL
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // ④ 关闭连接, 释放资源
            DBUtil.close(connection, statement,null);
        }
    }
    // 2. 能够获取到博客表中的所有博客的信息 (用于在博客列表页, 此处每篇博客不一定会获取到完整的正文)
    public List<Blog> selectAll() throws SQLException {
        List<Blog>blogs = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select id, title, userId, postTime from blog";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            //遍历整个集合
            while(resultSet.next()){
                Blog blog = new Blog();
                blog.setBlogId(resultSet.getInt("id"));
                blog.setTitle(resultSet.getString("title"));
                blog.setUserId(resultSet.getInt("userId"));
                blog.setPostTime(resultSet.getTimestamp("postTime"));
                blogs.add(blog);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection, statement,resultSet );
        }
        return blogs;
    }
    // 3. 能够根据博客 id 获取到指定的博客内容 (用于在博客详情页)
    public Blog selectOne(int blogId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from blog where id=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, blogId);
            resultSet = statement.executeQuery();
            //由于id是唯一的，要么是0条，要么是唯一的，是主键作为查询条件的，所以直接用if
            if (resultSet.next()){
                Blog blog = new Blog();
                blog.setBlogId(resultSet.getInt("id"));
                blog.setTitle(resultSet.getString("title"));
                blog.setContent(resultSet.getString("content"));
                blog.setUserId(resultSet.getInt("userId"));
                blog.setPostTime(resultSet.getTimestamp("postTime"));
                return blog;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,resultSet);
        }
        return null;
    }
    // 4. 从博客表中, 根据博客 id 删除博客.
    public void delete(int blogId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "delete from blog where id=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, blogId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,null);
        }
    }
    // 注意, 上述操作是 增删查, 没有改

    public List<Blog> selectFromUserId(int userId) throws SQLException {
        List<Blog>blogs = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select id, title, userId, postTime from blog where userId=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, userId);
            resultSet = statement.executeQuery();
            while (resultSet.next()){
                Blog blog = new Blog();
                blog.setBlogId(resultSet.getInt("id"));
                blog.setTitle(resultSet.getString("title"));
                blog.setUserId(resultSet.getInt("userId"));
                blog.setPostTime(resultSet.getTimestamp("postTime"));
                blogs.add(blog);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,resultSet);
        }
        return blogs;
    }

    public List<Blog> selectFromKeyword(String keyword) throws SQLException {
        List<Blog>blogs = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select id, title, userId, postTime from blog where title LIKE ?";
            statement = connection.prepareStatement(sql);
            statement.setString(1, "'%" + keyword + "%'");
            resultSet = statement.executeQuery();
            while (resultSet.next()){
                Blog blog = new Blog();
                blog.setBlogId(resultSet.getInt("id"));
                blog.setTitle(resultSet.getString("title"));
                blog.setUserId(resultSet.getInt("userId"));
                blog.setPostTime(resultSet.getTimestamp("postTime"));
                blogs.add(blog);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,resultSet);
        }
        return blogs;
    }


    public Blog selectOneInfo(int blogId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select id, title, userId, postTime from blog where id=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, blogId);
            resultSet = statement.executeQuery();
            //由于id是唯一的，要么是0条，要么是唯一的，是主键作为查询条件的，所以直接用if
            if (resultSet.next()){
                Blog blog = new Blog();
                blog.setBlogId(resultSet.getInt("id"));
                blog.setTitle(resultSet.getString("title"));
                blog.setUserId(resultSet.getInt("userId"));
                blog.setPostTime(resultSet.getTimestamp("postTime"));
                return blog;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,resultSet);
        }
        return null;
    }
}