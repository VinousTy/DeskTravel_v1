import React, { useEffect } from 'react';
import useMedia from 'use-media';
import styles from './ProfileList.module.scss';
import { Avatar } from '@material-ui/core';
import { FaTools } from 'react-icons/fa';
import { PROPS_PROFILELIST } from '../../types/Types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  getCategory,
  selectCategory,
  selectProfile,
} from '../../features/auth/authSlice';
import { useHistory } from 'react-router-dom';

const ProfileList: React.FC<PROPS_PROFILELIST> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const categories = useSelector(selectCategory);
  const isWide = useMedia({ maxWidth: '768px' });
  const history = useHistory();

  const userCategory = categories.filter((category) => {
    return category.id === profile.category;
  });

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <>
      <div className="flex relative md:pl-20">
        <Avatar
          src={props.img}
          style={
            isWide ? { width: 70, height: 70 } : { width: 100, height: 100 }
          }
          className="ml-10 mt-0 pt-0 mt-5"
        />
        <div className="md:w-4/10">
          <div className="flex">
            <div className="font-bold text-lg mt-8 ml-6 md:ml-10 md:mt-2">
              {props.name}
            </div>
            {isWide ? (
              <></>
            ) : (
              <>
                {profile.self_introduction ==
                'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。' ? (
                  <div
                    className={`${styles.btn} md:flex shadow bg-black ml-4 px-8 py-3 appearance-none rounded text-gray-600 leading-tight cursor-pointer absolute top-0 right-0`}
                  >
                    <FaTools />
                    <span className="ml-2">
                      ゲストはプロフィール編集できません
                    </span>
                  </div>
                ) : (
                  <div
                    className={`${styles.btn} md:flex shadow bg-black ml-4 px-8 py-3 appearance-none rounded text-gray-600 leading-tight cursor-pointer absolute top-0 right-0`}
                  >
                    <FaTools />
                    <span
                      className="ml-2"
                      onClick={() =>
                        history.push(`/profile/${profile.userProfile}`)
                      }
                    >
                      プロフィールを編集する
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="text-gray-600 ml-6 md:mt-2 md:mb-4 md:ml-10">
            @{props.user_name}
          </div>
          {isWide ? (
            <></>
          ) : (
            <div className="ml-6 md:mt-2 md:mb-4 md:ml-10">
              {userCategory.map((category) => (
                <span key={category.id} className={styles.category}>
                  {category.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {isWide ? (
        <></>
      ) : (
        <div className="mb-10 md:ml-32 w-3/4">
          <div>{props.self_introduction}</div>
        </div>
      )}
      {isWide && (
        <>
          <div className="px-8 pt-5">
            {userCategory.map((category) => (
              <span key={category.id} className={styles.category}>
                {category.name}
              </span>
            ))}
          </div>
          <div className="px-8 pt-5">{props.self_introduction}</div>
          {profile.self_introduction ==
          'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。' ? (
            <div className="flex appearance-none rounded leading-tight mt-4 cursor-pointer text-blue-500 justify-end">
              <FaTools />
              <span className="mr-2 mb-4">
                ゲストはプロフィール編集できません
              </span>
            </div>
          ) : (
            <div
              className="flex appearance-none rounded leading-tight mt-4 cursor-pointer text-blue-500 justify-end"
              onClick={() => history.push(`/profile/${profile.userProfile}`)}
            >
              <FaTools />
              <span className="mr-2 mb-4">プロフィールを編集する</span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfileList;
