import React from 'react';
import styles from './Header.module.scss';
import useMedia from 'use-media';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  isSignOut,
  loginEmail,
  selectIsSignIn,
} from '../../features/auth/authSlice';
import { AppDispatch } from '../../app/store';
import {
  isOpenModal,
  isToggleDrawer,
  selectIsDrawerOpen,
} from '../../features/post/postSlice';
import { useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AvatarMenu from './AvatarMenu';
import DrawerMenu from './DrawerMenu';
import logo from '../../assets/logo.png';

const guestPassword = String(process.env.REACT_APP_GUEST_PASSWORD);

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const signIn = useSelector(selectIsSignIn);
  const drawer = useSelector(selectIsDrawerOpen);
  const isWide = useMedia({ maxWidth: '768px' });
  const history = useHistory();
  const location = useLocation();

  const toggleOpen = () => {
    dispatch(isToggleDrawer());
  };

  const handleClickPost = () => {
    dispatch(isOpenModal());
  };

  const removeLocalStorage = () => {
    if (localStorage.localJWT) {
      localStorage.removeItem('localJWT');
    } else {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('Bearer');
    }
  };

  const pageTransition: any = () => {
    if (
      location.pathname.includes('/home') ||
      location.pathname.includes('/mypage') ||
      location.pathname.includes('/post/list') ||
      location.pathname.includes('/post/detail') ||
      location.pathname.includes('/post/regist')
    ) {
      history.push('/home');
    } else if (location.pathname.includes('/profile')) {
      return null;
    } else if (localStorage.localJWT || localStorage.access_token) {
      history.push('/home');
    } else {
      history.push('/');
    }
  };

  const guestLogin = async () => {
    await dispatch(isToggleDrawer());
    const auth = {
      email: 'guest@example.com',
      password: guestPassword,
    };
    await dispatch(loginEmail(auth));
    await history.push('/home');
  };

  const menuIcon = () => {
    if (signIn && location.pathname.includes('/home')) {
      return (
        <>
          {isWide ? (
            <DrawerMenu />
          ) : (
            <div className={`${styles.button} `}>
              <ul className="md:flex md:justify-end">
                <li>
                  <Link
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    to="/post/list"
                    data-testid="search-icon"
                  >
                    <SearchIcon />
                  </Link>
                </li>
                <li>
                  <span
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={handleClickPost}
                    data-testid="post-icon"
                  >
                    <AddBoxIcon />
                  </span>
                </li>
                <li>
                  <AvatarMenu />
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn && location.pathname.includes('/post/detail')) {
      return (
        <>
          {isWide ? (
            <DrawerMenu />
          ) : (
            <div className={`${styles.button} `}>
              <ul className="md:flex md:justify-end">
                <li>
                  <Link
                    className={`${styles.nav} text-white block px-3 py-2 my-4`}
                    to="/home"
                    data-testid="home-icon"
                  >
                    <HomeIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    to="/post/list"
                  >
                    <SearchIcon />
                  </Link>
                </li>
                <li>
                  <a
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={handleClickPost}
                  >
                    <AddBoxIcon />
                  </a>
                </li>
                <li>
                  <AvatarMenu />
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn && location.pathname.includes('/post/list')) {
      return (
        <>
          {isWide ? (
            <DrawerMenu />
          ) : (
            <div className={`${styles.button} `}>
              <ul className="md:flex md:justify-end">
                <li>
                  <Link
                    className={`${styles.nav} text-white block px-3 py-2 my-4`}
                    to="/home"
                  >
                    <HomeIcon />
                  </Link>
                </li>
                <li>
                  <a
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={handleClickPost}
                  >
                    <AddBoxIcon />
                  </a>
                </li>
                <li>
                  <AvatarMenu />
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn && location.pathname.includes('/mypage')) {
      return (
        <>
          {isWide ? (
            <DrawerMenu />
          ) : (
            <div className={`${styles.button} `}>
              <ul className="md:flex md:justify-end">
                <li>
                  <Link
                    className={`${styles.nav} text-white block px-3 py-2 my-4`}
                    to="/home"
                  >
                    <HomeIcon />
                  </Link>
                </li>
                <li>
                  <Link
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    to="/post/list"
                  >
                    <SearchIcon />
                  </Link>
                </li>
                <li>
                  <a
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={handleClickPost}
                  >
                    <AddBoxIcon />
                  </a>
                </li>
                <li>
                  <AvatarMenu />
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn) {
      return (
        <>
          {isWide ? (
            <DrawerMenu />
          ) : (
            <div className={`${styles.button} `}>
              <ul className="md:flex md:justify-end">
                <li>
                  <Link
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={() => {
                      removeLocalStorage();
                      dispatch(isSignOut());
                    }}
                    to="/signin"
                    data-testid="button-signout"
                  >
                    ログアウト
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          {isWide ? (
            <DrawerMenu />
          ) : (
            <div className={`${styles.button} `}>
              <ul className="md:flex md:justify-end">
                <li>
                  <span
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={() => history.push('/signup')}
                    data-testid="button-signup"
                  >
                    新規登録
                  </span>
                </li>
                <li>
                  <span
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={() => history.push('/signin')}
                    data-testid="button-signin"
                  >
                    ログイン
                  </span>
                </li>
                <li>
                  <a
                    className={`${styles.nav} block px-3 py-2 my-4`}
                    onClick={guestLogin}
                    data-testid="button-guest-signin"
                  >
                    ゲストログイン
                  </a>
                </li>
                <li>
                  <a
                    className={`${styles.nav} ${styles.contact} block px-3 py-2 my-3 border-solid border-wine border-2`}
                    onClick={() => history.push('/contact')}
                    data-testid="button-contact"
                  >
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    }
  };

  const menuIconSm = () => {
    if (signIn && location.pathname.includes('/post/detail')) {
      return (
        <>
          {drawer && (
            <div className="container mx-auto bg-thin-black">
              <ul className="md:flex md:justify-end">
                <li className="border-b border-t md:border-none">
                  <Link
                    to="/post/list"
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={toggleOpen}
                    data-testid="button-post-list-sm"
                  >
                    投稿を検索
                  </Link>
                </li>
                <li className="border-b border-t md:border-none">
                  <Link
                    to="/mypage"
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={toggleOpen}
                    data-testid="button-mypage-sm"
                  >
                    MyPage
                  </Link>
                </li>
                <li className="border-b md:border-none">
                  <a
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={() => {
                      removeLocalStorage();
                      dispatch(isSignOut());
                      history.push('/signin');
                      toggleOpen();
                    }}
                  >
                    ログアウト
                  </a>
                </li>
                <li className="border-b md:border-none">
                  <div className="my-8 text-center md:my-4">
                    <Link
                      to="/contact"
                      className={`${styles.nav} ${styles.contact} block px-6 py-2 border-solid border-wine border-2 rounded-full`}
                      onClick={toggleOpen}
                    >
                      お問い合わせ
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn && location.pathname.includes('/post/list')) {
      return (
        <>
          {drawer && (
            <div className="container mx-auto bg-thin-black">
              <ul className="md:flex md:justify-end">
                <li className="border-b border-t md:border-none">
                  <Link
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    to="/mypage"
                    onClick={toggleOpen}
                  >
                    MyPageへ
                  </Link>
                </li>
                <li className="border-b md:border-none">
                  <a
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={() => {
                      removeLocalStorage();
                      dispatch(isSignOut());
                      history.push('/signin');
                      toggleOpen();
                    }}
                  >
                    ログアウト
                  </a>
                </li>
                <li className="border-b md:border-none">
                  <div className="my-8 text-center md:my-4">
                    <Link
                      to="/contact"
                      className={`${styles.nav} ${styles.contact} block px-6 py-2 border-solid border-wine border-2 rounded-full`}
                      onClick={toggleOpen}
                    >
                      お問い合わせ
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn && location.pathname.includes('/mypage')) {
      return (
        <>
          {drawer && (
            <div className="container mx-auto bg-thin-black">
              <ul className="md:flex md:justify-end">
                <li className="border-b border-t md:border-none">
                  <Link
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    to="/post/list"
                    onClick={toggleOpen}
                  >
                    投稿一覧
                  </Link>
                </li>
                <li className="border-b md:border-none">
                  <a
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={() => {
                      removeLocalStorage();
                      dispatch(isSignOut());
                      history.push('/signin');
                      toggleOpen();
                    }}
                  >
                    ログアウト
                  </a>
                </li>
                <li className="border-b md:border-none">
                  <div className="my-8 text-center md:my-4">
                    <Link
                      to="/contact"
                      className={`${styles.nav} ${styles.contact} block px-6 py-2 border-solid border-wine border-2 rounded-full`}
                      onClick={toggleOpen}
                    >
                      お問い合わせ
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else if (signIn) {
      return (
        <>
          {drawer && (
            <div className="container mx-auto bg-thin-black">
              <ul className="md:flex md:justify-end">
                <li className="border-b border-t md:border-none">
                  <a
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={() => {
                      removeLocalStorage();
                      dispatch(isSignOut());
                      history.push('/signin');
                      toggleOpen();
                    }}
                  >
                    ログアウト
                  </a>
                </li>
                <li className="border-b md:border-none">
                  <div className="my-8 text-center md:my-4">
                    <Link
                      to="contact"
                      className={`${styles.nav} ${styles.contact} block px-6 py-2 border-solid border-wine border-2 rounded-full`}
                      onClick={toggleOpen}
                    >
                      お問い合わせ
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          {drawer && (
            <div className="container mx-auto bg-thin-black">
              <ul className="md:flex md:justify-end">
                <li className="border-b border-t md:border-none">
                  <span
                    onClick={() => {
                      history.push('/signup');
                      toggleOpen();
                    }}
                    className={`${styles.nav} block px-8 py-2 my-4`}
                  >
                    新規登録
                  </span>
                </li>
                <li className="border-b md:border-none">
                  <span
                    onClick={() => {
                      history.push('/signin');
                      toggleOpen();
                    }}
                    className={`${styles.nav} block px-8 py-2 my-4`}
                  >
                    ログイン
                  </span>
                </li>
                <li className="border-b md:border-none">
                  <a
                    className={`${styles.nav} block px-8 py-2 my-4`}
                    onClick={guestLogin}
                  >
                    ゲストログイン
                  </a>
                </li>
                <li className="border-b md:border-none">
                  <div className="my-8 text-center md:my-4">
                    <span
                      onClick={() => {
                        history.push('/contact');
                        toggleOpen();
                      }}
                      className={`${styles.nav} ${styles.contact} block px-6 py-2 border-solid border-wine border-2 rounded-full`}
                    >
                      お問い合わせ
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </>
      );
    }
  };

  return (
    <div>
      <div className={`${isWide && 'h-20'} bg-thin-black`}>
        <header className="container mx-auto text-white flex justify-between items-center">
          <h1 onClick={pageTransition} data-testid="title">
            <img
              src={logo}
              className="cursor-pointer w-6/12 h-6/12 mt-4 ml-3 md:mt-1 md:mb-1 md:w-8/12 md:h-8/12"
            />
          </h1>
          {menuIcon()}
        </header>
      </div>
      {menuIconSm()}
    </div>
  );
};

export default Header;
