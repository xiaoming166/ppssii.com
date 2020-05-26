package com.java.notebook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.R;
import com.java.notebook.entity.UserEntity;
import com.java.notebook.vo.ResetPasswordVo;
import com.java.notebook.vo.UserVo;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Map;

/**
 * 用户表
 *
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
public interface UserService extends IService<UserEntity> {

    PageUtils queryPage(Map<String, Object> params);

    R register(@Valid UserVo userVo);

    boolean judgeusername(String username);

    R login(@Valid UserVo userVo);

    R resetPassword(@Valid ResetPasswordVo resetPasswordVo);

    R logout(String token);

    public UserEntity getUserBytoken(String token);

    void updateUser(UserEntity user);

    UserEntity getUserByRequest(HttpServletRequest request);
}

