import React, { useEffect } from 'react';
import styles from './PostModal.module.scss';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  getMyPost,
  isCloseEditModal,
  isOpenDeleteModal,
  selectIsEditOpen,
} from '../../features/post/postSlice';
import { useHistory } from 'react-router-dom';
import useMedia from 'use-media';
import logo from '../../assets/logo.png';

const customStyles_sm: { [key: string]: React.CSSProperties } = {
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
    height: '30%',
    padding: '50px',
    transform: 'translate(-50%, -50%)',
    background: '#222',
  },
};
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
const EditPostModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isOpen = useSelector(selectIsEditOpen);
  const history = useHistory();
  const isWide = useMedia({ maxWidth: '768px' });

  let id = window.location.pathname.split('/post/detail')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const postDelete = async () => {
    await dispatch(isOpenDeleteModal());
    await dispatch(isCloseEditModal());
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
          await dispatch(isCloseEditModal());
        }}
        style={isWide ? customStyles_sm : customStyles}
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
            onClick={() => history.push(`/post/edit/${id}`)}
          >
            投稿を編集する
          </h3>
          <hr className={`${styles.border} mb-3`} />
          <br />
          <h3
            className="cursor-pointer hover:text-gray-400  transition-all md:mb-2"
            onClick={postDelete}
          >
            投稿を削除する
          </h3>
          <hr className={`${styles.border} mb-3`} />
        </div>
      </Modal>
    </div>
  );
};

export default EditPostModal;
