
// ### 1 根据博客id获取文章详细内容

// **请求**

// - 方法: GET

// -  URL: http://127.0.0.1:8080/Blog-System/blog/info

// **请求体**

// - id（int, 必需）- 要获取的文章的id

// **响应**

// - 成功响应（200）

// - 错误响应（101, 104）

// | 字段名   | 格式   | 是否必需 | 简介                 |
// | -------- | ------ | -------- | -------------------- |
// | id       | Int    | T        | 博客id               |
// | content  | String | T        | 博客内容             |
// | author   | String | T        | 作者名字             |
// | authorid | Int    | T        | 作者用户id           |
// | date     | String | T        | 发布日期"YYYY-MM-DD" |

function loadBlogPost(articleId) 
    {
        const xhr = new XMLHttpRequest();
        const url = `http://127.0.0.1:8080/Blog-System/blog/info?id=${articleId}`;
        xhr.open("GET", url, true);
    


    
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
    
                if (data.id && data.title && data.content && data.author && data.date) {
                    // 更新页面内容，例如标题、内容、作者等
                    document.getElementById("article-container").innerHTML = `
                      <h1>${data.title}</h1>
                      <p>id：${data.id}</p>
                      <p>作者：<a href="userblog.html?blogname=${data.author}">${data.author}</a></p>
                      <p>日期：${data.date}</p>
                      <p>${data.content}</p>

                    `;
                    const username = sessionStorage.getItem('username');

                    if (username) {
                       
                    } else {
                        console.error('未找到用户名参数');
                    }

                    // 检查作者和用户名是否相同，如果是，显示编辑按钮
                    console.log(username)

                if (data.author === username) {

                    const editButton = document.getElementById('edit-button');
                    editButton.style.display = 'block';
                    const deleteButton = document.getElementById('delete-button');
                    deleteButton.style.display = 'block';
                }
                } else {
                    console.error("响应中未找到文章数据或数据格式不正确");
                }
            } else {
                console.error("获取文章数据时出错:", xhr.statusText);
            }
        };
    
        // 发送请求
        xhr.send();
    }
//获取指定文章id的评论
// ### 1 获取文章评论

// **描述**

// 该接口用于根据文章ID从服务器端请求文章的评论数据，并将评论数据显示在页面上。

// **请求**

// - 方法: GET

// - URL: http://127.0.0.1:8080/Blog-System/comment/getComments

// **请求体**

// - articleid（int, 必需）- 要获取评论的博客的id

// **响应**

// - 成功响应（200）

// - 错误响应（101, 104）

// | 字段名     | 格式 | 是否必需 | 简介                 |
// | ---------- | ---- | -------- | -------------------- |
// | article_id | Int  | T        | 博客的id             |
// | comments   | List | T        | 若干条评论组成的数组 |

//  其中，评论的结构如下：

// | 字段名       | 格式   | 是否必需 | 简介         |
// | ------------ | ------ | -------- | ------------ |
// | comment_id   | Int    | T        | 评论的id     |
// | user_name    | String | T        | 评论者用户名 |
// | comment_text | String | T        | 评论内容     |
// | timestamp    | String | T        | 评论时间戳   |
    function loadComments(articleId)
    {
        const xhr = new XMLHttpRequest();
    
        // 使用 articleId 发送请求以获取评论数据
        // 接口7 获取文章评论接口
        const url = `http://127.0.0.1:8080/Blog-System/comment/getComments?articleid=${articleId}`;
        xhr.open("GET", url, true);
  
    
        xhr.onload = function () {
            if (xhr.status === 200) {
                const commentsData = JSON.parse(xhr.responseText);
    
                if (commentsData.article_id && commentsData.comments) {
                    // 获取评论列表容器
                    const commentList = document.getElementById("comment-list");
    
                    // 清空现有的评论
                    commentList.innerHTML = "";
    
                    // 循环遍历评论数据并插入到评论列表中
                    commentsData.comments.forEach(comment => {
                        const commentItem = document.createElement("div");
                        commentItem.innerHTML = `
                            <p>${comment.user_name} 评论于 ${comment.timestamp}</p>
                            <p>${comment.comment_text}</p>
                        `;
    
                        // 添加分割线
                        const separator = document.createElement("hr");
    
                        commentList.appendChild(commentItem);
                        commentList.appendChild(separator);
                    });
                } else {
                    console.error("响应中未找到评论数据或数据格式不正确");
                }
            } else {
                console.error("获取评论数据时出错:", xhr.statusText);
            }
        };
    
        // 发送请求
        xhr.send();
    }
