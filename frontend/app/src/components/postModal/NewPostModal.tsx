import React, { useEffect, useState } from 'react';
import styles from './PostModal.module.scss';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  createPost,
  getMyPost,
  isCloseModal,
  selectIsOpen,
  selectPost,
} from '../../features/post/postSlice';
import { Collapse } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EditPostList from '../postList/editPostList/EditPostList';
import logo from '../../assets/logo.png';

const customStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '60%',
    height: '40%',
    padding: '50px',
    transform: 'translate(-50%, -50%)',
    background: '#222',
  },
};
const NewPostModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const post = useSelector(selectPost);
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const postRegist = async () => {
    await dispatch(createPost({ body: 'create' }));
    await history.push('/post/regist');
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(getMyPost());
    };
    fetchBootLoader();
  }, []);

  Modal.setAppElement('#root');

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={async () => {
          await dispatch(isCloseModal());
        }}
        style={customStyles}
      >
        <div className="text-center text-white">
          <h2 className="mb-3 leading-6 font-medium">
            <img
              src={logo}
              className="mx-auto w-10/12 h-10/12 md:mt-1 md:mb-1 md:w-3/12 md:h-3/12"
            />
          </h2>
          <br />
          <h3
            className="cursor-pointer hover:text-gray-400  transition-all md:mb-2"
            onClick={postRegist}
          >
            新規投稿をする
          </h3>
          <hr className={`${styles.border} mb-3`} />
          <br />
          <h3
            className="cursor-pointer hover:text-gray-400  transition-all md:mb-2"
            onClick={handleExpandClick}
          >
            既存の投稿を編集する
          </h3>
          <hr className={`${styles.border} mb-3`} />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div className="px-8 py-8">
              <div
                className={`${styles.container_tab} flex flex-wrap justify-between`}
              >
                {post.map((post) => (
                  <div key={post.id} className={styles.img}>
                    <EditPostList postId={post.id} />
                  </div>
                ))}
              </div>
            </div>
          </Collapse>
        </div>
      </Modal>
    </div>
  );
};

export default NewPostModal;
