import React from 'react';
import styles from './Auth.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { loginEmail, isSignIn } from '../../features/auth/authSlice';
import { BsGoogle } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import Swal from 'sweetalert2';

interface INPUTS {
  email: string;
  password: string;
  confirm_password: string;
}

const SignIn: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    const result = await dispatch(loginEmail(data));
    if (loginEmail.fulfilled.match(result)) {
      await dispatch(isSignIn());
      await history.push('/home');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'ログイン失敗',
        text: 'ユーザー名またはパスワードが間違っています',
        color: '#fff',
        background: '#222',
      });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div
          className={`w-10/12 mt-10 mb-10 md:w-4/12 mx-auto pt-14 text-center text-white h-auto bg-thin-black rounded`}
        >
          <h2 className="mb-10 text-xl font-bold">ログイン</h2>
          <div className="mb-4">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">
              <label data-testid="label-email">メールアドレス</label>
            </div>
            <input
              className="md:shadow bg-black placeholder-gray-500 appearance-none rounded w-9/12 py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="email"
              data-testid="input-email"
              type="text"
              placeholder="例) info@example.com"
              {...register('email', {
                required: {
                  value: true,
                  message: '※メールアドレスの入力は必須です',
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'メールアドレスの形式が不正です',
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">
              <label data-testid="label-password">パスワード</label>
            </div>
            <input
              className="shadow bg-black placeholder-gray-500 appearance-none rounded w-9/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="password"
              data-testid="input-password"
              type="password"
              placeholder="8文字以上で入力してください"
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
              <p className="text-red-500 text-xs italic" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={styles.separation}>または</div>
          <div className="mt-6 mb-6">
            <button
              type="button"
              className="w-10/12 md:w-9/12 py-2 px-3 bg-secondary hover:bg-red-800 transition-all mt-5 mb-5 text-white font-bold py-2 px-4 rounded"
            >
              <span className="flex justify-between md:justify-center">
                <BsGoogle className="mt-1 font md:mr-4" />
                <span className="md:t">Googleアカウントでログイン</span>
              </span>
            </button>
          </div>
          <div
            className="mb-6"
            onClick={() =>
              alert(
                '現在ツイッター認証は行えません。別のログイン方法をお試しください。'
              )
            }
          >
            <button
              type="button"
              className="w-10/12 md:w-9/12 py-2 px-3 bg-blue-500 hover:bg-blue-700 transition-all mb-5 text-white font-bold py-2 px-4 rounded"
            >
              <span className="flex justify-between md:justify-center">
                <BsTwitter className="mt-1 font md:mr-4" />
                <span>Twitterアカウントでログイン</span>
              </span>
            </button>
          </div>
          <div className="mb-6 cursor-pointer hover:text-red-500 transition-all">
            <p onClick={() => history.push('/reset')}>
              パスワードを忘れた方はこちら
            </p>
          </div>
          <hr className={styles.border}></hr>
          <div
            className={`${styles.btn} bg-black py-8 cursor-pointer rounded-b`}
          >
            <button type="submit" data-testid="button-signin">
              ログイン
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
