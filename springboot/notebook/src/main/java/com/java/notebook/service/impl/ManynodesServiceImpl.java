package com.java.notebook.service.impl;

import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.Query;
import com.java.notebook.common.utils.R;
import com.java.notebook.entity.NotefileEntity;
import com.java.notebook.entity.UserEntity;
import com.java.notebook.service.NotefileService;
import com.java.notebook.service.UserService;
import com.java.notebook.vo.CategoryVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.java.notebook.dao.ManynodesDao;
import com.java.notebook.entity.ManynodesEntity;
import com.java.notebook.service.ManynodesService;
import org.springframework.transaction.annotation.Transactional;

import javax.jws.soap.SOAPBinding;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@Service("manynodesService")
public class ManynodesServiceImpl extends ServiceImpl<ManynodesDao, ManynodesEntity> implements ManynodesService {

    @Autowired
    private UserService userService;
    @Autowired
    private NotefileService notefileService;


    @Override
    public R queryList(HttpServletRequest request) {

        String token = request.getHeader("Authorization");
        String uuid = request.getHeader("uuid");
        UserEntity userEntity= null;
        if(!StringUtils.isEmpty(token)){
            userEntity = userService.getUserBytoken(token);
        }
        if(!StringUtils.isEmpty(uuid)){
            userEntity = userService.getUserBytoken(uuid);
        }


        QueryWrapper<ManynodesEntity> wrapper = new QueryWrapper<>();
        wrapper.eq("uid",userEntity.getId()).eq("username",userEntity.getUsername());

        //1、查出所有分类
        List<ManynodesEntity> entities = this.list(wrapper);
        ArrayList<CategoryVo> categoryVos = new ArrayList<>();
        for (ManynodesEntity entity : entities) {
            CategoryVo categoryVo = new CategoryVo();
            BeanUtils.copyProperties(entity,categoryVo);
            categoryVos.add(categoryVo);
        }

        //2、组装成父子的树形结构

        List<CategoryVo> Menus = categoryVos.stream().filter(categoryEntity ->
                categoryEntity.getPid() == null
        ).map((menu)->{
            menu.setChildren(getChildrens(menu,categoryVos));
            return menu;
        }).sorted((menu1,menu2)->{
            return (menu1.getOrderid()==null?0:menu1.getOrderid()) - (menu2.getOrderid()==null?0:menu2.getOrderid());
        }).collect(Collectors.toList());


        return R.ok().put("data",Menus);
    }



    @Override
    public void save(ManynodesEntity manynodes, HttpServletRequest request) {

        UserEntity userEntity = userService.getUserByRequest(request);
        if(userEntity==null){
            return;
        }
        manynodes.setUid(userEntity.getId());
        manynodes.setUsername(userEntity.getUsername());

        this.save(manynodes);
    }

    @Override
    public void updateById(ManynodesEntity manynodes, HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        if(userEntity==null){
            return;
        }
        manynodes.setUid(userEntity.getId());
        manynodes.setUsername(userEntity.getUsername());

        this.updateById(manynodes);
    }

    @Override
    public <T> void removeByIds(List<T> ts, HttpServletRequest request) {
        UserEntity userEntity = userService.getUserByRequest(request);
        if(userEntity==null){
            return;
        }

        for (T t : ts) {
            QueryWrapper<ManynodesEntity> wrapper = new QueryWrapper<>();
            wrapper.eq("uid",userEntity.getId()).eq("username",userEntity.getUsername()).eq("id",t);
            remove(wrapper);
        }
    }


    //递归查找所有菜单的子菜单
    private List<CategoryVo> getChildrens(CategoryVo root,List<CategoryVo> all){

        List<CategoryVo> children = all.stream().filter(categoryEntity -> {
            return categoryEntity.getPid() == root.getId();
        }).map(categoryEntity -> {
            //1、找到子菜单
            categoryEntity.setChildren(getChildrens(categoryEntity,all));
            return categoryEntity;
        }).sorted((menu1,menu2)->{
            //2、菜单的排序
            return (menu1.getOrderid()==null?0:menu1.getOrderid()) - (menu2.getOrderid()==null?0:menu2.getOrderid());
        }).collect(Collectors.toList());

        return children;
    }

}