<?php

if (!defined('IN_DISCUZ')) {
    exit('Access Denied');
}


list($uid, $auth) = C::t('#xiaomy_cus_todo#jnpar_add')->generate_new_visitor();
if ($uid === false) {
    $Todo->code = 503;
    $Todo->msg = 'system error';
} else {
    $Todo->data = [
        'uid' => $uid,
        'auth' => $auth
    ];
}