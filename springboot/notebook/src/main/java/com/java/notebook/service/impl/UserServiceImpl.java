package com.java.notebook.service.impl;

import com.java.notebook.common.utils.MyUtils;
import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.Query;
import com.java.notebook.common.utils.R;
import com.java.notebook.entity.ManynodesEntity;
import com.java.notebook.entity.NotefileEntity;
import com.java.notebook.properties.MyRedisProperties;
import com.java.notebook.service.ManynodesService;
import com.java.notebook.service.NotefileService;
import com.java.notebook.vo.ResetPasswordVo;
import com.java.notebook.vo.UserVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.java.notebook.dao.UserDao;
import com.java.notebook.entity.UserEntity;
import com.java.notebook.service.UserService;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserDao, UserEntity> implements UserService {
    @Autowired
    private MyRedisProperties myRedisProperties;
    @Autowired
    private RedisTemplate redisTemplate;
    @Autowired
    private ManynodesService manynodesService;
    @Autowired
    private NotefileService notefileService;

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<UserEntity> page = this.page(
                new Query<UserEntity>().getPage(params),
                new QueryWrapper<UserEntity>()
        );

        return new PageUtils(page);
    }

    @Transactional
    @Override
    public R register(@Valid UserVo userVo) {
        //校验密码一致
        if (!userVo.getPassword().equals(userVo.getPassword_confirmation())) {
            return R.error(444, "两次密码不一致");
        }
        //校验用户名是否存在
        boolean judgeusername = judgeusername(userVo.getUsername());
        if (!judgeusername) {
            return R.error(444, "用户名已存在");
        }
        boolean emailExist = isEmailExist(userVo.getEmail());
        if(emailExist){
            return R.error(444, "该邮箱已存在，请登录");
        }
        //验证码是否正确
        Object redisObject = redisTemplate.opsForValue().get(userVo.getEmail());

        if (redisObject == null||!redisObject.toString().equals(userVo.getValidatenum().toString().trim())) {
            //log.info("redis="+redisObject.toString());
           // log.info("uservo="+userVo.getValidatenum());
            return R.error(444, "验证码不正确");
        }


        //生成token
        String token = MyUtils.getToken();
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(userVo, userEntity);
        userEntity.setToken(token);
        //保存redis  7天
        redisTemplate.delete(userVo.getEmail());//删除验证码
        redisTemplate.opsForValue().set(token, userVo.getUsername(), myRedisProperties.getSavetokendays(), TimeUnit.DAYS);

        //保存数据库
        userEntity.setToken(token);
        userEntity.setType(1);
        userEntity.setCreatedAt(MyUtils.getDate());
        this.baseMapper.insert(userEntity);
        return R.ok();
    }

    public boolean judgeusername(String username) {
        List<UserEntity> entityList = this.baseMapper.
                selectList(new QueryWrapper<UserEntity>().eq("username", username));
        if (entityList != null && entityList.size() > 0) {
            return false;
        }
        return true;
    }

    @Override
    public R login(@Valid UserVo userVo) {

        QueryWrapper<UserEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("username",userVo.getUsername()).eq("password",userVo.getPassword());

        UserEntity userEntity = this.baseMapper.selectOne(wrapper);
        if(userEntity==null){
            return R.error(401,"用户名或密码不对");
        }
        if(StringUtils.isEmpty(userEntity.getToken())){
            userEntity.setToken(MyUtils.getToken());
            redisTemplate.opsForValue().
                    set(userEntity.getToken(),userEntity.getUsername(),myRedisProperties.getSavetokendays(),TimeUnit.DAYS);
            this.baseMapper.updateById(userEntity);
        }

        //清除密码
        userEntity.setPassword(null);

        return R.ok().put("data",userEntity);
    }

    @Override
    public R resetPassword(@Valid ResetPasswordVo resetPasswordVo) {
        //校验密码一致
        if (!resetPasswordVo.getPassword().equals(resetPasswordVo.getPassword_confirmation())) {
            return R.error(444, "两次密码不一致");
        }

        //验证码是否正确
        Object redisObject = redisTemplate.opsForValue().get(resetPasswordVo.getEmail());

        if (redisObject == null||!redisObject.toString().equals(resetPasswordVo.getValidatenum().toString().trim())) {

            return R.error(444, "验证码不正确");
        }
        redisTemplate.delete(resetPasswordVo.getEmail());
        QueryWrapper<UserEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("email",resetPasswordVo.getEmail());
        UserEntity userEntity = this.baseMapper.selectOne(wrapper);

        userEntity.setPassword(resetPasswordVo.getPassword());
        userEntity.setUpdatedAt(MyUtils.getDate());
        userEntity.setToken(null);



        this.baseMapper.updateById(userEntity);
        return R.ok().put("data","重置密码成功");
    }

    @Transactional
    @Override
    public R logout(String token) {
        if(StringUtils.isEmpty(token)){
            return R.error(444, "token不能为空");
        }
        Boolean delete = redisTemplate.delete(token);
        UserEntity userBytoken = getUserBytoken(token);
        if(userBytoken==null){
            return R.error(444, "token查询不存在");
        }
        userBytoken.setToken("");
        log.info("user logout="+userBytoken);
        this.baseMapper.updateById(userBytoken);

        return R.ok().put("data","退出成功:"+delete);
    }

    public UserEntity getUserBytoken(String token){
        QueryWrapper<UserEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("token",token);
        UserEntity userEntity = this.baseMapper.selectOne(wrapper);

        return userEntity;
    }

    @Transactional
    @Override
    public void updateUser(UserEntity user) {
        //修改user表
        this.updateById(user);
        //修改many表
        QueryWrapper<ManynodesEntity> manywrapper = new QueryWrapper<>();
        manywrapper.eq("uid",user.getId()).eq("username",user.getUsername());
        ManynodesEntity manynodesEntity = new ManynodesEntity();
        manynodesEntity.setUid(user.getId());
        manynodesEntity.setUsername(user.getUsername());
        manynodesService.update(manynodesEntity,manywrapper);
        //修改notefile表
        QueryWrapper<NotefileEntity> noteWrapper = new QueryWrapper<>();
        noteWrapper.eq("uid",user.getId()).eq("username",user.getUsername());
        NotefileEntity notefileEntity = new NotefileEntity();
        notefileEntity.setId(user.getId());
        notefileEntity.setUsername(user.getUsername());
        notefileService.update(notefileEntity,noteWrapper);


    }

    @Override
    public UserEntity getUserByRequest(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        String uuid = request.getHeader("uuid");
        UserEntity userEntity= null;
        if(!StringUtils.isEmpty(token)){
            userEntity = getUserBytoken(token);
        }
        if(!StringUtils.isEmpty(uuid)){
            userEntity = getUserBytoken(uuid);
        }

        return userEntity;
    }

    public boolean isEmailExist(String email){
        List<UserEntity> entityList = this.baseMapper.
                selectList(new QueryWrapper<UserEntity>().eq("email", email));
        if (entityList != null && entityList.size() > 0) {
            return true;
        }
        return false;//email不存在
    }

}