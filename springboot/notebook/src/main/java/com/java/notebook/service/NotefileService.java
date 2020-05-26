package com.java.notebook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.entity.NotefileEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 笔记文件表
 *
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
public interface NotefileService extends IService<NotefileEntity> {

    PageUtils queryPage(Map<String, Object> params, HttpServletRequest request);

    NotefileEntity getByIdWithToken(Integer id, HttpServletRequest request);

    void saveWithToken(NotefileEntity notefile, HttpServletRequest request);

    void updateByIdWithToken(NotefileEntity notefile, HttpServletRequest request);

    void removeByIdsWithToken(List<Integer> integers, HttpServletRequest request);
}

