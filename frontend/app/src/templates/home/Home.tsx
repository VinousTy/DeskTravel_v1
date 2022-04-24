import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { AppDispatch } from '../../app/store';
import PostCard from '../../components/postList/PostCard';
import SwiperPostList from '../../components/postList/swiperPostList/SwiperPostList';
import NewPostModal from '../../components/postModal/NewPostModal';
import {
  createProfile,
  getMyProfile,
  isSignIn,
  selectProfile,
} from '../../features/auth/authSlice';
import {
  getPosts,
  isOpenModal,
  selectPosts,
} from '../../features/post/postSlice';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const profile = useSelector(selectProfile);
  const history = useHistory();

  const postRank = posts?.filter((post) => {
    if (post.liked.length) {
      return post;
    }
  });

  const sort = postRank.sort(function (a, b) {
    return b.liked.length - a.liked.length;
  });

  const postOnClick = () => {
    if (
      profile.self_introduction ==
      'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。'
    ) {
      Swal.fire({
        icon: 'error',
        title: '機能制限',
        text: 'ゲストは投稿することができません',
        color: '#fff',
        background: '#222',
      });
    } else {
      dispatch(isOpenModal());
    }
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT || localStorage.access_token) {
        const result = await dispatch(getMyProfile());
        if (result.payload === undefined) {
          Swal.fire({
            icon: 'error',
            title: 'プロフィール未作成',
            text: 'プロフィールが作成されていません。Myページから作成して下さい。',
            color: '#fff',
            background: '#222',
          })
            .then(() => {
              dispatch(createProfile({ name: 'anonymouse' }));
            })
            .then(() => {
              history.push('/mypage');
            });
        }
        await dispatch(getPosts());
        await dispatch(isSignIn());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  const ribbon_index = (index: number) => {
    if (index === 0) {
      return styles.ribbon;
    } else if (index === 1) {
      return styles.ribbon_1;
    } else if (index === 2) {
      return styles.ribbon_2;
    }
  };

  return (
    <div className="pb-20">
      <NewPostModal />
      <div className={`${styles.top_img} h-52 md:h-56`}>
        <h2 className="text-lg font-bold pt-10 text-center">
          あなただけのこだわりデスクを投稿しよう
        </h2>
        <div className="text-center mt-5">
          <button
            className={styles.post}
            onClick={postOnClick}
            data-testid="button-post"
          >
            今すぐ投稿する
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-center text-white md:text-left text-3xl font-bold md:ml-20 mt-10">
          最新の投稿
        </h2>
        <p className="text-center md:text-left text-gray md:ml-20 mt-1 mb-5">
          最新5件の投稿
        </p>
        <SwiperPostList loginId={profile?.userProfile} />
      </div>
      <div>
        <h2 className="text-center text-white md:text-left text-3xl font-bold md:ml-20 mt-10">
          DeskTravlランキング
        </h2>
        <p className="text-center md:text-left text-gray md:ml-20 mt-1">
          いいねが最も多い投稿
        </p>
        <div
          className={`${styles.ribbon_wrapper} md:flex mx-4 md:justify-between`}
        >
          {sort.slice(0, 3).map((post, index) => (
            <React.Fragment key={post.id}>
              <PostCard
                key={post.id}
                postId={post.id}
                body={post.body}
                loginId={profile?.userProfile}
                userPost={post.userPost}
                bookmark={post.bookmark}
                liked={post.liked}
              />
              <span className={ribbon_index(index)} data-testid="ribbon">
                {index + 1}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
