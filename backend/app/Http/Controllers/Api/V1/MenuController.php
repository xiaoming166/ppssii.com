<?php


namespace App\Http\Controllers\Api\V1;

use App\Http\Requests\Api\CreateItemRequest;
use App\Http\Requests\Api\CreateMenuRequest;
use App\Http\Requests\Api\DelItemRequest;
use App\Http\Requests\Api\DelMenuRequest;
use App\Http\Requests\Api\MenuByUidRequest;
use App\Http\Requests\Api\MenuItemRequest;
use App\Http\Requests\Api\MoveItemRequest;
use App\Http\Requests\Api\UpdateItemRequest;
use App\Http\Requests\Api\UpdateMenuRequest;
use App\Services\MenuService;
use Illuminate\Http\Request;

class MenuController extends BaseController
{
    /**
     * @var MenuService $menuService
     */
    public $menuService;

    public function __construct(MenuService $menuService)
    {
        $this->menuService = $menuService;
    }

    /**
     * 显示网站内容
     * @param MenuByUidRequest $request
     * @return mixed
     */
    public function list(MenuByUidRequest $request)
    {
        try {
            $result = $this->menuService->getMenuByUid();
            return $this->success($result);
        } catch (\Exception $e) {
            return $this->error();
        }
    }

    /**
     * 添加子节点
     * @param CreateItemRequest $request
     * @return mixed
     */
    public function addItem(CreateItemRequest $request)
    {
        try {
            $requestData = $request->all();

            $result = $this->menuService->addItem($requestData);

            return $this->success($result);
        } catch (\Exception $e) {
            return $this->error();
        }
    }

    /**
     * 根据菜单ID获取节点内容
     * @param MenuItemRequest $request
     * @return mixed
     */
    public function menuItem(MenuItemRequest $request)
    {
        try {
            $requestData = $request->all();

            $result = $this->menuService->getMenuItemByCond($requestData);

            return $this->success($result);
        } catch (\Exception $e) {
            return $this->error();
        }
    }

    /**
     * 编辑子节点
     * @param UpdateItemRequest $request
     * @return mixed
     */
    public function updateItem(UpdateItemRequest $request)
    {
        try {
            $requestData = $request->all();

            $where = [
                'id' => $requestData['itemid']
            ];

            $updateData = [
                'content' => $requestData['content']
            ];

            $result = $this->menuService->updateItem($updateData, $where);

            return $this->success($result);
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }

    /**
     * 删除子节点
     * @param DelItemRequest $request
     * @return mixed
     */
    public function deleteItem(DelItemRequest $request)
    {
        try {
            $requestData = $request->all();

            $id = $requestData['itemid'];

            $this->menuService->deleteItem($id);

            return $this->success([], trans('common.del_success'));
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }


    /**
     * 更新菜单名称
     * @param UpdateMenuRequest $request
     * @return mixed
     */
    public function updateMenu(UpdateMenuRequest $request)
    {
        try {
            $requestData = $request->all();

            $where = [
                'id' => $requestData['mid']
            ];

            $updateData = [
                'name' => $requestData['name']
            ];

            $result = $this->menuService->updateMenu($updateData, $where);

            return $this->success($result);
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }

    /**
     * 移动节点
     * @param MoveItemRequest $request
     * @return mixed
     */
    public function moveItem(MoveItemRequest $request)
    {
        try {
            $requestData = $request->all();
            $result      = $this->menuService->moveItem($requestData);
            return $this->success($result);
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }

    /**
     * 设置节点排序
     * @param Request $request
     * @return mixed
     */
    public function updateItemSort(Request $request)
    {
        try {
            $requestData = $request->all();
            $this->menuService->updateItemSort($requestData);
            return $this->success();
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }

    /**
     * 修改菜单排序
     * @param Request $request
     * @return mixed
     */
    public function updateMenuSort(Request $request)
    {
        try {
            $requestData = $request->all();
            $this->menuService->updateMenuSort($requestData);
            return $this->success();
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }

    /**
     * 添加菜单
     * @param CreateMenuRequest $request
     * @return mixed
     */
    public function addMenu(CreateMenuRequest $request)
    {
        try {
            $requestData = $request->all();
            $res         = $this->menuService->addMenu($requestData);
            return $this->success($res);
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }

    /**
     * 删除菜单
     * @param DelMenuRequest $request
     * @return mixed
     */
    public function delMenu(DelMenuRequest $request)
    {
        try {
            $requestData = $request->all();
            $mid         = $requestData['mid'];
            $this->menuService->deleteMenu($mid);
            return $this->success();
        } catch (\Exception $e) {
            return $this->error($e->getCode());
        }
    }


}
