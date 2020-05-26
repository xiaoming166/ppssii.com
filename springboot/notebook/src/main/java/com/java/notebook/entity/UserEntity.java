package com.java.notebook.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 用户表
 * 
 * @author hxm
 * @email no@gmail.com
 * @date 2020-05-25 22:34:07
 */
@Data
@TableName("user")
public class UserEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 
	 */
	private String username;
	/**
	 * 
	 */
	private String password;
	/**
	 * 
	 */
	private String email;
	/**
	 * 
	 */
	private String createdAt;
	/**
	 * 
	 */
	private String updatedAt;
	/**
	 * 1正常注册，0游客
	 */
	private Integer type;
	/**
	 * 
	 */
	private String phone;
	/**
	 * 1正常使用，0不可使用
	 */
	private Integer status=1;
	/**
	 * 
	 */
	private String token;

}
