<?php


namespace App\Http\Requests\Api;


use App\Http\Requests\Request;

class RegisterRequest extends Request
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
            'username' => 'bail|required|string|max:255|unique:pre_xiaomy_cus_todo_user',
            'email'    => 'bail|string|email|max:255',
            'password' => 'bail|required|string|min:8|confirmed',
        ];
    }

    public function messages()
    {
        return [
            'username.required'  => trans('auth.username_required'),
            'username.string'    => trans('auth.username_string'),
            'username.max'       => trans('auth.username_max_255'),
            'username.unique'    => trans('auth.username_unique'),
            'email.string'       => trans('auth.email_string'),
            'email.email'        => trans('auth.email_email'),
            'email.max'          => trans('auth.email_max_255'),
            'password.required'  => trans('auth.password_required'),
            'password.string'    => trans('auth.password_string'),
            'password.min'       => trans('auth.password_min_8'),
            'password.confirmed' => trans('auth.password_confirmed'),
        ];
    }
}
