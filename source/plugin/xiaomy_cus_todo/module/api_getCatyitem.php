<?php 

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

$mid = getParam('mid', false);
if ($mid === false) {
	$Todo->code = 503;
	$Todo->msg 	= 'system error';
}else{
	$menuData = $Todo->getMenu($mid);
	$menuData['item'] = $Todo->getItemAll(['mid'=>$mid]);
	$Todo->data = $menuData;
}