package com.java.notebook.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 笔记文件表
 * 
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
@Data
@TableName("notefile")
public class NotefileEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private Integer pid;
	/**
	 * 越小越靠前
	 */
	private Integer orderid;
	/**
	 * 
	 */
	private String noteinner;
	/**
	 * 
	 */
	private Integer uid;
	/**
	 * 
	 */
	private String username;


	private String notename;

}
