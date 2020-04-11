<?php


namespace App\Services;

use App\Models\CusToDoItemModel;
use App\Models\CusToDoMenuModel;
use App\Models\UserModel;

class MenuService extends BaseService
{
    /**
     * 根据用户ID查找菜单
     * @param int $uid
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function getMenuByUid()
    {
        $uid = self::getUserId();
        if (empty($uid)) {
            return null;
        }

        $result = CusToDoMenuModel::where('uid', '=', $uid)->orderBy('orderid')->get();

        return $result;
    }

    /**
     * 添加子节点
     * @param array $data
     * @return CusToDoItemModel|\Illuminate\Database\Eloquent\Model
     */
    public function addItem(array $data)
    {
        $uid = self::getUserId();
        $mid = $data['mid'] ?? 0;

        // 获取用户信息
        $userInfo = $this->getUserById($uid);

        // 查询当前用户的指定菜单下的内容数量
        $count = $this->getItemCount($data);
        $count = $count + 1;

        // 获取当前菜单信息
        $menuInfo = $this->getMenuById($mid);

        $createData = [
            'pid'      => $menuInfo->pid ?? 0,
            'mid'      => $mid,
            'uid'      => $uid,
            'username' => $userInfo->username ?? '',
            'zindex'   => $count,
            'content'  => $data['content'] ?? '',
            'dateline' => time(),
        ];

        $result = CusToDoItemModel::create($createData);

        return $result;
    }


    /**
     * 查询内容数量
     * @param array $data
     * @return int
     */
    public function getItemCount(array $data)
    {
        $result = CusToDoItemModel::query();

        if (!empty($data['mid'])) {
            $result->where('mid', '=', $data['mid']);
        }

        if (!empty($data['uid'])) {
            $result->where('uid', '=', $data['uid']);
        }

        $count = $result->count();

        return $count;
    }

    /**
     * 根据ID获取菜单
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object|null
     */
    public function getMenuById(int $id)
    {
        if (empty($id)) {
            return null;
        }

        $result = CusToDoMenuModel::where('id', '=', $id)->first();

        return $result;
    }

    /**
     * 根据用户ID获取用户信息
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object|null
     */
    public function getUserById($userId)
    {
        if (empty($userId)) {
            return null;
        }

        $userModel = UserModel::query()->where('id', '=', $userId)->first();

        return $userModel;
    }

    /**
     * 获取菜单节点内容
     * @param array $cond
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object|null
     */
    public function getMenuItemByCond(array $cond)
    {
        if (empty($cond)) {
            return null;
        }

        $result = CusToDoMenuModel::with('items');

        if ($cond['mid']) {
            $result->where('id', '=', $cond['mid']);
        }

        $result = $result->first();

        return $result;
    }

    /**
     * 更新子节点内容
     * @param array $updateData
     * @param array $where
     * @return int
     * @throws
     */
    public function updateItem(array $updateData, array $where)
    {
        $itemModel = CusToDoItemModel::where($where)->first();

        if (empty($itemModel)) {
            throw new \Exception('', 40001);
        }

        $itemModel->content = $updateData['content'];

        $itemModel->save();

        return $itemModel;
    }

    /**
     * 删除
     * @param int $id
     * @return int
     * @throws
     */
    public function deleteItem(int $id)
    {
        $itemModel = CusToDoItemModel::find($id);

        if (empty($itemModel)) {
            throw new \Exception('', 40001);
        }

        return CusToDoItemModel::destroy($id);
    }

    /**
     * 更新菜单名称
     * @param array $updateData
     * @param array $where
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model|object|null
     * @throws
     */
    public function updateMenu(array $updateData, array $where)
    {
        $menuModel = CusToDoMenuModel::where($where)->first();

        if (empty($menuModel)) {
            throw new \Exception('', 40002);
        }

        $menuModel->name = $updateData['name'];

        $menuModel->save();

        return $menuModel;
    }


    public function moveItem(array $data)
    {
        // 查询父节点
        $menuModel = CusToDoMenuModel::find($data['mid']);
        if (empty($menuModel)) {
            throw new \Exception('', 40003);
        }

        // true拖拽的是父节点  false拖拽的是子节点
        if ($data['drag_file'] == 'true') {
            $itemData = CusToDoMenuModel::find($data['itemid']);
            if (empty($itemData)) {
                throw new \Exception('', 40004);
            }
            $content = $itemData->name;
        } else {
            $itemData = CusToDoItemModel::find($data['itemid']);
            if (empty($itemData)) {
                throw new \Exception('', 40004);
            }
            $content = $itemData->content;
        }

        // 	1、把子节点变成父节点，是在父节点新增（这个功能只在移动端适用，在web端不行）
        //  2、把子节点拖拽到其他父节点下
        //  3、把父节点拖拽到父节点下
        \DB::beginTransaction();
        try {
            switch ($data['is_catalog']) {
                case '1':
                    $this->_moveItemToMenu($data, $content);
                    break;
                case '2':
                    $this->_moveItemToOtherMenu($data);
                    break;
                case '3':
                    $this->_moveMenu($data);
                    break;
                default:
                    break;
            }
            \DB::commit();
        } catch (\Exception $e) {
            \DB::rollBack();
            throw new \Exception('', 40005);
        }

        $menuModel = CusToDoMenuModel::find($data['mid']);

        return $menuModel;
    }

