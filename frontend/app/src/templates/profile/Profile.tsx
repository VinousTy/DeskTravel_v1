import React, { useEffect, useState } from 'react';
import styles from './Profile.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Avatar, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
  updateProfile,
  selectProfile,
  editName,
  editUserName,
  editSelfIntroduction,
  isSignIn,
  selectCategory,
  getCategory,
  getMyProfile,
} from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useHistory } from 'react-router-dom';
import useMedia from 'use-media';

interface INPUTS {
  name: string;
  userName: string;
  category: number;
  self_introduction: string;
}

const Profile: React.FC = () => {
  const [avatarImage, setAvatarImage] = useState<any>(null),
    [image, setImage] = useState<File | null>(null),
    [userCategory, setUserCategory] = useState<number | undefined>(undefined);
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const categories = useSelector(selectCategory);
  const history = useHistory();
  const isWide = useMedia({ maxWidth: '768px' });

  const categoryOnProfile = categories.filter((category) => {
    if (category.id === 0) {
      return;
    } else {
      return category.id === profile.category;
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INPUTS>();

  const handlerEditPicture = (e: any) => {
    setImage(e.target.files![0]);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setAvatarImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clickPicture = (e: any) => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  };

  const updateProf = async () => {
    const packet = {
      id: profile.id,
      name: profile.name,
      user_name: profile.user_name,
      self_introduction: profile.self_introduction,
      category: Number(userCategory),
      img: image,
    };
    await dispatch(isSignIn());
    await dispatch(updateProfile(packet));
    await history.push('/home');
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (isWide) {
        await dispatch(isSignIn());
      }
      await dispatch(getMyProfile());
      await dispatch(getCategory());

      setAvatarImage(profile?.img);
      setUserCategory(categoryOnProfile[0]?.id);
    };
    fetchBootLoader();
  }, [dispatch]);

  const onSubmit: SubmitHandler<INPUTS> = async (data) => {
    updateProf();
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`${styles.container} w-10/12 mt-10 mb-10 md:w-4/12 mx-auto pt-14 text-center text-white h-auto bg-thin-black rounded`}
      >
        <h2 className="mb-10 text-xl font-bold">プロフィールを設定</h2>
        <input
          type="file"
          id="imageInput"
          hidden={true}
          onChange={handlerEditPicture}
        />
        <br />
        {avatarImage ? (
          <Avatar
            src={avatarImage}
            style={{
              width: 110,
              height: 110,
            }}
            className="text-center mx-auto"
          />
        ) : (
          <AccountCircleIcon
            style={{ fontSize: 120 }}
            className={avatarImage ? styles.addIcon : styles.normal}
          />
        )}
        <br />
        <IconButton onClick={clickPicture}>
          <span className="text-base text-blue-600 mb-4">
            プロフィール写真を変更
          </span>
        </IconButton>
        <div className="mb-4">
          <div className="text-left ml-7 md:ml-14 mb-1 pl-1">
            <label data-testid="label-name">名前</label>
          </div>
          <input
            className="md:shadow bg-black placeholder-fray-500 appearance-none rounded w-10/12 py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
            type="text"
            data-testid="input-name"
            value={profile?.name}
            placeholder="名前を入力"
            {...register('name', {
              required: {
                value: true,
                message: '※名前の入力は必須です',
              },
            })}
            onChange={(e) => dispatch(editName(e.target.value))}
          />
          {errors.name && (
            <p className="text-red-500 text-xs italic" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <div className="text-left ml-7 md:ml-14 mb-1 pl-1">
            <label data-testid="label-username">ユーザーネーム</label>
          </div>
          <input
            className="shadow bg-black placeholder-fray-500 appearance-none rounded w-10/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
            id="userName"
            data-testid="input-username"
            type="userName"
            value={profile?.user_name}
            placeholder="半角英数・記号のみで入力"
            {...register('userName', {
              required: {
                value: true,
                message: '※ユーザーネームの入力は必須です',
              },
              pattern: {
                value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
                message:
                  'ユーザーネームには半角英数・記号のみを使用してください',
              },
            })}
            onChange={(e) => dispatch(editUserName(e.target.value))}
          />
          {errors.userName && (
            <p className="text-red-500 text-xs italic" role="alert">
              {errors.userName.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <div className="text-left ml-7 md:ml-14 mb-1 pl-1">
            <label data-testid="label-category">カテゴリ</label>
          </div>
          <select
            className="bg-black w-10/12 py-2 px-3 text-gray-700 rounded"
            id="category"
            data-testid="select-category"
            value={userCategory}
            {...register('category', {
              required: {
                value: true,
                message: '※カテゴリの選択は必須です',
              },
            })}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setUserCategory(Number(e.target.value))
            }
          >
            <option value="">カテゴリを選択してください</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-3 italic" role="alert">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="mb-6">
          <div className="text-left ml-7 md:ml-14 mb-1 pl-1">
            <label data-testid="label-self-introduction">自己紹介</label>
          </div>
          <textarea
            className="form-control md:shadow bg-black placeholder-fray-500 appearance-none rounded w-10/12 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
            rows={6}
            id="self_introduction"
            data-testid="input-self-introduction"
            value={profile?.self_introduction}
            placeholder="自己紹介文は150文字以内で入力"
            {...register('self_introduction', {
              maxLength: {
                value: 150,
                message: '自己紹介文は150文字以内で入力してください',
              },
            })}
            onChange={(e) => dispatch(editSelfIntroduction(e.target.value))}
          />
          {errors.self_introduction && (
            <p className="text-red-500 text-xs italic">
              {errors.self_introduction.message}
            </p>
          )}
        </div>
        <hr className={styles.border}></hr>
        <div className={`${styles.btn} bg-black py-8 cursor-pointer rounded-b`}>
          <button type="submit" data-testid="button-regist">
            プロフィールを登録する
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
