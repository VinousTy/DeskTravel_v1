import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import clsx from 'clsx';
import {
  getMyProfile,
  isSignIn,
  selectProfile,
} from '../../features/auth/authSlice';
import ProfileList from '../../components/profileList/ProfileList';
import { AppDispatch } from '../../app/store';
import {
  getMyPost,
  getPosts,
  selectPost,
  selectPosts,
} from '../../features/post/postSlice';
import MyPostList from '../../components/postList/myPostList/MyPostList';
import NewPostModal from '../../components/postModal/NewPostModal';

interface POST_BOOKMARK {
  id: number;
  body: string;
  userPost: number;
  created_on: string;
  bookmark: number[];
  liked: number[];
}

const MyPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const profile = useSelector(selectProfile);
  const post = useSelector(selectPost);
  const posts = useSelector(selectPosts);

  const arry: Array<POST_BOOKMARK> = [];
  const BookMark = posts.filter((post) => {
    post.bookmark.forEach((book) => {
      if (book === profile?.userProfile) {
        arry.push(post);
      }
    });
  });

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT || localStorage.access_token) {
        const result = await dispatch(getMyProfile());
        if (getMyProfile.rejected.match(result)) {
          return null;
        }
        await dispatch(isSignIn());
        await dispatch(getMyPost());
        await dispatch(getPosts());
      }
    };

    fetchBootLoader();
  }, [dispatch]);

  return (
    <div>
      <div
        className={`${styles.container} w-10/12 mt-10 mb-10 pt-2 md:w-8/12 mx-auto md:pt-14 md:h-auto text-white bg-thin-black rounded`}
      >
        <NewPostModal />
        <ProfileList
          id={profile?.id}
          name={profile?.name}
          user_name={profile?.user_name}
          self_introduction={profile?.self_introduction}
          img={profile?.img}
        />
        <hr className={`${styles.border} w-full`}></hr>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className="text-center mx-auto mt-10"
        >
          <TabList className="mb-7 flex">
            <Tab className="bg-transparent w-10 mx-auto">
              <div
                className={clsx([
                  tabIndex === 0 ? styles.underline : styles.disabled,
                ])}
                data-testid="post-title"
              >
                投稿
              </div>
            </Tab>
            <Tab className="bg-transparent w-20 mx-auto">
              <div
                className={clsx([
                  tabIndex === 1 ? styles.underline : styles.disabled,
                ])}
                data-testid="bookmark-title"
              >
                保存済み
              </div>
            </Tab>
          </TabList>
          <TabPanel>
            <div className="px-8 py-8">
              <div
                className={`${styles.container_tab} flex flex-wrap justify-between`}
              >
                {post.length === 0 ? (
                  <div>投稿がありません</div>
                ) : (
                  post.map((post) => (
                    <div
                      key={post.id}
                      className={styles.img}
                      data-testid="post"
                    >
                      <MyPostList postId={post.id} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="px-8 py-8">
              <div
                className={`${styles.container} flex flex-wrap justify-between`}
              >
                {arry.length === 0 ? (
                  <div>保存済み投稿がありません</div>
                ) : (
                  arry?.map((arry) => (
                    <div
                      key={arry.id}
                      className={styles.img}
                      data-testid="bookmark"
                    >
                      <MyPostList postId={arry.id} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPage;
