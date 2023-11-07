




document.addEventListener("DOMContentLoaded", function () {
    const username = sessionStorage.getItem('username');

    if (username) {

    } else {
        console.error('未找到用户名参数');
    }
    let txt="";
    let lei="";//类别 1为输入搜索，0为标签
    const url = window.location.href;
    console.log(url);

    // 使用 URL 对象解析 URL
    const urlObj = new URL(url);
    // 获取参数值
     txt = urlObj.searchParams.get('txt');
     lei = urlObj.searchParams.get('lei');
     console.log(txt);
     console.log(lei);





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

 
    // 获取搜索按钮和输入框
    const articleContainer = document.getElementById("article-container");
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    // const tagContainer = document.getElementById("tag-container");


    // 搜索按钮点击事件处理
    searchButton.addEventListener("click", function () {
        const searchQuery = searchInput.value;
        articleContainer.innerHTML = '';
        // 执行搜索操作，获取搜索结果并显示在 articleList 中
        console.log(searchQuery);
        txt=searchQuery;
        lei=1;
        console.log(txt)
        console.log(lei)
        requestsearchArticles(searchQuery);
    });
    //获取标签
    //更改数字改变显示标签的个数
    
    loadTagsAndAddToContainer(30);
    //返回状态

    if(lei==1)
    {
        requestsearchArticles(txt)
    }
    if(lei==0)
    {
        requestArticlesByTag(txt)
    }





//根据tagname标签名查询文章id数组
// ### 4 标签名搜索博客

// **描述**

// 该接口用于从服务器端根据标签名查询文章ID数组，以获取与指定标签相关的文章。用户需要提供要查询的标签名称。

//  **请求**

// - 方法: GET

// - URL: http://127.0.0.1:8080/Blog-System/query/tagname

// **请求体**

// - tagname（String, 必需）- 指定要搜索的标签名称

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
function requestArticlesByTag(tagname) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://127.0.0.1:8080/Blog-System/query/tagname`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const requestBody = JSON.stringify({ tagname: tagname });
    console.log(requestBody)

    xhr.onload = function () {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            if (response.blogs) {
                const articleIDs = response.blogs.map(blog => blog.id);

                if (articleIDs.length > 0) {
                    // 清空文章容器
                    articleContainer.innerHTML = '';

                    // 调用displayArticles函数来显示文章
                    displayArticles(articleIDs);
                } else {
                    console.error("未找到文章ID或数据格式不正确");
                }
            } else {
                console.error("未找到文章ID或数据格式不正确");
            }
        } else {
            console.error("获取文章数据时出错:", xhr.statusText);
        }
    };

    xhr.send(requestBody);
}

    //根据搜索内容获得id数组
//     ### 3 关键词搜索博客（未完成）

// **描述**

// 该接口用于从服务器端搜索包含指定关键词的文章，然后返回相应的文章ID列表。用户需要提供搜索关键词。

//  **请求**

// - 方法: GET

// - URL: http://127.0.0.1:8080/Blog-System/query/keyword

// **请求体**

// - searchtxt（String, 必需）- 搜索关键词

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
function requestsearchArticles(searchtxt) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://127.0.0.1:8080/Blog-System/query/keyword', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const requestBody = JSON.stringify({ searchtxt: searchtxt });
    console.log(requestBody)

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

    xhr.send(requestBody);
}

// 显示文章
function displayArticles(articleIDs) {
  

    articleIDs.forEach(articleID => {
        // 向后台请求文章内容，并在加载后显示文章
        requestArticleContent(articleID);

    });
}

// 根据id向后台请求特定文章内容
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
function requestArticleContent(articleID)
 {

// 创建一个新的XMLHttpRequest对象
const xhr = new XMLHttpRequest();

// 配置请求，使用GET请求，并将i作为博客ID
xhr.open("GET", `http://127.0.0.1:8080/Blog-System/blog/info`, true);
const requestBody = JSON.stringify({ id: articleID });
console.log(requestBody)


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
                readMoreButton.href = `blog-post.html?id=${data.id}&txt=${txt}&lei=${lei}`;

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
xhr.send(requestBody);
}
//加载标签函数
// ### 4 加载n个标签（未完成）

// **描述**

// 该接口用于从服务器端获取标签数据，并将标签元素添加到指定的容器中。用户需要提供要加载的标签数量。

//  **请求**

// - 方法: GET

// - URL: http://127.0.0.1:8080/Blog-System/tag/getnTags

// **请求体**

// - num（int, 必需）- 要加载的标签数量

// **响应**

// - 成功响应（200）

// - 错误响应（101）

// | 字段名 | 格式 | 是否必需 | 简介                   |
// | ------ | ---- | -------- | ---------------------- |
// | tags   | List | T        | 数个标签信息组成的数组 |

// 标签信息的结构如下

// | 字段名 | 格式   | 是否必需 | 简介     |
// | ------ | ------ | -------- | -------- |
// | tag    | String | T        | 标签名称 |
function loadTagsAndAddToContainer(num) {
    // 获取标签容器
    const tagContainer = document.getElementById("tag-container");
    const requestData = { num: num };
    const jsonData = JSON.stringify(requestData);
    console.log(requestData)

    // 向后台请求标签数据
    function loadTags() 
    {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:8080/Blog-System/tag/getnTags", true);

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
                            requestArticlesByTag(selectedTag);
                        });

                        // 将标签元素添加到标签容器
                        tagContainer.appendChild(tagElement);
                    });
                }
            } else {
                console.error("获取标签数据时出错:", xhr.statusText);
            }
        };

        xhr.send(jsonData);
    }

    // 调用加载标签数据的函数
    loadTags();
}

});
