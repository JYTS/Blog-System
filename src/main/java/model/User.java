package model;
import java.sql.Timestamp;
//每个Blog对象，对应blog表中的一条记录
public class User {
    //因为都是private,所以这里要重写get,set方法
    private int UserId;
    private String userName;
    private String password;
    private String email;
    private boolean isAdmin;
    private Timestamp registerTime;
    public void setUserId(int userId) {
        UserId = userId;
    }

    public int getUserId() {
        return UserId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String name) {
        userName = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String pwd) {
        password = pwd;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String Email) {
        email = Email;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public Timestamp getRegisterTime() {
        return registerTime;
    }

    public void setRegisterTime(Timestamp time) {
        registerTime = time;
    }
}