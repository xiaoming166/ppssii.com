package com.java.notebook.service.impl;

import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.Query;
import com.java.notebook.entity.ManynodesEntity;
import com.java.notebook.entity.UserEntity;
import com.java.notebook.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.java.notebook.dao.NotefileDao;
import com.java.notebook.entity.NotefileEntity;
import com.java.notebook.service.NotefileService;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Service("notefileService")
public class NotefileServiceImpl extends ServiceImpl<NotefileDao, NotefileEntity> implements NotefileService {
    @Autowired
    private UserService userService;

    @Override
    public PageUtils queryPage(Map<String, Object> params,HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        QueryWrapper<NotefileEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("uid",userEntity.getId()).eq("username",userEntity.getUsername());
        IPage<NotefileEntity> page = this.page(
                new Query<NotefileEntity>().getPage(params),
                wrapper
        );

        return new PageUtils(page);
    }

    @Override
    public NotefileEntity getByIdWithToken(Integer id, HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        QueryWrapper<NotefileEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("uid",userEntity.getId()).eq("username",userEntity.getUsername()).eq("id",id);

        return this.getOne(wrapper);
    }

    @Override
    public void saveWithToken(NotefileEntity notefile, HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        notefile.setUid(userEntity.getId());
        notefile.setUsername(userEntity.getUsername());
        this.save(notefile);
    }

    @Override
    public void updateByIdWithToken(NotefileEntity notefile, HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        notefile.setUid(userEntity.getId());
        notefile.setUsername(userEntity.getUsername());
        this.updateById(notefile);
    }

    @Transactional
    @Override
    public void removeByIdsWithToken(List<Integer> integers, HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        if(userEntity==null){
            return;
        }

        for (Integer id : integers) {
            QueryWrapper<NotefileEntity> wrapper = new QueryWrapper<>();
            wrapper.eq("uid",userEntity.getId()).eq("username",userEntity.getUsername()).eq("id",id);
            this.baseMapper.delete(wrapper);
            log.info("删除了笔记 id= "+id);
        }
    }

}