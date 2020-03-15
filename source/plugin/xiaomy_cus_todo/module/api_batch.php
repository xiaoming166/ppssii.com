<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2020/3/11
 * Time: 14:54
 *
 * 批量递归处理树形目录
 * 参数说明
 *
 *'Mid'=>[
 *    ['operation'=>'用户操作目录可选参数 (update,insert,delete)'],
 *    ['operation'=>'用户操作目录可选参数 (update,insert,delete)']
 *    .... 注意：update、 delete、 必传参数mid
 *
 *
 * ]
 *'Item'=>[
 *   ['operation'=>'用户操作文件可选参数 (update,insert,delete)'],
 *   ['operation'=>'用户操作文件可选参数 (update,insert,delete)'],
 *   ...   注意：update、 delete、必传参数Item_id
 *
 * ]
 *
 * datas=[
 *      1=>[
 *         'Mid'=>[
 *                  [
 *                      'operation'=>update,
 *                      'orderid'=>3,
 *                      'name'=>AA,
 *                      'mid'=>10
 *                      'Mid'=>[[递归Mid....[['Mid'=>递归Mid....]]..]],
 *                      'Item'=>[[....]]
 *                 ],
 *                 [
 *                      'operation'=>insert,
 *                      'name'=>BB',
 *                      'Mid'=>[[递归Mid....[['Mid'=>递归Mid....]]..]],
 *                      'Item'=>[[....]]
 *                 ],
 *                 [
 *                      'operation'=>delete,
 *                      'mid'=>10
 *                 ]
 *              ],
 *         'Item'=>[
 *                   [
 *                      'operation'=>update,
 *                      'zindex'=>3,
 *                      'content'=>item_AA,
 *                      'Item_id'=>1,
 *                 ],
 *                 [
 *                      'operation'=>insert,
 *                      'content'=>item_CC,
 *                 ],
 *                 [
 *                      'operation'=>delete,
 *                      'Item_id'=>10,
 *                 ],
 *             ],
 *        ],
 *      2=>['Mid'=>[[如上]...],'Item'=>[如上....]],
 *      3=>['Mid'=>[[如上]...],'Item'=>[如上....]],
 *      'Mid'=>[['Mid'=>[[如上..]...],'Item'=>[如上....]]],
 *      'Item'=>[[如上...]]
 *
 * ]
 *
 *
 *
 *
 */
if(!defined('IN_DISCUZ')) {
    exit('Access Denied');
}

$param = getParam('datas');
$param = json_decode($param,true);

if(empty($param)){
    $Todo->code = 503;
    $Todo->msg 	= '数据不能为空';
}else{
    $uid = C::t('#xiaomy_cus_todo#jnpar_add')->getuid();

    //处理子路径
    foreach ($param as $key=>$val){
        $mid = $key;
        if($val['Mid']){
            operation_mid($val['Mid'],$uid,$mid);
        }
        if($val['Item']){
            operation_item($val['Item'],$uid,$mid);
        }
    }

    //处理根路径 目录
    if($param['Mid']){
        operation_mid($param['Mid'],$uid,0);
        foreach ($param['Item'] as $key=>$val){
            if($val['Item']){
                operation_item($val['Item'],$uid,0);
            }
        }
    }

    //处理根路径  文件
    if($param['Item']){
        foreach ($param['Item'] as $key=>$val){
            operation_item($val,$uid,0);
        }
    }
    $Todo->data = $Todo->getMenuAll(['uid'=>$uid]);
}

/**
 *  操作数据库目录
 *@param  $data array  要执行的数据
 *@param  $uid  int    用户uid
 *@param  $mid int     目录mid
 *
 */
function operation_mid($data,$uid,$mid){
    global $Todo;
    if($data){
        foreach ($data as $key=>$val){
            switch ($val['operation']){
                case 'insert':
                    $mid  =  $Todo->addMenu($uid,$val['name'],0,$mid);
                    break;
                case 'delete':
                    $Todo->deleteMenu($val['mid']);
                    break;
                case 'update':
                    $update['name']= $val['name'];
                    if($val['orderid']){
                        $update['orderid']=$val['orderid'];
                    }
                    $where['uid'] =  $uid;
                    $where['id']  =  $val['mid'];
                    $Todo->setMenu($update,$where);
                    break;
            }

            //开始递归处理子目录
            if($val['Mid']){
                foreach ($val['Mid'] as $k=>$v){
                    operation_mid($val['Mid'],$uid,$mid);
                }

            }

            //开始处理子文件
            if($val['Item']){
                foreach ($val['Item'] as $k=>$v){
                    operation_item($v,$uid,$mid);
                }
            }
        }
    }
}


/**
 *操作数据库文件
 *@param  $data array   要执行的数据
 *@param  $uid  int     用户uid
 *@@param  $mid int     目录mid
 */
function operation_item($data,$uid,$mid = 0){
    global $Todo;
    if($data){
        switch ($data['operation']){
            case 'insert':
                $Todo->addItem($mid,$uid,$data['content'],0);
                break;
            case 'delete':
                $Todo->deleteItem($data['Item_id']);
                break;
            case 'update':
                if($data['zindex']){
                    $update['zindex']=$data['zindex'];
                }
                if($update['content']){
                    $update['content']=$data['content'];
                }
                $where['uid'] =  $uid;
                $where['id'] =  $data['Item_id'];
                $Todo->setItem($update, $where);
                break;
        }
    }
}


























