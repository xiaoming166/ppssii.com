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

### 公共模块

对于登录用户，头部需要带上鉴权认证。

#### 请求头部

| 参数名        | 类型   | 是否必须 | 示例         | 备注                                   |
| ------------- | ------ | -------- | ------------ | -------------------------------------- |
| Authorization | string | N        | 登陆接口返回 | 身份认证，Bearer + 登录接口返回的token |
| uuid          | string | N        | 游客身份标识 | 请求makeUuid 接口返回                  |

#### 域名

api_url: 待配置

#### 接口请求方式

api_url + 路由地址

### 用户模块

#### 注册

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/auth/register | POST     |

##### 请求报文

| 字段名                | 类型   | 是否必填 | 描述                   | 示例值   |
| --------------------- | ------ | -------- | ---------------------- | -------- |
| username              | String | Y        | 当前页码               | test     |
| password              | String | Y        | 每页大小，最大不超过50 | 12345678 |
| password_confirmation | String | Y        | 更新时间 开始值        | 12345678 |
| email                 | String | Y        | 邮箱                   |          |
| phone                 | String | N        | 电话                   |          |

```json
{
	"username":"test",
	"password":"12345678",
	"password_confirmation":"12345678"
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```



#### 登录

| 路由地址       | 请求方式 |
| -------------- | -------- |
| api/auth/login | POST     |

##### 请求报文

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

##### 响应报文

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



#### 退出

| 路由地址        | 请求方式 |
| --------------- | -------- |
| api/auth/logout | POST     |

##### 请求报文

略

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

#### 获取UUID

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/auth/makeUuid | POST     |

##### 请求报文

