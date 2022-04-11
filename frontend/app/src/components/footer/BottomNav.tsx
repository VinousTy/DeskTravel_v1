import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PersonIcon from '@material-ui/icons/Person';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenModal } from '../../features/post/postSlice';
import { getMyProfile, selectProfile } from '../../features/auth/authSlice';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: '#222',
    position: 'fixed',
    bottom: 0,
  },
  nav: {
    color: '#fff',
  },
});

const BottomNav: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  const handleClickHome = () => {
    history.push('/home');
  };
  const handleClickSearch = () => {
    history.push('/post/list');
  };
  const handleClickPost = () => {
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
  const handleClickMyPage = () => {
    history.push('/mypage');
  };

  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        className={classes.nav}
        label="Home"
        icon={<HomeIcon />}
        onClick={handleClickHome}
      />
      <BottomNavigationAction
        className={classes.nav}
        label="Search"
        icon={<SearchIcon />}
        onClick={handleClickSearch}
      />
      <BottomNavigationAction
        className={classes.nav}
        label="Post"
        icon={<AddBoxIcon />}
        onClick={handleClickPost}
      />
      <BottomNavigationAction
        className={classes.nav}
        label="MyPage"
        icon={<PersonIcon />}
        onClick={handleClickMyPage}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
