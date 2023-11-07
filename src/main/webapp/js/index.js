document.addEventListener("DOMContentLoaded", function () 
{

    const username = sessionStorage.getItem('username');

if (username) {
    document.getElementById('username').innerText = '你好，' + username;
} else {
    console.error('未找到用户名参数');
}

    document.getElementById('home').addEventListener('click', function () {
        window.location.href = 'index.html?'
    });

    document.getElementById('profile').addEventListener('click', function () {
        
        window.location.href = `userblog.html?blogname=${username}`;
       
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
   
        

    function requestRandomArticles(numberOfArticles) {
        const xhr = new XMLHttpRequest();
        // ### 1 获取number数量的随机存在的博客id

        // **请求**
        
        // - 方法: GET
        
        // - URL: http://127.0.0.1:8080/Blog-System/query/rand
        
        // **请求体**
        
        // - number（int, 必需）- 要获取的随机博客ID的数量
        
        // **响应**
        
        // - 成功响应（200）
        // - 错误响应（101）
        
        // | 字段名 | 格式 | 是否必需 | 简介                     |
        // | ------ | ---- | -------- | ------------------------ |
        // | blogs  | List | T        | 若干组博客信息组成的数组 |
        
        //  其中，每组博客信息的结构如下：
        
        // | 字段名 | 格式   | 是否必需 | 简介     |
        // | ------ | ------ | -------- | -------- |
        // | id     | Int    | T        | 博客的id |
        // | title  | String | T        | 博客标题 |
        

        xhr.open("GET", 'http://127.0.0.1:8080/Blog-System/query/rand?number=' + numberOfArticles, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        const requestBody = JSON.stringify({ number: numberOfArticles });
    
        xhr.onload = function () {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
    
                if (response.blogs) {
                    // 提取文章ID数组
                    const articleIDs = response.blogs.map(blog => blog.id);
                    // console.log(articleIDs)
    
                    if (articleIDs.length > 0) {
                        // 存储文章ID到sessionStorage，键名为 "indexid"
                        //保存主页的文章列表，返回到这个界面不用再次随机获取
                        sessionStorage.setItem('indexid', JSON.stringify(articleIDs));
    
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
    
        xhr.send(requestBody);
    }

    // 显示文章
    function displayArticles(articleIDs) {
        const articleContainer = document.getElementById("article-container");

        articleIDs.forEach(articleID => {
            // 向后台请求文章内容，并在加载后显示文章
            requestArticleContent(articleID);

        });
    }

// 向后台请求特定文章内容
//articleID是数组
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
function requestArticleContent(articleID) {
    console.log(articleID);
    // 创建一个新的XMLHttpRequest对象
    const xhr = new XMLHttpRequest();
    const requestBody = { id: articleID };
    console.log(requestBody)

    // 配置请求，使用GET请求，并将i作为博客ID
    
    xhr.open("GET", 'http://127.0.0.1:8080/Blog-System/blog/info?id=' + articleID, true);
    

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
                if (data.content.length > maxContentLength) {
                    data.content = data.content.slice(0, maxContentLength) + '...';

                    const readMoreButton = document.createElement("a");
                    readMoreButton.textContent = "阅读更多";
                    readMoreButton.href = `blog-post.html?id=${data.id}`;

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
    xhr.send(JSON.stringify(requestBody));
}

    const storedIndexId = sessionStorage.getItem("indexid");

    if (storedIndexId === null) {
        // 如果 "indexid" 为空，调用 requestRandomArticles() 来获取文章ID
        requestRandomArticles(10);
        console.log('随机获取')
    } else {
        // 如果 "indexid" 不为空，提取并转换为数组
        const articleIDs = JSON.parse(storedIndexId);
        console.log('历史获取')
        // 调用 displayArticles() 来显示文章
        displayArticles(articleIDs);
    }

// 获取退出登录按钮的元素
const logoutButton = document.getElementById("logout");

 

// 添加点击事件处理程序
logoutButton.addEventListener("click", function () {
    // 清除用户名的 Cookie（假设 Cookie 名为 "username"）
    sessionStorage.removeItem('username'); // 设置过期时间为过去的时间
    console.log("链接被点击");

    // 使用 window.location.href 重定向到登录页面
    window.location.href = "login.html"; // 替换为你的登录页面的URL
});

});
