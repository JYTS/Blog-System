


//id获取tags
//### 1 获取文章的标签

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
    const url = `http://127.0.0.1:8080/Blog-System/tag/getTags?id=${articleID}`;
    xhr.open("GET", url, true);


    xhr.onload = function () {
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

                    // 添加点击事件监听器，点击标签时触发删除操作
                    tagElement.addEventListener("click", function () {
                        const tagName = tagElement.getAttribute("data-tag");
                        deleteTag(tagElement, articleID, tagName);
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
//删除tags
//     ### 3 删除标签

//     **请求**
   
//    - 方法: DELETE
   
//    - URL: http://127.0.0.1:8080/Blog-System/tag/delete
   
//    **请求体**
   
//    | 字段名    | 格式   | 是否必需 | 简介                 |
//    | --------- | ------ | -------- | -------------------- |
//    | articleID | Int    | T        | 要删除标签的博客的id |
//    | tagName   | String | T        | 要删除的标签的名称   |
   
//    **响应**
   
//    - 成功响应（200）
   
//    - 错误响应（101, 104, 106）
   
function deleteTag(tagElement, articleID, tagName) {
    // 获取标签元素的父节点，通常是标签容器
    const tagContainer = tagElement.parentElement;

    // 发送HTTP请求以删除标签
    const xhr = new XMLHttpRequest();

    const url = `http://127.0.0.1:8080/Blog-System/tag/delete?articleID=${articleID}&tagName=${tagName}`;

    xhr.open("DELETE", url, true);
    // 准备要发送的数据，通常包括文章ID和标签名




    xhr.onload = function () {
        if (xhr.status === 200) {
            // 删除成功后，从DOM中移除标签元素
            tagContainer.removeChild(tagElement);
            console.log("删除成功")
        } else {
            console.error("删除标签时出错:", xhr.statusText);
        }
    };

    // 发送请求
    xhr.send();
}

// 添加事件监听器以处理点击"X"按钮的事件


//添加tags
//     ### 2 添加标签

// **描述**

// 该接口用于向服务器端添加标签到指定文章。用户需要提供文章ID和要添加的标签名称。

//  **请求**

// - 方法: POST

// - URL: http://127.0.0.1:8080/Blog-System/tag/insert

// **请求体**

// | 字段名    | 格式   | 是否必需 | 简介                 |
// | --------- | ------ | -------- | -------------------- |
// | articleID | Int    | T        | 要添加标签的博客的id |
// | tagName   | String | T        | 要添加的标签的名称   |

// **响应**

// - 成功响应（200）

// - 错误响应（101, 104）


function addTag(articleID) {
    const tagInput = document.getElementById("tag");
    const newTagText = tagInput.value.trim();
    
    if (newTagText) {
        const tagContainer = document.getElementById("tag-container");
        const existingTags = tagContainer.getElementsByClassName("tag");
        console.log(newTagText)

        // 检查标签区是否已包含相同文本的标签
        let isTagAlreadyExists = false;
        for (const tagElement of existingTags) {
            // console.log(tagElement.textContent)
            if (tagElement.textContent === newTagText) {
                isTagAlreadyExists = true;
                break;
            }
        }

        if (isTagAlreadyExists) {
            console.log("标签已存在，不需要重复添加。");
        } else {
            // 继续执行添加标签的逻辑
            const requestData = {
                articleID: articleID,
                tagName: newTagText
            };

        
            const xhr = new XMLHttpRequest();
            
            const url = "http://127.0.0.1:8080/Blog-System/tag/insert";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log(requestData)
        
            xhr.onload = function () 
            {
                if (xhr.status === 200) {
                    // 添加标签成功
                    console.log("标签已添加到后端");
                    const tagContainer = document.getElementById("tag-container");

  
 
                    const tagElement = document.createElement("div");
                    tagElement.className = "tag";
                    tagElement.textContent = newTagText;
                    tagElement.setAttribute("data-tag", newTagText); // 添加标签属性

                    // 添加点击事件监听器，点击标签时触发删除操作
                    tagElement.addEventListener("click", function () {
                        const tagName = tagElement.getAttribute("data-tag");
                        deleteTag(tagElement, articleID, tagName);
                    });

                    // 将标签元素添加到标签容器
                    tagContainer.appendChild(tagElement);
                } else {
                    console.error("添加标签时出错:", xhr.statusText);
                }
            };
        
            // 发送 JSON 数据到后端
            xhr.send(JSON.stringify(requestData));
        
                // 继续添加标签到前端
        }
        tagInput.value = "";
    }
}









//id获取评论
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
function loadComments(articleId) {
    console.log('调用加载评论函数')
    const xhr = new XMLHttpRequest();

    // 使用 articleId 发送请求以获取评论数据

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
                        <p>${comment.comment_id} ${comment.user_name} 评论于 ${comment.timestamp}</p>
                        <p>${comment.comment_text}</p>
                    `;

                    // 添加删除文本
                    const deleteText = document.createElement("span");
                    deleteText.textContent = "删除";
                    deleteText.style.color = "blue";
                    deleteText.style.cursor = "pointer";

                    // 添加点击事件处理程序
                    deleteText.addEventListener("click", function () {
                        // 在点击删除文本时执行删除评论的操作
                        deleteComment(comment.comment_id, articleId);
                    });

                    // 添加分割线
                    const separator = document.createElement("hr");

                    // 将删除文本添加到评论文本后面
                    commentItem.appendChild(deleteText);

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
    
// 处理删除评论的函数，这里你需要实现具体的删除逻辑
// ### 3 删除评论

// **请求**

// - 方法: DELETE

// - URL: http://127.0.0.1:8080/Blog-System/comment/delete

// **请求体**

// | 字段名     | 格式 | 是否必需 | 简介     |
// | ---------- | ---- | -------- | -------- |
// | Comment_id | Int  | T        | 评论的id |
// | articleid | Int  | T        | 评论的id |

// **响应**

// - 成功响应（200）

// - 错误响应（101, 105）
function deleteComment(commentId, articleID) {
    const xhr = new XMLHttpRequest();



    const url = `http://127.0.0.1:8080/Blog-System/comment/delete?Comment_id=${commentId}`;
    xhr.open("DELETE", url, true);






    xhr.onload = function () {
        if (xhr.status === 200) {
            // 删除成功的处理逻辑，可以刷新评论列表等
            
            console.log(`评论 ${commentId} 已成功删除。`);
            loadComments(articleID);
            alert("删除成功");

        } else {
            // 处理删除失败的情况
            console.error(`删除评论 ${commentId} 时出错: ${xhr.statusText}`);
        }
    };
    xhr.send(JSON.stringify());


}


    
    
    //id获取文章信息插入文本框
//     ### 1 根据博客id获取文章详细内容

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
    function getArticleData(articleID) {

    
        const xhr = new XMLHttpRequest();


        const url = `http://127.0.0.1:8080/Blog-System/blog/info?id=${articleID}`;
        xhr.open("GET", url, true);
    
    
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                const titleInput = document.getElementById("title");
                const contentTextarea = document.getElementById("content");
            
                titleInput.value = data.title;
                contentTextarea.value = data.content;
            } else {
                console.error(错误)
            }
        };
    
        xhr.send();
    }
     // 定义 changeArticleData 函数
//      ### 4 修改文章（未完成）

// **描述**

// 该接口用于向服务器端发布文章内容，文章内容可以分为多个部分发送，每个部分不能超过1500字符。用户需要提供文章ID、作者用户名、文章内容的每个部分，以及部分的总数和当前部分的索引。

//  **请求**

// - 方法: POST

// - URL: http://127.0.0.1:8080/Blog-System/blog/modify

// **请求体**

// | 字段名    | 格式   | 是否必需 | 简介                                 |
// | --------- | ------ | -------- | ------------------------------------ |
// | articleid | Int    | T        | 要修改的博客的ID                     |
// | author    | String | T        | 作者用户名                           |
// | title    | String | T        | 标题                         |
// | content   | String | T        | 要修改的文章内容的部分，最大1500字符 |
// | allnum    | Int    | T        | 文章内容总共被分为多少部分           |
// | index     | Int    | T        | 当前修改部分的索引                   |

// **响应**

// - 成功响应（200）

// - 错误响应（101，104）
function changeArticleData(username, articleid) {
    // 获取文本框内容
    const contentTextarea = document.getElementById("content");
    const titleTextarea = document.getElementById("title");
    const content = contentTextarea.value;
    const title = titleTextarea.value;

    // 检查文本是否超过1500字符
    // 检查文本是否超过1500字符
        if (content.length > 1500) {
            // 分割文本
            const maxLength = 1500;
            const contentParts = [];

            for (let i = 0; i < content.length; i += maxLength) {
                const part = content.substr(i, maxLength);
                contentParts.push(part);
            }
            const tenum = Math.floor(content.length / maxLength);
            const contentLength = content.length;

            // 判断是否有余数
            const hasRemainder = contentLength % maxLength !== 0;
            // 如果有余数，加1
            const ALLNUM = hasRemainder ? tenum + 1 : tenum;
            console.log(ALLNUM);
            console.log(content.length);
            console.log(maxLength);

            var nu = 0;

            // 逐个发送分割后的内容
            contentParts.forEach((part, index) => {
                // 发送all是一共要发多少部分，index是块序号，由于异步不是顺序，需要index排序
                const jsonData = {
                    all: ALLNUM,
                    index: index,
                    articleid: articleid,
                    title: title,
                    content: part,
                    author: username
                };
                console.log(jsonData);

                // 延迟发送，每个部分之间间隔0.5秒
                setTimeout(() => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("POST", "http://127.0.0.1:8080/Blog-System/blog/modify", true);
                    xhr.setRequestHeader("Content-Type", "application/json");

                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            nu = nu + 1;
                            console.log(nu);
                            if (nu === ALLNUM) {
                                alert("保存成功");
                            }
                        } else {
                            console.error(`保存数据时出错 - 部分 ${index + 1}:`, xhr.statusText);
                        }
                    };

                    // 发送JSON数据到后端
                    xhr.send(JSON.stringify(jsonData));
                }, index * 500); // 间隔0.5秒
            });
        } else {
            // 数据没有超过1500字符，直接发送
            const jsonData = {
                all: 1,
                index: 0,
                articleid: articleid,
                title: title,
                content: content,
                author: username
            };
            console.log(jsonData);

            // 创建XHR请求
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:8080/Blog-System/blog/modify", true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log("数据已成功保存到后端");
                    alert('保存成功');
                } else {
                    console.error("保存数据时出错:", xhr.statusText);
                }
            };

            // 发送JSON数据到后端
            xhr.send(JSON.stringify(jsonData));
        }
}






    

    

document.addEventListener("DOMContentLoaded", function () 
{
    const urlParams = new URLSearchParams(window.location.search);
    const article_id = urlParams.get("id");
    console.log(article_id);

    const username = sessionStorage.getItem('username');

                    if (username) {
                       
                    } else {
                        console.error('未找到用户名参数');
                    }
    document.getElementById("return-button").addEventListener("click", function() {
        window.location.href = `userblog.html?blogname=${username}`;
        
    });
  
            // 获取按钮元素
            const button = document.getElementById("myButton");

            // 当按钮被点击时执行的函数
            button.addEventListener("click", function () {
                // 假设你的用户名和文章 ID

    
                // 调用 changeArticleData 函数
                changeArticleData(username, article_id);
            });
            const addTagButton = document.getElementById("add-tag-button");

            addTagButton.addEventListener("click", function() {
                // 在用户点击添加标签按钮时执行 addTag
                addTag(article_id);

                console.log("addtag")
                console.log(article_id)
            });

    loadComments(article_id)
    loadTagsForArticle(article_id)
    addTag(article_id)
    getArticleData(article_id)

    
});