<?php


namespace App\Models;


class CusToDoMenuModel extends BaseModel
{

    /**
     * 与模型关联的表名
     *
     * @var string
     */
    protected $table = 'pre_xiaomy_cus_todo_menu';

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
    protected $fillable = ['pid','uid','username','name','orderid'];


    /**
     * 关联菜单下的内容
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items()
    {
        return $this->hasMany(CusToDoItemModel::class, 'mid', 'id');
    }


}
