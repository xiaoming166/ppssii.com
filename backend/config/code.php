<?php

return [
    200 => 'request_success', // 服务端错误
    201 => 'create_success', // 创建成功
    204 => 'delete_success', // 删除成功
    400 => 'params_error', // 参数错误
    401 => 'not_login', // 未登录
    403 => 'request_forbidden', // 禁止访问
    404 => 'not_found', // 未找到
    500 => 'service_error', // 服务端错误

    /** 自定义 **/

    // 菜单
    40001 => 'item not exist',
    40002 => 'menu not exist',
    40003 => 'parent node not exist',
    40004 => 'child node not exist',
    40005 => 'move fail',
    40006 => 'email not bind',
    40007 => 'token required',
    40008 => 'error link'
];
