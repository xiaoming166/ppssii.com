package com.java.notebook.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

//import org.apache.shiro.authz.annotation.RequiresPermissions;
import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiImplicitParam;
//import io.swagger.annotations.ApiImplicitParams;
import lombok.extern.slf4j.Slf4j;

import com.java.notebook.entity.ManynodesEntity;
import com.java.notebook.service.ManynodesService;

import javax.servlet.http.HttpServletRequest;


/**
 * 左边一栏的分类
 *
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */

@Slf4j
@RestController
@RequestMapping("api/menu")
public class ManynodesController {
    @Autowired
    private ManynodesService manynodesService;

    /**
     * 列表
     */

    @GetMapping("/list")
    public R list(HttpServletRequest request){

        R r  =  manynodesService.queryList(request);

        return r;
    }




    /**
     * 保存
     */
    @PostMapping("/save")
    public R save(@RequestBody ManynodesEntity manynodes,HttpServletRequest request){
		manynodesService.save(manynodes,request);

        return R.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    //@RequiresPermissions("notebook:manynodes:update")
    public R update(@RequestBody ManynodesEntity manynodes,HttpServletRequest request){
		manynodesService.updateById(manynodes,request);

        return R.ok();
    }


    @DeleteMapping("/delete")
    public R delete(@RequestBody Integer[] ids,HttpServletRequest request){

		manynodesService.removeByIds(Arrays.asList(ids),request);

        return R.ok();
    }

}
