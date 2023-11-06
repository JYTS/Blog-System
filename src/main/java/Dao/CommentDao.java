package Dao;

import model.Comment;
import model.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CommentDao {
    public Comment selectOne(int commentId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        Comment comment = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from comment where id = ?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, commentId);
            resultSet = statement.executeQuery();
            if (resultSet.next()){
                comment = new Comment();
                comment.setCommentId(resultSet.getInt("id"));
                comment.setBlogId(resultSet.getInt("blogId"));
                comment.setUserId(resultSet.getInt("userId"));
                comment.setContent(resultSet.getString("content"));
                comment.setDatetime(resultSet.getTimestamp("datetime"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection, statement,resultSet );
        }
        return comment;
    }

    public List<Comment> selectFromBlog(int blogId) throws SQLException {
        List<Comment> comments = new ArrayList<>();
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "select * from comment where blogId = ?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, blogId);
            resultSet = statement.executeQuery();
            //遍历整个集合
            while(resultSet.next()){
                Comment comment = new Comment();
                comment.setCommentId(resultSet.getInt("id"));
                comment.setBlogId(resultSet.getInt("blogId"));
                comment.setUserId(resultSet.getInt("userId"));
                comment.setContent(resultSet.getString("content"));
                comment.setDatetime(resultSet.getTimestamp("datetime"));
                comments.add(comment);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection, statement,resultSet );
        }
        return comments;
    }

    public void insert(Comment comment) throws SQLException {
        Connection connection=null;
        PreparedStatement statement=null;
        try {
            connection = DBUtil.getConnection();
            String sql = "insert into comment values(null, ?, ?, ?, now())";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, comment.getBlogId());
            statement.setInt(2, comment.getUserId());
            statement.setString(3, comment.getContent());
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBUtil.close(connection,statement,null);
        }
    }

    public void delete(int commentId) throws SQLException {
        Connection connection = null;
        PreparedStatement statement = null;
        try {
            connection = DBUtil.getConnection();
            String sql = "delete from comment where id=?";
            statement = connection.prepareStatement(sql);
            statement.setInt(1, commentId);
            statement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            DBUtil.close(connection,statement,null);
        }
    }
}