//进行评论根据文章id，session中存的用户名，和文本构成评论
// ### 2 提交评论

// **描述**

// 该接口用于向服务器提交评论，以对指定文章进行评论。评论需要包括文章ID、用户名和评论文本。用户必须已登录，其用户名必须存储在Cookie中。

// **请求**

// - 方法: POST

// - URL: http://127.0.0.1:8080/Blog-System/comment/insert

// **请求体**

// | 字段名    | 格式   | 是否必需 | 简介               |
// | --------- | ------ | -------- | ------------------ |
// | articleid | Int    | T        | 博客的id           |
// | username  | String | T        | 提交评论的用户名   |
// | text      | String | T        | 评论文本，评论内容 |

// **响应**

// - 成功响应（200）

// - 错误响应（101, 102, 104）
    function submitComment(article_id) {
        const username = sessionStorage.getItem('username');

                    if (username) {
                       
                    } else {
                        console.error('未找到用户名参数');
                    }
    
        // 获取评论文本框和提交按钮
        const commentText = document.getElementById("comment-text");
        const submitCommentButton = document.getElementById("submit-comment");
    
        // 监听提交评论按钮的点击事件
        submitCommentButton.addEventListener("click", function () {
            // 获取评论文本
            const comment = commentText.value.trim();
    
            // 检查评论是否为空
            if (comment === "") {
                alert("评论不能为空");
                return;
            }
    
            // 构建评论对象
            const commentData = {
                articleid: article_id,
                username: username, // 你可以根据需要设置用户名
                text: comment
            };
            console.log(commentData);
    
            // 发起POST请求以提交评论
            const xhr = new XMLHttpRequest();
            // 接口8 提交评论接口
            xhr.open("POST", "http://127.0.0.1:8080/Blog-System/comment/insert", true);
            xhr.setRequestHeader("Content-Type", "application/json");
    
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // 评论成功
                    alert("评论成功");
    
                    commentText.value = ""; // 清空评论文本框
                    loadComments(article_id); // 刷新评论
                } else {
                    // 评论不成功
                    alert("评论不成功");
                }
            };
    
            // 发送评论数据
            xhr.send(JSON.stringify(commentData));
        });
    }
    //获取指定文章的标签
//     ### 1 获取文章的标签

// **请求**

// - 方法: GET

// - URL: http://127.0.0.1:8080/Blog-System/tag/getTags

// **请求体**

// - id（int, 必需）- 要获取标签的文章的id

// **响应**

// - 成功响应（200）

// - 错误响应（101, 104）

// | 字段名     | 格式 | 是否必需 | 简介                   |
// | ---------- | ---- | -------- | ---------------------- |
// | article_id | Int  | T        | 博客的id               |
// | tags       | List | T        | 数个标签信息组成的数组 |

// 标签信息的结构如下

// | 字段名 | 格式   | 是否必需 | 简介     |
// | ------ | ------ | -------- | -------- |
// | tag    | String | T        | 标签名称 |
    function loadTagsForArticle(articleID) {
        // 获取标签容器
        var tagContainer = document.getElementById("tag-container");


    
        // 创建XHR请求
        var xhr = new XMLHttpRequest();
        // 接口9 获取文章的标签接口

        const url = `http://127.0.0.1:8080/Blog-System/tag/getTags?id=${articleID}`;
        xhr.open("GET", url, true);
  
    
        xhr.onload = function () 
        {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                if (response.tags && Array.isArray(response.tags) && response.tags.length > 0) {
                    // 清空标签容器
                    tagContainer.innerHTML = '';

                    // 遍历标签数据并创建标签元素
                    response.tags.forEach(tagData => {
                        const tagElement = document.createElement("div");
                        tagElement.className = "tag";
                        tagElement.textContent = tagData.tag;
                        tagElement.setAttribute("data-tag", tagData.tag); // 添加标签属性

                        // 添加点击事件处理程序来根据标签进行查询
                        tagElement.addEventListener("click", function () {
                            const selectedTag = tagData.tag;
                            txt=selectedTag;
                            lei=0;
                            console.log(txt)
                            console.log(lei)
                            // 在此处执行查询操作，可以向后台发送标签查询请求
                            window.location.href = `search.html?lei=${lei}&txt=${txt}`;
    

                        });

                        // 将标签元素添加到标签容器
                        tagContainer.appendChild(tagElement);
                    });
                }
            } else {
                console.error("获取标签数据时出错:", xhr.statusText);
            }
        };
    
        // 发送XHR请求
        xhr.send();
    }
