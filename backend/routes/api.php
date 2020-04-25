<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// 设置语言
App::setLocale(\Request::header('lang', 'zh'));

$api = app('Dingo\Api\Routing\Router');


$api->version('v1', ['namespace' => 'App\Http\Controllers\Api\V1'], function ($api) {

    Route::post('retrievePassSendMail', 'LoginController@retrievePassSendMail')->name('admin.retrievePassSendMail');

    Route::post('resetPwd', 'LoginController@resetPwd')->name('admin.resetPwd');

    $api->group(['prefix' => 'menu', 'middleware' => ['checkToken']], function ($api) {
        $api->post('list', 'MenuController@list'); // 显示网站内容
        $api->post('addItem', 'MenuController@addItem'); // 添加子节点
        $api->post('menuItem', 'MenuController@menuItem'); // 获取父接口下的所有节点
        $api->post('updateItem', 'MenuController@updateItem'); // 更新子节点类容
        $api->post('delItem', 'MenuController@deleteItem'); // 删除子节点
        $api->post('updateMenu', 'MenuController@updateMenu'); // 更新菜单内容
        $api->post('moveItem', 'MenuController@moveItem'); // 移动节点
        $api->post('updateItemSort', 'MenuController@updateItemSort'); // 修改排序
        $api->post('updateMenuSort', 'MenuController@updateMenuSort'); // 修改排序
        $api->post('addMenu', 'MenuController@addMenu'); // 添加父节点
        $api->post('delMenu', 'MenuController@delMenu'); // 删除父节点
    });

    $api->group(['prefix' => 'auth'], function ($api) {
        $api->post('login', 'AuthController@login'); // 登录
        $api->post('logout', 'AuthController@logout'); // 注销
        $api->post('register', 'AuthController@register'); // 注册
        $api->post('makeUuid', 'AuthController@makeUuid'); // 获取uuid
        $api->post('retrievePwd', 'AuthController@retrievePwd'); // 用户重置密码发送邮件
        $api->post('resetPwd', 'AuthController@resetPwd'); // 用户重置密码
        $api->post('me', 'AuthController@me'); // 用户重置密码
    });
});
