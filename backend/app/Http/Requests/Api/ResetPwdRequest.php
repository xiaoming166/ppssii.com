<?php


namespace App\Http\Requests\Api;


use App\Http\Requests\Request;

class ResetPwdRequest extends Request
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
            'email'    => 'bail|required|string|email|max:255',
            'password' => 'bail|required|string|min:8|confirmed',
            'token'    => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.string'       => trans('auth.email_string'),
            'email.email'        => trans('auth.email_email'),
            'email.max'          => trans('auth.email_max_255'),
            'password.required'  => trans('auth.password_required'),
            'password.string'    => trans('auth.password_string'),
            'password.min'       => trans('auth.password_min_8'),
            'password.confirmed' => trans('auth.password_confirmed'),
            'token.required'     => trans('auth.token_required')
        ];
    }
}