    /**
     * 1、把子节点变成父节点，是在父节点新增（这个功能只在移动端适用，在web端不行）
     * @param $data
     * @param $content
     * @return bool
     */
    private function _moveItemToMenu($data, $content)
    {
        // 新增菜单数据
        $createMenuData = [
            'uid'      => $this->getUserId(),
            'username' => $this->getUsername(),
            'orderid'  => 0,
            'name'     => $content,
            'pid'      => $data['mid']
        ];
        CusToDoMenuModel::create($createMenuData);

        // 删除原子节点内容
        CusToDoItemModel::destroy($data['itemid']);

        return true;

    }

    /**
     * 2、把子节点拖拽到其他父节点下
     * @param $data
     * @return bool
     */
    private function _moveItemToOtherMenu($data)
    {
        $where = [
            'id' => $data['itemid']
        ];

        $updateData = [
            'mid' => $data['mid']
        ];

        CusToDoItemModel::where($where)->update($updateData);

        return true;
    }

    /**
     *  3、把父节点拖拽到父节点下
     * @param $data
     * @return bool
     */
    private function _moveMenu($data)
    {
        $where = [
            'id' => $data['itemid']
        ];

        $updateData = [
            'pid' => $data['mid']
        ];

        CusToDoMenuModel::where($where)->update($updateData);

        return true;
    }

    /**
     * 修改节点排序
     * @param array $data
     * @return bool
     * @throws
     */
    public function updateItemSort(array $data)
    {
        if (empty($data)) {
            throw new \Exception('', 400);
        }

        foreach ($data as $key => $val) {
            $tmpItemId = $val['itemid'] ?? 0;
            $tmpIndex  = $val['index'] ?? 0;
            if (empty($tmpItemId)) {
                continue;
            }
            CusToDoItemModel::where('id', '=', $tmpItemId)->update(['zindex' => $tmpIndex]);
        }

        return true;
    }

    /**
     * 修改节点排序
     * @param array $data
     * @return bool
     * @throws
     */
    public function updateMenuSort(array $data)
    {
        if (empty($data)) {
            throw new \Exception('', 400);
        }

        foreach ($data as $key => $val) {
            $tmpMid     = $val['mid'] ?? 0;
            $tmpOrderId = $val['orderid'] ?? 0;
            if (empty($tmpMid)) {
                continue;
            }
            CusToDoMenuModel::where('id', '=', $tmpMid)->update(['orderid' => $tmpOrderId]);
        }

        return true;
    }

    /**
     * 添加父节点
     * @param $data
     * @return CusToDoMenuModel|\Illuminate\Database\Eloquent\Model
     */
    public function addMenu($data)
    {
        // 新增菜单数据
        $createMenuData = [
            'uid'      => $this->getUserId(),
            'username' => $this->getUsername(),
            'orderid'  => $data['orderid'] ?? 0,
            'name'     => $data['name'] ?? '',
            'pid'      => $data['pid'] ?? 0
        ];
        return CusToDoMenuModel::create($createMenuData);
    }

    /**
     * 删除父节点
     * @param int $id
     * @return int
     * @throws
     */
    public function deleteMenu(int $id)
    {
        $menuModel = CusToDoMenuModel::find($id);

        if (empty($menuModel)) {
            throw new \Exception('', 40002);
        }

        return CusToDoMenuModel::destroy($id);
    }

    public function getUsername()
    {
        // 已登录用户优先获取登录名
        $userInfo = self::getUserInfo();
        if (!empty($userInfo->username)) {
            return $userInfo->username;
        }

        return '';
    }

    /**
     * 获取当前登录用户信息
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public static function getUserInfo()
    {
        return auth('api')->user();
    }

    public static function getUserId()
    {
        $uuid = request()->header('uuid', '');

        // 已登录用户优先获取登录id
        $userInfo = self::getUserInfo();
        if (!empty($userInfo->id)) {
            return $userInfo->id;
        }

        // 反之获取客户端传递的uuid
        return $uuid;
    }

}
