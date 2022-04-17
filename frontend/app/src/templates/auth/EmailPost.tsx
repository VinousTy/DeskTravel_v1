import React from 'react';
import styles from './Auth.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  postEmail,
  selectIsEmail,
  selectIsNotEmail,
} from '../../features/auth/authSlice';

interface INPUTS {
  email: string;
}

const EmailPost: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isEmail = useSelector(selectIsEmail);
  const isNotEmail = useSelector(selectIsNotEmail);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    await dispatch(postEmail(data));
    reset();
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
              ご利用中のメールアドレスを入力してください。パスワード再設定のためのURLをお送り致します。
            </p>
          </div>
          <div className="mb-4">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">
              メールアドレス
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
            {isEmail && (
              <p className="text-green text-xs italic" data-testid="success">
                入力されたメールアドレス宛にメールを送信しました。
              </p>
            )}
            {isNotEmail && (
              <p className="text-red-500 text-xs italic" role="alert">
                入力されたメールアドレスは登録されていません。
              </p>
            )}
          </div>
          <hr className={styles.border}></hr>
          <div
            className={`${styles.btn} bg-black py-8 cursor-pointer rounded-b`}
          >
            <button type="submit" data-testid="button-submit">
              送信
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmailPost;
