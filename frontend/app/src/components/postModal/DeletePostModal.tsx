import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  deletePost,
  getMyPost,
  isCloseDeleteModal,
  selectIsDeleteOpen,
} from '../../features/post/postSlice';
import { useHistory } from 'react-router-dom';
import useMedia from 'use-media';

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
    width: '90%',
    height: '28%',
    padding: '50px',
    marginRight: '-50%',
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
    height: '30%',
    padding: '50px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#222',
  },
};
const DeletePostModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isOpen = useSelector(selectIsDeleteOpen);
  const history = useHistory();
  const isWide = useMedia({ maxWidth: '768px' });

  let id = window.location.pathname.split('/post/detail')[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const postDelete = async () => {
    await dispatch(deletePost({ id: Number(id) }));
    history.push('/mypage');
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
          await dispatch(isCloseDeleteModal());
        }}
        style={isWide ? customStyles_sm : customStyles}
      >
        <div className="text-center text-white">
          <h3 className="text-lg mb-1 leading-6 font-medium">
            投稿を削除しますか？
          </h3>
          <br />
          <p className="cursor-pointer text-gray-400 mb-2 md:mb-7">
            削除すると、この投稿は投稿リスト・プロフィールに表示されなくなります。
          </p>
          <div className="flex justify-between md:justify-around items-center cursor-pointer hover:text-gray-400 transition-all">
            <span
              className="py-2 px-4 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-transparent rounded transition-all"
              onClick={async () => {
                await dispatch(isCloseDeleteModal());
              }}
            >
              キャンセル
            </span>
            <span
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 border border-red-700 rounded transition-all"
              onClick={postDelete}
            >
              投稿を削除する
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeletePostModal;
