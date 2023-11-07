package Test;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

public class MyFilter implements javax.servlet.Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("----过滤器初始化----");
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        // 设置允许跨域访问的域名
        httpResponse.setHeader("Access-Control-Allow-Origin", "*");
        // 设置允许跨域访问的方法
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        // 设置允许跨域访问的请求头
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");


        //对request和response进行一些预处理
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        chain.doFilter(request, response);  //让目标资源执行，放行
    }


    @Override
    public void destroy() {
        System.out.println("----过滤器销毁----");
    }
}