//删除博客
// ### 3 删除博客文章

// **描述**

// 该接口用于从服务器端删除指定ID的博客文章。

//  **请求**

// - 方法: DELETE

// - URL: http://127.0.0.1:8080/Blog-System/blog/delete

// **请求体**

// - id（int, 必需）- 要删除的博客文章的ID

// **响应**

// - 成功响应（200）
// - 错误响应（101, 104）
function deleteBlogPost(articleId) {
    const xhr = new XMLHttpRequest();


    // 使用文章ID发送删除请求
    // 接口10删除博客文章接口
    const url = `http://127.0.0.1:8080/Blog-System/blog/delete?id=${articleId}`;
    xhr.open("DELETE", url, true);


    xhr.onload = function () {
        if (xhr.status === 200) {
            // 删除成功后的逻辑
            alert("博客文章已成功删除！");
            // 这里可以添加其他处理逻辑，例如重定向到博客列表页面
        } else {
            console.error("删除博客文章时出错:", xhr.statusText);
        }
    };

    // 发送删除请求
    xhr.send();
}

    
document.addEventListener("DOMContentLoaded", function () 
{
    
    // 从URL中获取 'id' 参数
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get("id");
const blogname = urlParams.get("blogname");
const txt = urlParams.get("txt");
const lei = urlParams.get("lei");//lei 1 0 分别代表从search界面跳转时是文本查询还是标签跳转
console.log(article_id);
console.log(blogname);
console.log(lei);
console.log(txt);


loadBlogPost(article_id);

loadComments(article_id);
submitComment(article_id);
loadTagsForArticle(article_id);
// 获取删除按钮的元素
const deleteButton = document.getElementById("delete-button");

// 添加点击事件处理程序，当点击删除按钮时调用 deleteBlogPost 函数
deleteButton.addEventListener("click", function () {

    deleteBlogPost(article_id);
    sessionStorage.removeItem("indexid");
    window.location.href = 'index.html';
    alert('删除成功');

});
const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", function () {
    // 获取文章ID（假设文章ID存储在 data-articleid 属性中）
    const articleId = editButton.getAttribute("data-articleid");

    // 构建编辑页面的URL，并将文章ID作为查询参数传递
    const editPageURL = `editor.html?id=${article_id}`;

    // 使用 window.location.href 重定向到编辑页面
    window.location.href = editPageURL;
});
const logoutButton = document.getElementById("logout");

// 添加点击事件处理程序
logoutButton.addEventListener("click", function () {
    // 清除用户名的 Cookie（假设 Cookie 名为 "username"）
    sessionStorage.removeItem('username');
    console.log("链接被点击");

    // 使用 window.location.href 重定向到登录页面
    window.location.href = "login.html"; // 替换为你的登录页面的URL
});


if(blogname!=null)
{
    const returnLink = document.getElementById("returnLink");

// 给锚点添加点击事件处理程序
returnLink.addEventListener("click", function () {
    window.location.href = `userblog.html?blogname=${blogname}`

    console.log("链接被点击"); // 添加这行代码，查看是否事件被触发
  

});

    
}
else if(txt!=null)
{
    returnLink.addEventListener("click", function () {
        window.location.href = `search.html?lei=${lei}&txt=${txt}`;
    
        console.log("链接被点击"); // 添加这行代码，查看是否事件被触发
      
    
    });
    
}
else
{
    returnLink.addEventListener("click", function () {
        window.location.href = 'index.html';
    
        console.log("链接被点击"); // 添加这行代码，查看是否事件被触发
      
    
    });
    
}








});