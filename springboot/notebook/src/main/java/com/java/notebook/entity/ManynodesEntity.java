package com.java.notebook.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

import javax.validation.constraints.NotNull;

/**
 * 左边一栏的分类
 * 
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
@Data
@TableName("manynodes")
public class ManynodesEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	@NotNull
	private Integer pid;
	/**
	 * 
	 */
	private String nodename;
	/**
	 * 
	 */
	@NotNull
	private String username;
	/**
	 * 
	 */
	private Integer orderid=0;
	/**
	 * 
	 */
	private Integer catlevel;
	/**
	 * 
	 */
	@NotNull
	private Integer uid;

}
