package com.java.notebook.vo;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.util.List;

@Data
public class CategoryVo {

    private Integer id;

    private Integer pid;

    private String nodename;

    private String username;

    private Integer orderid;

    private Integer catlevel;

    private Integer uid;

    private List<CategoryVo> children;
}
