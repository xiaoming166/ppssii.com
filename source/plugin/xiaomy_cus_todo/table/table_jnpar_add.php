<?php
/*
 *	[jnpar] (C)2018-2023 jnpar技能趴荣耀出品.
 *	这不是一个免费的程序！由QQ：94526868提供技术支持，如需定制或者个性化修改插件，欢迎与我们联系。
 *  技术交流站www.jnpar.com 辅助推广，敬请访问惠临。
 *	$_G['basescript'] = 模块名称
 *	CURMODULE = 为模块自定义常量
 */
 
if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class table_jnpar_add extends discuz_table
{
	public function __construct() {
		$this->_table = 'jnpar_add';
		$this->_pk    = '';
		parent::__construct();
	} 
	
	public function getuid(){
		global $_G;
		if($_G['plugin_visitor_uid'] > 0) {
		    return $_G['plugin_visitor_uid'];
        }elseif ($_G['uid'] > 0) {
            $uid = $_G['uid'];
        } else {
//            $uid = getcookie('visitor_uid');
//            $auth = getcookie('visitor_auth');
            $uid = getgpc('uid');
            $auth = getgpc('auth');
            if (!empty($uid) && !empty($auth)) {
                $salt = substr($auth, -8);
                $hash = substr($auth, 0, -8);
                if (md5($uid . $_G['config']['security']['authkey'] . $salt) !== $hash) {
                    exit('access denied');
                }
            }
            if (empty($uid) || empty($hash)) {
//                list($uid, $auth) = $this->generate_new_visitor();
//                dsetcookie('visitor_uid', $uid);
//                dsetcookie('visitor_auth', $auth);
                //do not generate temporary user here
                //client should request new user via API
                global $Todo;
                $Todo->code = 401;
                $Todo->msg = 'access denied';
                $Todo->return1();
            }
            $_G['plugin_visitor_uid'] = $uid;
            $_G['plugin_visitor_auth'] = $auth;
        }
		$_GET['uid']=$uid;
		//debug($uid);
		return $uid;
	}

	public function generate_new_visitor() {
	    global $_G;
	    $todo = new Todo();
        $mid = DB::query(sprintf('INSERT INTO %s SET uid=min(uid)-1, name=%s',
            DB::table('xiaomy_cus_todo_menu'),
            "'root'")
        );
        $m = $todo->getMenu($mid);
        $uid = $m['uid'];
        $salt = random(8);
        $hash = md5($uid . $_G['config']['security']['authkey'] . $salt);
        return [$uid, $hash.$salt];
    }
	
}