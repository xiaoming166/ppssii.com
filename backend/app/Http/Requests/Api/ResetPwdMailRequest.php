<?php


namespace App\Http\Requests\Api;


use App\Http\Requests\Request;

class ResetPwdMailRequest extends Request
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
            'email' => 'bail|required|string|email|max:255',
        ];
    }

    public function messages()
    {
        return [
            'email.required' => trans('auth.email_required'),
            'email.string' => trans('auth.email_string'),
            'email.email'  => trans('auth.email_email'),
            'email.max'    => trans('auth.email_max_255'),
        ];
    }
}
