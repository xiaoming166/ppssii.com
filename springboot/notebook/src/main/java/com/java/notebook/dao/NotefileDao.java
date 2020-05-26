package com.java.notebook.dao;

import com.java.notebook.entity.NotefileEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 笔记文件表
 * 
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
@Mapper
public interface NotefileDao extends BaseMapper<NotefileEntity> {
	
}
