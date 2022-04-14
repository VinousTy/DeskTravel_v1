import React, { useEffect } from 'react';
import styles from './PostDetail.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, selectPosts } from '../../features/post/postSlice';
import { getProfiles, selectProfile } from '../../features/auth/authSlice';
import Detail from '../../components/detail/Detail';
import { AppDispatch } from '../../app/store';

const PostDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const profile = useSelector(selectProfile);

  let id = window.location.pathname.split('/post/detail')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(getPosts());
      await dispatch(getProfiles());
    };
    fetchBootLoader();
  }, []);

  return (
    <div className="md:w-10/12 mt-10 mb-10 md:w-8/12 mx-auto md:h-auto text-white rounded">
      {posts.map((post) => {
        if (post.id === Number(id))
          return (
            <Detail
              id={Number(id)}
              key={post.id}
              postId={post.id}
              body={post.body}
              liked={post.liked}
              userPost={post.userPost}
              bookmark={post.bookmark}
              loginId={profile.userProfile}
            />
          );
      })}
    </div>
  );
};

export default PostDetail;
