<?php


namespace App\Http\Requests\Api;


use App\Http\Requests\Request;

class MoveItemRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'mid'        => 'required',
            'itemid'     => 'required',
            'is_catalog' => 'required',
            'drag_file'  => 'required',
        ];
    }

    public function messages()
    {
        return [
            'mid.required'        => trans('menu.mid_required'),
            'itemid.required'     => trans('menu.itemid_required'),
            'is_catalog.required' => trans('menu.is_catalog_required'),
            'drag_file.required'  => trans('menu.drag_file_required'),
        ];
    }
}
