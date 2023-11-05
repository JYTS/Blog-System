package model;
import com.mysql.cj.jdbc.MysqlDataSource;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
//使用这个类和数据库建立连接
public class DBUtil {
    private static final String URL = "jdbc:mysql://127.0.0.1:3306/blog_system?characterEncoding=utf8&useSSL=false&allowPublicKeyRetrieval=true";
    private static final String USERNAME = "root";
    private static final String PASSWORD = "123456";
    private static volatile DataSource dataSource=null;
    private static DataSource getDataSource(){
        if (dataSource==null) {
            synchronized (DBUtil.class) {
                if (dataSource == null) {
                    dataSource = new MysqlDataSource();
                    ((MysqlDataSource) dataSource).setURL(URL);
                    ((MysqlDataSource) dataSource).setUser(USERNAME);
                    ((MysqlDataSource) dataSource).setPassword(PASSWORD);
                }
            }
        }
        return dataSource;
    }
    public static Connection getConnection()throws SQLException {
        return getDataSource().getConnection();
    }
    public static void close(Connection connection, PreparedStatement statement, ResultSet resultSet) throws SQLException {
        if (resultSet!=null){
            resultSet.close();
        }
        if(statement!=null){
            statement.close();
        }
        if (connection!=null){
            connection.close();
        }
    }
}