package model;
import java.sql.Timestamp;
//每个Blog对象，对应blog表中的一条记录
public class Blog {
    //因为都是private,所以这里要重写get,set方法
    private int BlogId;
    private String title;
    private String content;
    private int UserId;
    private Timestamp postTime;

    public void setBlogId(int blogId) {
        BlogId = blogId;
    }

    public int getBlogId() {
        return BlogId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getUserId() {
        return UserId;
    }

    public void setUserId(int userId) {
        UserId = userId;
    }

    public Timestamp getPostTime() {
        return postTime;
    }

    public void setPostTime(Timestamp postTime) {
        this.postTime = postTime;
    }
}