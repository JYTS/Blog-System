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
    const tagContainer = document.getElementById("taglist");

    // 向后台请求标签数据
    function loadTags() 
    {
        const xhr = new XMLHttpRequest();

        const url = ` http://127.0.0.1:8080/Blog-System/tag/getnTags?num=${num}`;
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


                            addTagToContainer(selectedTag)
                        });

                        // 将标签元素添加到标签容器
                        tagContainer.appendChild(tagElement);
                    });
                }
            } else {
                console.error("获取标签数据时出错:", xhr.statusText);
            }
        };

        xhr.send();
    }

    // 调用加载标签数据的函数
    loadTags();
}

//添加标签
function addTagToContainer(tagText) {
    const tagContainer = document.getElementById("tag-container");

    // 检查容器中是否已存在相同文本的标签
    const existingTags = tagContainer.getElementsByClassName("tag");
    let tagAlreadyExists = false;

    for (let i = 0; i < existingTags.length; i++) {
        if (existingTags[i].textContent === tagText) {
            // 如果发现相同的标签文本，将标志设置为 true，并中断循环
            tagAlreadyExists = true;
            alert("已存在相同的标签: " + tagText);
            break;
            
        }
    }

    // 如果标签不存在，才创建并添加新标签
    if (!tagAlreadyExists) {
        const tagElement = document.createElement("div");
        tagElement.className = "tag";
        tagElement.textContent = tagText;
        tagElement.setAttribute("data-tag", tagText);

        // 将标签元素添加到标签容器
        tagContainer.appendChild(tagElement);

        tagElement.addEventListener("click", function() {
            // 从容器中移除被点击的标签
            tagContainer.removeChild(tagElement);
        });
    }
}







// ### 2 创建博客文章

// **请求**

// - 方法: POST

// - URL: http://127.0.0.1:8080/Blog-System/blog/insert

// **请求体**

// | 字段名   | 格式   | 是否必需 | 简介       |
// | -------- | ------ | -------- | ---------- |
// | title    | String | T        | 博客标题   |
// | username | String | T        | 作者用户名 |

// **响应**

// - 成功响应（200）

// - 错误响应（101，102）

// | 字段名     | 格式 | 是否必需 | 简介     |
// | ---------- | ---- | -------- | -------- |
// | article_id | Int  | T        | 博客的ID |
function sendArticleData(title, username) {
    // 创建一个新的XMLHttpRequest对象
    const xhr = new XMLHttpRequest();

    // 配置HTTP请求
    xhr.open("POST", "http://127.0.0.1:8080/Blog-System/blog/insert", true);

    // 定义响应处理函数
    xhr.onload = function () 
    {
        if (xhr.status === 200) {

                const data = JSON.parse(xhr.responseText);
                const articleId = data.article_id;

                if (articleId) {
                    // 成功获取文章ID，可以执行相应操作
                    console.log("文章ID: " + articleId);
                        changeArticleData(username, articleId);
                        addTagsToArticle(articleId);

                    // 这里可以继续处理 articleId
                } else {
                    // 未成功获得文章ID，可以进行错误处理
                    console.error("未能获取文章ID");
                }
            }
 
    };

    // 创建一个包含文章名和用户名的JSON对象
    const data = {
        title: title,
        username: username,
    };

    // 设置请求头，以便服务器能够正确解析JSON数据
    xhr.setRequestHeader("Content-Type", "application/json");

    // 发送JSON数据到服务器
    xhr.send(JSON.stringify(data));
}
// ### 4 修改文章（未完成）

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
// ### 2 添加标签

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
function addTagsToArticle(articleID) {
    // 获取所有标签元素
    const tagContainer = document.getElementById("tag-container");
    const tagElements = tagContainer.getElementsByClassName("tag");

    // 遍历标签元素并发送请求添加标签
    for (let i = 0; i < tagElements.length; i++) {
        const tagName = tagElements[i].textContent;
        
        // 创建一个新的XMLHttpRequest对象
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8080/Blog-System/tag/insert", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        
        // 设置XHR的响应处理函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) { // 请求已完成
                console.log("请求完成。状态码：" + xhr.status);
                if (xhr.status === 200) {
                    console.log("标签 '" + tagName + "' 已成功添加到文章ID " + articleID);
                } else {
                    console.error("无法添加标签 '" + tagName + "' 到文章ID " + articleID);
                }
            }
        };
        
        // 创建要发送的数据
        
        const data = JSON.stringify({
            articleID: articleID,
            tagName: tagName
        });
        console.log(data)

        // 发送POST请求
        xhr.send(data);
    }
}





   
    
// 标签添加按钮
const tagInput = document.getElementById("tag");
const addButton = document.getElementById("add-tag-button");

// 绑定按钮点击事件
addButton.addEventListener("click", function () {
    const tagText = tagInput.value; // 获取文本框内容
    if (tagText.trim() !== "") { // 检查是否为空
        addTagToContainer(tagText); // 调用添加标签函数
        tagInput.value = ""; // 清空文本框内容
    }
});




    
    
    






    

    

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
    
loadTagsAndAddToContainer(19)
document.getElementById("return-button").addEventListener("click", function() {
    window.location.href = `userblog.html?blogname=${username}`;
    
});
// 获取按钮元素
const myButton = document.getElementById("myButton");

// 添加点击事件处理程序
myButton.addEventListener("click", function() {
    // 获取标题输入框元素
    const titleInput = document.getElementById("title");

    // 获取标题输入框的值
    const titleValue = titleInput.value;

    // 检查标题是否为空
    if (titleValue.trim() === "") {
        // 如果标题为空，显示错误消息或执行其他适当的操作
        alert("标题不能为空！");
    } else {
        // 标题不为空，执行你需要的操作
        console.log("标题: " + titleValue);
        sendArticleData(titleValue, username) ;
        sessionStorage.removeItem("indexid");
    }
});

    
    
    
    
    
    
});