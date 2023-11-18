document.addEventListener("DOMContentLoaded", function () {
    // 获取URL参数

// 获取完整的 URL
const url = window.location.href;
console.log(url);

// 使用 URL 对象解析 URL
const urlObj = new URL(url);
console.log(urlObj);

// 获取参数值
const blogname = urlObj.searchParams.get('blogname');
console.log(blogname);
document.getElementById('username').innerText = blogname+'的空间';



// 获取退出登录按钮的元素
const logoutButton = document.getElementById("logout");

// 添加点击事件处理程序
logoutButton.addEventListener("click", function () {
    // 清除用户名的 Cookie（假设 Cookie 名为 "username"）
    sessionStorage.removeItem('username');;
    console.log("链接被点击");

    // 使用 window.location.href 重定向到登录页面
    window.location.href = "login.html"; // 替换为你的登录页面的URL
});

  document.getElementById('home').addEventListener('click', function () {
      window.location.href = 'index.html?'
  });

  document.getElementById('profile').addEventListener('click', function () {

    window.location.href = `userblog.html?blogname=${blogname}`;
  });

  document.getElementById('info').addEventListener('click', function () {
    window.location.href = 'userinformation.html?'
  });
  document.getElementById('search').addEventListener('click', function () {
    window.location.href = 'search.html?'
});
document.getElementById('editor').addEventListener('click', function () {
    window.location.href = 'create.html?'
});

  const articleContainer = document.getElementById("article-container");
  //根据用户名搜索他的文章id
  function searchuserblog(username) {
    const xhr = new XMLHttpRequest();
    // ### 2 用户名搜索博客

    // **请求**
    
    // - 方法: GET
    
    // - URL: http://127.0.0.1:8080/Blog-System/query/username
    
    // **请求体**
    
    // - username（String, 必需）- 用户名，用于指定要搜索博客文章的用户
    
    // **响应**
    
    // - 成功响应（200）
    // - 错误响应（101, 102）
    
    // | 字段名 | 格式 | 是否必需 | 简介                     |
    // | ------ | ---- | -------- | ------------------------ |
    // | blogs  | List | T        | 若干组博客信息组成的数组 |
    
    //  其中，每组博客信息的结构如下：
    
    // | 字段名 | 格式   | 是否必需 | 简介     |
    // | ------ | ------ | -------- | -------- |
    // | id     | Int    | T        | 博客的id |
    // | title  | String | T        | 博客标题 |
    const url = `http://127.0.0.1:8080/Blog-System/query/username?username=${username}`;
    xhr.open("GET", url, true);

  

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.blogs) {
                // 提取文章ID数组
                const articleIDs = response.blogs.map(blog => blog.id);

                if (articleIDs.length > 0) {


                    // 调用displayArticles函数来显示文章
                    displayArticles(articleIDs);
                } else {
                    console.error("未找到文章ID或数据格式不正确");
                }
            } else {
                console.error("未找到文章ID或数据格式不正确");
            }
        } else {
            console.error("获取随机文章ID时出错:", xhr.statusText);
        }
    };

    xhr.send();
}
// 显示文章
function displayArticles(articleIDs) {
    

    articleIDs.forEach(articleID => {
        // 向后台请求文章内容，并在加载后显示文章
        requestArticleContent(articleID,blogname);

    });
}

// 向后台请求特定文章内容
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
function requestArticleContent(articleID,blogname) {
    console.log(articleID);
    // 创建一个新的XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    // 配置请求，使用GET请求，并将i作为博客ID
    //接口4根据articleid获取文章详细内容

    const url = `http://127.0.0.1:8080/Blog-System/blog/info?id=${articleID}`;
    xhr.open("GET", url, true);




    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            if (data.id && data.title && data.content && data.author && data.date) {
                const articleBlock = document.createElement("div");
                articleBlock.className = "article-block";
                const idElement = document.createElement("p");
                idElement.textContent = "ID: " + data.id;
                idElement.className = "article-id";
                const title = document.createElement("h2");
                title.textContent = data.title;
                const author = document.createElement("p");
                author.textContent = "作者: " + data.author;

                // 截断文章内容，只显示部分内容
                const maxContentLength = 200;
                if (data.content.length > 0) {
                    if (data.content.length > maxContentLength) {
                        data.content = data.content.slice(0, maxContentLength) + '...';
                    }
                    const readMoreButton = document.createElement("a");
                    readMoreButton.textContent = "阅读更多";
                    readMoreButton.href = `blog-post.html?id=${data.id}&blogname=${blogname}`;

                    // 添加 "阅读更多" 链接
                    if (data.content.length > maxContentLength) {
                        const expandContent = document.createElement("a");

                        expandContent.addEventListener('click', function () {
                            content.textContent = data.content;
                            articleBlock.removeChild(expandContent);
                        });
                        articleBlock.appendChild(expandContent);
                    }

                    const content = document.createElement("p");
                    content.textContent = data.content;

                    articleBlock.appendChild(idElement);
                    articleBlock.appendChild(title);
                    articleBlock.appendChild(author);
                    articleBlock.appendChild(content);
                    if (data.content.length > maxContentLength) {
                        articleBlock.appendChild(readMoreButton);
                    }
                    articleContainer.appendChild(articleBlock);

                    const separator = document.createElement("hr");
                    articleContainer.appendChild(separator);
                } else {
                    console.error("响应中未找到文章数据或数据格式不正确");
                }
            } else {
                console.error("获取文章数据时出错:", xhr.statusText);
            }
        };
    };

    // 发送请求
    xhr.send();
}



searchuserblog(blogname)

});
