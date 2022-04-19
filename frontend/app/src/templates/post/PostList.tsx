import React, { useEffect, useState } from 'react';
import styles from './PostList.module.scss';
import { ImSearch } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, selectPosts } from '../../features/post/postSlice';
import PostCard from '../../components/postList/PostCard';
import {
  getMyProfile,
  getProfiles,
  isSignIn,
  searchGetProfiles,
  selectProfile,
  selectProfiles,
} from '../../features/auth/authSlice';
import { AppDispatch } from '../../app/store';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import NewPostModal from '../../components/postModal/NewPostModal';

interface ARRY {
  id: number;
  body: string;
  userPost: number;
  created_on: string;
  bookmark: number[];
  liked: number[];
}

interface NAME {
  name: string;
}

const PostList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setName] = useState('');
  const posts = useSelector(selectPosts);
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const history = useHistory();
  const search = useLocation().search;

  const query = new URLSearchParams(search);
  const query_name = query.get('name');

  const arry: ARRY[] = [];
  profiles.filter((profile) => {
    posts.forEach((post) => {
      if (profile.userProfile === post.userPost) {
        arry.push(post);
      }
    });
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NAME>();

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT || localStorage.access_token) {
        const result = await dispatch(getMyProfile());
        if (getMyProfile.rejected.match(result)) {
          return null;
        }
        await dispatch(isSignIn());
        await dispatch(getPosts());
        if (query_name) {
          await dispatch(searchGetProfiles({ name: String(query_name) }));
        } else {
          await dispatch(getProfiles());
        }
      }
    };
    fetchBootLoader();
  }, [dispatch, query_name]);

  const searchOnName = async () => {
    if (name === '') {
      await history.push('/post/list');
    } else {
      await history.push(`?name=${name}`);
      await dispatch(searchGetProfiles({ name: String(query_name) }));
    }
    reset();
  };
  return (
    <div className={styles.container}>
      <form
        className={`${styles.search_container} w-10/12 md:w-7/12`}
        onSubmit={handleSubmit(searchOnName)}
      >
        <input
          type="text"
          value={name}
          placeholder="ユーザー名検索"
          onChange={(e) => setName(e.target.value)}
        />
        <ImSearch
          type="submit"
          onClick={searchOnName}
          className={styles.serach_icon}
        />
      </form>
      <NewPostModal />
      <div
        className={`${styles.flex_container} flex mx-4 flex-wrap justify-between`}
      >
        {query_name ? (
          arry.length === 0 ? (
            <div>検索したユーザーは存在しません</div>
          ) : (
            arry
              .slice(0)
              .reverse()
              .map((arr) => (
                <PostCard
                  key={arr.id}
                  postId={arr.id}
                  body={arr.body}
                  loginId={profile.userProfile}
                  userPost={arr.userPost}
                  bookmark={arr.bookmark}
                  liked={arr.liked}
                />
              ))
          )
        ) : (
          posts
            .slice(0)
            .reverse()
            .map((post) => (
              <PostCard
                key={post.id}
                postId={post.id}
                body={post.body}
                loginId={profile.userProfile}
                userPost={post.userPost}
                bookmark={post.bookmark}
                liked={post.liked}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default PostList;
