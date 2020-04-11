<?php


namespace App\Http\Controllers\Api\V1;


class TestController extends BaseController
{
    public function test()
    {
        return $this->success();
    }
}
