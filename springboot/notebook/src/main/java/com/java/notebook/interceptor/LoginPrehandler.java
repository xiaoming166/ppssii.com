package com.java.notebook.interceptor;


import com.alibaba.fastjson.JSONObject;
import com.java.notebook.common.utils.Constant;
import com.java.notebook.common.utils.MyUtils;
import com.java.notebook.common.utils.R;
import com.java.notebook.entity.UserEntity;
import com.java.notebook.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class LoginPrehandler implements HandlerInterceptor {

    private StringRedisTemplate redisTemplate;

    private UserService userService;

    public LoginPrehandler(){

    }

    public LoginPrehandler(StringRedisTemplate redisTemplate,UserService userService){
        this.redisTemplate=redisTemplate;
        this.userService=userService;
    }


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("Authorization");
        request.setCharacterEncoding("UTF-8");
        String uuid = request.getHeader("uuid");

        //是否是游客登录
        if(!StringUtils.isEmpty(uuid)){

            String redis = redisTemplate.opsForValue().get(uuid);

            if(redis==null){
                UserEntity userEntity = new UserEntity();
                userEntity.setToken(uuid);
                userEntity.setType(Constant.youke);
                userEntity.setCreatedAt(MyUtils.getDate());
                userEntity.setUsername(MyUtils.getUsername());
                userEntity.setPassword(MyUtils.getUsername());
                userService.save(userEntity);
                redisTemplate.opsForValue().set(uuid,userEntity.getUsername());
            }


            return true;
        }

        //是否是有效的用户token
        if(StringUtils.isEmpty(token)){
            log.info("验证失败 用户令牌是："+token);
            R r = R.error(444, "Authorization is null");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(JSONObject.toJSONString(r));
            return false;
        }
        String username = redisTemplate.opsForValue().get(token);
        if(StringUtils.isEmpty(username)){
            log.info("验证失败 用户令牌是："+token);
            R r = R.error(444, "Authorization is not exist!!!");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(JSONObject.toJSONString(r));
            return false;
        }
        log.info("验证成功 用户令牌是："+token);

        return true;
    }
}
