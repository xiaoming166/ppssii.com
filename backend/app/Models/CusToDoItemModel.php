<?php


namespace App\Models;


class CusToDoItemModel extends BaseModel
{

    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'pre_xiaomy_cus_todo_item';

    /**
     * 指示是否自动维护时间戳
     *
     * @var bool
     */
    public $timestamps = false;


    /**
     * 可以被批量赋值的属性。
     *
     * @var array
     */
    protected $fillable = ['pid', 'mid', 'uid', 'username', 'zindex', 'content', 'dateline'];





}
