package com.java.notebook.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.java.notebook.common.utils.PageUtils;
import com.java.notebook.common.utils.R;
import com.java.notebook.entity.ManynodesEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 左边一栏的分类
 *
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
public interface ManynodesService extends IService<ManynodesEntity> {


    R queryList(HttpServletRequest request);//树型json

    void save(ManynodesEntity manynodes, HttpServletRequest request);

    void updateById(ManynodesEntity manynodes, HttpServletRequest request);

    <T> void removeByIds(List<T> ts, HttpServletRequest request);
}

