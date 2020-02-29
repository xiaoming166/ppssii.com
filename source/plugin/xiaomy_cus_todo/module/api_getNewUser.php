<?php

if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}


$uid=C::t('#xiaomy_cus_todo#jnpar_add')->getuid();
if ($uid === false) {
    $Todo->code = 503;
    $Todo->msg 	= 'system error';
}else{
    $Todo->data = [
        'uid' => $uid,
        'auth' => $_G['plugin_visitor_auth']
    ];
}