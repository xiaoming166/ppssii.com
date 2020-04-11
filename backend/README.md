## 项目概述

本项目是一个网络记事本的后端API项目，使用Laravel6.0开发。

## 功能如下

### 用户中心 

- 注册
- 登录
- 退出
- 密码找回
- 支持登录用户和游客用户

### 节点操作

- 显示网站内容
- 添加子节点
- 获取父节点下的所有子节点
- 更新子节点类容
- 删除子节点
-  更新菜单内容
- 移动节点
- 修改菜单排序
- 修改节点排序
- 添加父节点
- 删除父节点

## 运行环境要求

- PHP 7.2+

## 开发环境部署

对于环境部署，没有特殊要求，因人而异。推荐LNMP环境下部署。

### 操作步骤

1. 克隆代码

   ```shell
   git clone https://github.com/tsmliyun/note_api.git
   ```

2. 安装扩展包依赖

   ```php
   composer install
   ```

3. 生成配置文件

   ```shell
   cp .env.example .env
   ```

   你可以根据情况修改 `.env` 文件里的内容，如数据库连接、缓存、邮件设置等：

4. 生成密钥

   ```php
   php artisan key:generate
   ```

## 数据表说明

本项目涉及到三张表，结构如下

```mysql
-- 原项目的表
-- 菜单表
CREATE TABLE `pre_xiaomy_cus_todo_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL DEFAULT '0',
  `uid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(30) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `orderid` int(10) DEFAULT '0',
  `type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1登录用户 2 游客',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 原项目的表
-- 节点表
CREATE TABLE `pre_xiaomy_cus_todo_item` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL DEFAULT '0',
  `mid` int(10) NOT NULL DEFAULT '0',
  `uid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `username` varchar(30) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `zindex` int(10) NOT NULL,
  `content` text CHARACTER SET utf8 NOT NULL,
  `dateline` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 新建的表
-- 用户表
CREATE TABLE `pre_xiaomy_cus_todo_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '' COMMENT '登陆的用户名',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT 'email',
  `phone` char(11) NOT NULL DEFAULT '' COMMENT '电话号码',
  `password` char(60) NOT NULL DEFAULT '' COMMENT '密码',
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1 => 启用 0=>禁用',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`) USING BTREE,
  KEY `idx_username` (`username`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

## 接口说明

老的接口在原文档已经存在，这里列举的是新增接口的文档。

对于登录用户，头部需要带上鉴权认证。

### 请求头部

| 参数名        | 类型   | 是否必须 | 示例         | 备注                                   |
| ------------- | ------ | -------- | ------------ | -------------------------------------- |
| Authorization | string | N        | 登陆接口返回 | 身份认证，Bearer + 登录接口返回的token |

### 注册

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/auth/register | POST     |

#### 请求报文

| 字段名                | 类型   | 是否必填 | 描述                   | 示例值   |
| --------------------- | ------ | -------- | ---------------------- | -------- |
| username              | String | Y        | 当前页码               | test     |
| password              | String | Y        | 每页大小，最大不超过50 | 12345678 |
| password_confirmation | String | Y        | 更新时间 开始值        | 12345678 |

```json
{
	"username":"test",
	"password":"12345678",
	"password_confirmation":"12345678"
}
```

#### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```



### 登录

| 路由地址       | 请求方式 |
| -------------- | -------- |
| api/auth/login | POST     |

#### 请求报文

| 字段名   | 类型   | 是否必填 | 描述     | 示例值 |
| -------- | ------ | -------- | -------- | ------ |
| username | String | Y        | test     |        |
| password | String | Y        | 12345678 |        |

```json
{
	"username":"liyun",
	"password":"1234"
}
```

#### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9ub3RlX2FwaS5sb2NhbC5jb21cL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1ODY1MjU4MjcsImV4cCI6MTU4NzM4OTgyNywibmJmIjoxNTg2NTI1ODI3LCJqdGkiOiJhTFlyeVJZVGFtOGRBSmduIiwic3ViIjoxLCJwcnYiOiI0MWRmODgzNGYxYjk4ZjcwZWZhNjBhYWVkZWY0MjM0MTM3MDA2OTBjIn0.5mBImg7gMYd-MM5RCYy7JCQFFDvqGLuqspoQti8OrBE",
        "token_type": "bearer",
        "expires_in": 864000
    }
}
```



### 退出

| 路由地址        | 请求方式 |
| --------------- | -------- |
| api/auth/logout | POST     |

#### 请求报文

略

#### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

### 获取UUID

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/auth/makeUuid | POST     |

#### 请求报文

略

#### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "uuid": "595e5228-f75a-43de-ba92-6bdedfbc4707"
    }
}
```



## 其他说明

### 如何区分游客和登录用户

1. 头部传递uuid，且uuid的值不为空时，系统认为是游客访问，uuid是游客身份的唯一标识;
2. 头部传递 Authorization时，则认为是登录用户访问；Authorization的值为Bearer + token，token为登录接口返回的token值；
3. 当uuid和Authorization都传值时,uuid优先级更高；
4. uuid为后端接口返回，前端存储在本地；当无uuid时才请求后端接口获取uuid。