略

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "uuid": "595e5228-f75a-43de-ba92-6bdedfbc4707"
    }
}
```

#### 发送邮件找回密码

| 路由地址             | 请求方式 |
| -------------------- | -------- |
| api/auth/retrievePwd | POST     |

##### 请求报文

| 字段名 | 类型   | 是否必填 | 描述     | 示例值     |
| ------ | ------ | -------- | -------- | ---------- |
| email  | String | Y        | 邮箱地址 | 123@qq.com |

```json
{
	"email":"123@qq.com"
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

#### 重置密码

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/auth/resetPwd | POST     |

##### 请求报文

| 字段名                | 类型   | 是否必填 | 描述                | 示例值     |
| --------------------- | ------ | -------- | ------------------- | ---------- |
| email                 | String | Y        | 邮箱地址            | 123@qq.com |
| token                 | String | Y        | 重置链接中的token值 |            |
| password              | String | Y        | 密码                |            |
| password_confirmation | String | Y        | 二次确认密码        |            |

```json
{
	"token":"9d1dd13e6c070cc6464af05aa6f5ecfc",
	"password":"1122334455",
	"password_confirmation":"1122334455",
	"email":"123@qq.com"
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

### 业务模块

#### 显示网站内容

| 路由地址      | 请求方式 |
| ------------- | -------- |
| api/menu/list | POST     |

##### 请求报文

略，认证信息在头部

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": [
        {
            "id": 746,
            "pid": 102,
            "uid": "1",
            "username": "test",
            "name": "test12311",
            "orderid": 0,
            "type": 1
        },
        {
            "id": 93,
            "pid": 0,
            "uid": "1",
            "username": "admin",
            "name": "生活",
            "orderid": 4,
            "type": 1
        },
        {
            "id": 92,
            "pid": 0,
            "uid": "1",
            "username": "admin",
            "name": "工作1",
            "orderid": 10,
            "type": 1
        }
    ]
}
```

#### 添加子节点

| 路由地址         | 请求方式 |
| ---------------- | -------- |
| api/menu/addItem | POST     |

##### 请求报文

| 字段名  | 类型   | 是否必填 | 描述   | 示例值 |
| ------- | ------ | -------- | ------ | ------ |
| mid     | int    | Y        | 菜单ID |        |
| content | String | Y        | 内容   |        |

```json
{
	"mid":92,
	"content":"test"
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "pid": 0,
        "mid": 92,
        "uid": 1,
        "username": "testname1",
        "zindex": 6,
        "content": "test",
        "dateline": 1586595209,
        "id": 9
    }
}
```

#### 获取父节点下的所有节点

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/menu/menuItem | POST     |

##### 请求报文

| 字段名 | 类型 | 是否必填 | 描述   | 示例值 |
| ------ | ---- | -------- | ------ | ------ |
| mid    | int  | Y        | 菜单ID |        |

```json
{
	"mid":92
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "id": 92,
        "pid": 0,
        "uid": "1",
        "username": "admin",
        "name": "工作1",
        "orderid": 10,
        "type": 1,
        "items": [
            {
                "id": 4,
                "pid": 0,
                "mid": 92,
                "uid": "1",
                "username": "test",
                "zindex": 10,
                "content": "11111",
                "dateline": null
            },
            {
                "id": 5,
                "pid": 0,
                "mid": 92,
                "uid": "1",
                "username": "test",
                "zindex": 4,
                "content": "test12311",
                "dateline": null
            }
        ]
    }
}
```

#### 编辑子节点

#### 

| 路由地址            | 请求方式 |
| ------------------- | -------- |
| api/menu/updateItem | POST     |

##### 请求报文

| 字段名  | 类型   | 是否必填 | 描述   | 示例值 |
| ------- | ------ | -------- | ------ | ------ |
| itemid  | int    | Y        | 节点ID |        |
| content | string | Y        | 内容   |        |

```json
{
	"itemid":5,
	"content":"test12311"
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "id": 5,
        "pid": 0,
        "mid": 92,
        "uid": "1",
        "username": "test",
        "zindex": 4,
        "content": "test12311",
        "dateline": null
    }
}
```

#### 更新菜单内容

| 路由地址            | 请求方式 |
| ------------------- | -------- |
| api/menu/updateMenu | POST     |

##### 请求报文

| 字段名 | 类型   | 是否必填 | 描述   | 示例值 |
| ------ | ------ | -------- | ------ | ------ |
| mid    | int    | Y        | 菜单ID |        |
| name   | string | Y        | 名称   |        |

```json
{
	"mid":92,
	"name":"test92"
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "id": 92,
        "pid": 0,
        "uid": "1",
        "username": "admin",
        "name": "test92",
        "orderid": 10,
        "type": 1
    }
}
```

#### 删除节点

| 路由地址         | 请求方式 |
| ---------------- | -------- |
| api/menu/delItem | POST     |

##### 请求报文

| 字段名 | 类型 | 是否必填 | 描述   | 示例值 |
| ------ | ---- | -------- | ------ | ------ |
| itemid | int  | Y        | 节点ID |        |

```json
{
	"itemid":9
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "删除成功",
    "data": {}
}
```

#### 移动节点

| 路由地址          | 请求方式 |
| ----------------- | -------- |
| api/menu/moveItem | POST     |

##### 请求报文

| 字段名     | 类型   | 是否必填 | 描述                                                         | 示例值 |
| ---------- | ------ | -------- | ------------------------------------------------------------ | ------ |
| mid        | int    | Y        | 父节点ID                                                     |        |
| itemid     | int    | Y        | 子节点id                                                     |        |
| drag_file  | string | Y        | true 拖拽的是父节点  false 拖拽的是子节点                    |        |
| is_catalog | int    | Y        | 1、把子节点变成父节点，是在父节点新增（这个功能只在移动端适用，在web端不行） |        |

```json
{
	"mid":93,
	"itemid":4,
	"drag_file":"false",
	"is_catalog":1
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "id": 93,
        "pid": 0,
        "uid": "1",
        "username": "admin",
        "name": "生活",
        "orderid": 4,
        "type": 1
    }
}
```

#### 修改子节点排序

| 路由地址                | 请求方式 |
| ----------------------- | -------- |
| api/menu/updateItemSort | POST     |

##### 请求报文

| 字段名 | 类型 | 是否必填 | 描述   | 示例值 |
| ------ | ---- | -------- | ------ | ------ |
| itemid | int  | Y        | 菜单ID |        |
| index  | int  | Y        | 排序   |        |

```json
[
		{
			"itemid":1,
			"index":4
		},
		{
			"itemid":5,
			"index":4	
		}
	]
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

#### 菜单排序

| 路由地址                | 请求方式 |
| ----------------------- | -------- |
| api/menu/updateMenuSort | POST     |

##### 请求报文

| 字段名 | 类型 | 是否必填 | 描述   | 示例值 |
| ------ | ---- | -------- | ------ | ------ |
| mid    | int  | Y        | 菜单ID |        |
| index  | int  | Y        | 排序   |        |

```json
[
		{
			"mid":4,
			"orderid":10
		},
		{
			"mid":5,
			"orderid":4	
		}
]
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

#### 新增父节点

| 路由地址         | 请求方式 |
| ---------------- | -------- |
| api/menu/addMenu | POST     |

##### 请求报文

| 字段名  | 类型   | 是否必填 | 描述                                   | 示例值 |
| ------- | ------ | -------- | -------------------------------------- | ------ |
| name    | string | Y        | 就是用户添加的内容                     | test   |
| orderid | int    | N        | 父节点目录 同级排序，值越小越靠前 顺序 | 0      |
| pid     | int    | N        | 父节点，父节点0为根节点                | 0      |

```json
{
	"name":"工作test",
	"orderid":99,
	"pid":92
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {
        "uid": 1,
        "username": "testname1",
        "orderid": 99,
        "name": "工作test",
        "pid": 92,
        "id": 749
    }
}
```

#### 删除父节点

| 路由地址         | 请求方式 |
| ---------------- | -------- |
| api/menu/delMenu | POST     |

##### 请求报文

| 字段名 | 类型 | 是否必填 | 描述     | 示例值 |
| ------ | ---- | -------- | -------- | ------ |
| mid    | int  | Y        | 父节点ID |        |

```json
{
	"mid":749
}
```

##### 响应报文

```json
{
    "code": 200,
    "msg": "ok",
    "data": {}
}
```

## 其他说明

### 如何区分游客和登录用户

1. 头部传递uuid，且uuid的值不为空时，系统认为是游客访问，uuid是游客身份的唯一标识;
2. 头部传递 Authorization时，则认为是登录用户访问；Authorization的值为Bearer + token，token为登录接口返回的token值；
3. 当uuid和Authorization都传值时,uuid优先级更高；
4. uuid为后端接口返回，前端存储在本地；当无uuid时才请求后端接口获取uuid。