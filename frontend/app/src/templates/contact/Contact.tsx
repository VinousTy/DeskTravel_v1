import React, { useState } from 'react';
import styles from './Contact.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { init, send } from 'emailjs-com';

interface INPUTS {
  name: string;
  email: string;
  message: string;
}

const userID = process.env.REACT_APP_USER_ID;
const serviceID = process.env.REACT_APP_SERVICE_ID;
const templateID = process.env.REACT_APP_TEMPLATE_ID;

const Contact: React.FC = () => {
  const [postMail, setPostMail] = useState(false);
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const sendMail = () => {
    if (
      userID !== undefined &&
      serviceID !== undefined &&
      templateID !== undefined
    ) {
      init(userID);

      const template_param = {
        from_name: name,
        from_email: mail,
        message: message,
      };
      send(serviceID, templateID, template_param).then(() => {
        setPostMail(true);
      });
    }
  };

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    await sendMail();
    await reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        <div
          className={`w-10/12 mt-10 mb-10 md:w-4/12 mx-auto pt-14 text-center text-white h-auto bg-thin-black rounded`}
        >
          <h2 className="mb-10 text-xl font-bold" data-testid="title">
            お問い合わせ
          </h2>
          <div className="mb-4">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">お名前</div>
            <input
              className="md:shadow bg-black placeholder-gray-500 appearance-none rounded w-9/12 py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="name"
              data-testid="input-name"
              type="text"
              placeholder="例) 山田 太郎"
              {...register('name', {
                required: {
                  value: true,
                  message: '※お名前の入力は必須です',
                },
              })}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                {errors.name.message}
              </p>
            )}
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
              onChange={(e) => setMail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <div className="text-left ml-9 md:ml-14 mb-1 pl-1">
              お問い合わせ内容
            </div>
            <textarea
              className="form-control md:shadow bg-black placeholder-fray-500 appearance-none rounded w-9/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
              id="message"
              data-testid="input-message"
              rows={6}
              placeholder="ご不明点やご要望などを記載してください。"
              {...register('message', {
                required: {
                  value: true,
                  message: '※お問い合わせ内容の入力は必須です。',
                },
              })}
              onChange={(e) => setMessage(e.target.value)}
            />
            {errors.message && (
              <p className="text-red-500 text-xs italic" role="alert">
                {errors.message.message}
              </p>
            )}
            {postMail && (
              <p className="text-green text-xs italic" role="alert">
                問合せ窓口ににメールを送信しました。
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

export default Contact;
