package com.java.notebook.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

import com.java.notebook.entity.NotefileEntity;
import com.java.notebook.service.NotefileService;

import javax.servlet.http.HttpServletRequest;


/**
 * 笔记文件表
 *
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
//@Api(tags = "")
@Slf4j
@RestController
@RequestMapping("api/notefile")
public class NotefileController {
    @Autowired
    private NotefileService notefileService;

    /**
     * 列表
     */

    @PostMapping("/list")
    public R list(@RequestBody(required = false) Map<String, Object> params, HttpServletRequest request){
        if(params==null){
            params = new HashMap<>();
            params.put("page","1"); //默认第一页
            params.put("limit","15"); //默认15条
        }
        PageUtils page = notefileService.queryPage(params,request);

        return R.ok().put("data", page);
    }


    /**
     * 信息
     */
    @GetMapping("/info/{id}")
    public R info(@PathVariable("id") Integer id, HttpServletRequest request){

		NotefileEntity notefile = notefileService.getByIdWithToken(id,request);
		if(notefile==null){
            return R.ok().put("data", notefile).put("data","抱歉，没有查到数据");
        }

        return R.ok().put("data", notefile);
    }

    /**
     * 保存
     */
    @PostMapping("/save")
    public R save(@RequestBody NotefileEntity notefile, HttpServletRequest request){

		notefileService.saveWithToken(notefile,request);

        return R.ok();
    }

    /**
     * 修改
     */
    @PutMapping("/update")
    public R update(@RequestBody NotefileEntity notefile, HttpServletRequest request){

		notefileService.updateByIdWithToken(notefile,request);

        return R.ok();
    }

    /**
     * 删除
     */
    @DeleteMapping("/delete")
    public R delete(@RequestBody Integer[] ids, HttpServletRequest request){

		notefileService.removeByIdsWithToken(Arrays.asList(ids),request);

        return R.ok();
    }

}
