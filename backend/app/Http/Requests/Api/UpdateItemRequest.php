<?php


namespace App\Http\Requests\Api;


use App\Http\Requests\Request;

class UpdateItemRequest extends Request
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
            'itemid'  => 'required',
            'content' => 'bail|string',
        ];
    }

    public function messages()
    {
        return [
            'itemid.required' => trans('menu.itemid_required'),
            'content.string'  => trans('menu.content_string'),
        ];
    }
}
