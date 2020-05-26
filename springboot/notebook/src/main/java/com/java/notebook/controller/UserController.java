package com.java.notebook.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

//import org.apache.shiro.authz.annotation.RequiresPermissions;
import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.R;
import com.java.notebook.service.EmailService;
import com.java.notebook.vo.ResetPasswordVo;
import com.java.notebook.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiImplicitParams;
import lombok.extern.slf4j.Slf4j;

import com.java.notebook.entity.UserEntity;
import com.java.notebook.service.UserService;

import javax.validation.Valid;
import javax.validation.constraints.Email;


/**
 * 用户表
 *
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
//@Api(tags = "")
@Slf4j
@RestController
@RequestMapping("api/auth")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    /**
     * 发送验证码
     */
    @GetMapping("/sendemailvalidatenum")
    public R sendEmailValidateNum(@RequestParam String email){

        R r  = emailService.sendEmailValidateNum(email);

       return r;
    }

    @GetMapping("/validateusername")
    public R validateusername(@RequestParam String username){
        boolean judgeusername = userService.judgeusername(username);
        if(!judgeusername){
            return R.error(444,"用户名已存在");
        }
        return R.ok().put("data","用户名可以使用");
    }




    @PostMapping("/register")
    public R register(@Valid @RequestBody UserVo userVo){

        R r = userService.register(userVo);


        return r;
    }




    @PostMapping("/login")
    public R login(@Valid @RequestBody UserVo userVo){

		R r = userService.login(userVo);

        return r;
    }
    @GetMapping("/logout")
    public R logout(@RequestParam String token){

		R r = userService.logout(token);

        return r;
    }

    @PostMapping("/retrievePwd")
    public R resetPassword(@Valid @RequestBody ResetPasswordVo resetPasswordVo){

        R r = userService.resetPassword(resetPasswordVo);

        return r;
    }



    /**
     * 修改
     */
    @PutMapping("/update")
    public R update(@RequestBody UserEntity user){

		userService.updateUser(user);

        return R.ok();
    }

//    /**
//     * 注销用户
//     */
//    @DeleteMapping("/delete")
//    //@RequiresPermissions("notebook:user:delete")
//    public R delete(@RequestBody Integer[] ids){
//		userService.removeByIds(Arrays.asList(ids));
//
//        return R.ok();
//    }

}
