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
}
