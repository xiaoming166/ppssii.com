export class Api {

    /** 权限接口  **/
    static register = 'auth/register'; // 注册接口
    static login = 'auth/login'; // 登陆接口
    static me = 'auth/me'; // 获取用户信息
    static logout = 'auth/logout'; //退出
    static makeUuid = 'auth/makeUuid'; //获取UUID
    static retrievePwd = 'auth/retrievePwd'; // 邮件找回密码
    static resetPwd = 'auth/resetPwd'; // 重置

    /** 业务接口  **/
    static menuList = 'menu/list'; // 显示网站内容
    static addItem = 'menu/addItem'; // 添加子节点
    static menuItem = 'menu/menuItem'; // 获取父节点下的所有节点
    static updateItem = 'menu/menuItem'; //更新子节点
    static updateMenu = 'menu/updateMenu'; // 更新菜单内容
    static delItem = 'menu/delItem'; // 删除节点
    static moveItem = 'menu/moveItem'; // 移动节点
    static updateItemSort = 'menu/updateItemSort'; //修改子节点排序
    static updateMenuSort = 'menu/updateMenuSort'; //修改子节点排序
    static addMenu = 'menu/addMenu'; // 新增父节点
    static delMenu = 'menu/delMenu'; // 删除父节点
}

