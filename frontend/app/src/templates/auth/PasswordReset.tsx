import React from 'react';
import styles from './Auth.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { AppDispatch } from '../../app/store';
import { useDispatch } from 'react-redux';
import { newPassword } from '../../features/auth/authSlice';
import Swal from 'sweetalert2';

interface INPUTS {
  password: string;
  confirm_password: string;
}

const PasswordReset: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const search = useLocation().search;
  const history = useHistory();

  const query = new URLSearchParams(search);
  const query_token = query.get('token');

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    const packetPassword = {
      password: data.password,
      token: query_token,
    };
    await dispatch(newPassword(packetPassword));
    reset();
    Swal.fire({
      icon: 'success',
      title: '変更完了',
      text: 'パスワードの変更が完了しました',
      color: '#fff',
      background: '#222',
    }).then(() => {
      history.push('/signin');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div
          className={`w-10/12 mt-10 mb-10 md:w-4/12 mx-auto pt-14 text-center text-white h-auto bg-thin-black rounded`}
        >
          <h2 className="mb-10 text-xl font-bold" data-testid="title">
            パスワード再設定
          </h2>
          <div className="w-9/12 mx-auto mb-8">
            <p>
              新しいパスワードを入力して「パスワード再設定」をクリックしてください。
            </p>
          </div>
          <div className="mb-6">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">
              新パスワード
            </div>
            <input
              className="shadow bg-black placeholder-gray-500 appearance-none rounded w-9/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="password"
              type="password"
              data-testid="input-password"
              placeholder="新しいパスワードを入力"
              {...register('password', {
                required: {
                  value: true,
                  message: '※パスワードの入力は必須です',
                },
                minLength: {
                  value: 8,
                  message: 'パスワードは8文字以上で入力してください',
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">
              パスワード再入力
            </div>
            <input
              className="md:shadow bg-black placeholder-gray-500 appearance-none rounded w-9/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="confirm_password"
              type="password"
              data-testid="input-password-confirm"
              placeholder="パスワード再入力"
              {...register('confirm_password', {
                required: {
                  value: true,
                  message: '※パスワードの入力は必須です',
                },
                minLength: {
                  value: 8,
                  message: 'パスワードは8文字以上で入力してください',
                },
                validate: {
                  match: (value) =>
                    value === getValues('password') ||
                    'パスワードが一致しません。もう一度入力してください。',
                },
              })}
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-xs italic" role="alert">
                {errors.confirm_password.message}
              </p>
            )}
          </div>
          <hr className={styles.border}></hr>
          <div
            className={`${styles.btn} bg-black py-8 cursor-pointer rounded-b`}
          >
            <button type="submit" data-testid="button-submit">
              パスワード再設定
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PasswordReset;
