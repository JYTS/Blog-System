document.getElementById('changePasswordButton').addEventListener('click', function() {
    var currentPassword = document.getElementById('currentPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    // var email = document.getElementById('email').value;
    
    const username = sessionStorage.getItem('username');

    if (username) {

    } else {
        console.error('未找到用户名参数');
    }
    if (newPassword !== confirmPassword) {
        document.getElementById('message').innerHTML = "新密码和确认密码不匹配";
    } else {
        var xhr = new XMLHttpRequest();

//         ### 1 用户登录

// **请求**

// - 方法: POST

// -  URL: http://127.0.0.1:8080/Blog-System/user/login

// **请求体**

// | 字段名   | 格式   | 是否必需 | 简介   |
// | -------- | ------ | -------- | ------ |
// | username | String | T        | 用户名 |
// | password | String | T        | 密码   |

// **响应**

// - 成功响应（200）


// - 错误响应（101-103）
        xhr.open('POST', 'http://127.0.0.1:8080/Blog-System/user/login', true); // 替换为实际的后端端点，用于验证原密码
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status === 200) 
            {


                    // 原密码验证通过，发送修改密码请求
                    var changePasswordXhr = new XMLHttpRequest();
                    // ### 4 用户修改密码（未完成）

                    // **请求**
                    
                    // - 方法: POST
                    // - URL: http://127.0.0.1:8080/Blog-System/user/pwdModify
                    
                    // **请求体**
                    
                    // | 字段名   | 格式   | 是否必需 | 简介   |
                    // | -------- | ------ | -------- | ------ |
                    // | username | String | T        | 用户名 |
                    // | password | String | T        | 密码   |
                    
                    // **响应**
                    
                    // - 成功响应（200）
                    
                    // - 错误响应（101）

                    changePasswordXhr.open('POST', 'http://127.0.0.1:8080/Blog-System/user/pwdModify', true); // 替换为实际的后端端点，用于修改密码
                    changePasswordXhr.setRequestHeader('Content-Type', 'application/json');

                    var changePasswordData = {
                        username:username,
                        password: newPassword,
                        // email:email,
                        
                    };
                    console.log(changePasswordData)

                    changePasswordXhr.onload = function() {
                        if (changePasswordXhr.status === 200) {
                           
                                document.getElementById('message').innerHTML = "密码修改成功";

                        } else {
                            document.getElementById('message').innerHTML = "密码修改请求失败";
                        }
                    };

                    changePasswordXhr.send(JSON.stringify(changePasswordData));

            } else {
                document.getElementById('message').innerHTML = "原密码验证请求失败";
            }
        };

        var requestData = {
            username:username,
            password: currentPassword,
        };
        console.log(requestData)

        xhr.send(JSON.stringify(requestData));
    }
});
