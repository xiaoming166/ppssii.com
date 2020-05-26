package com.java.notebook.vo;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class UserVo {

    @NotNull
    private String username;
    @NotNull
    private String password;

    private String password_confirmation;

    @Email
    private String email;

    @Pattern(regexp = "^[1]\\d{10}$", message = "手机号校验失败")
    private String phone;

    private Integer validatenum;
}
