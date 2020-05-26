package com.java.notebook.vo;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class ResetPasswordVo {
    @NotNull
    private String password;

    private String password_confirmation;

    @Email
    private String email;

    private Integer validatenum;
}
