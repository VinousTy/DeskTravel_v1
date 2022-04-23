import React from 'react';
import styles from './Footer.module.scss';
import useMedia from 'use-media';
import { useHistory, useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { selectIsSignIn } from '../../features/auth/authSlice';
import BottomNav from './BottomNav';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer: React.FC = () => {
  const location = useLocation();
  const signIn = useSelector(selectIsSignIn);
  const isWide = useMedia({ maxWidth: '768px' });
  const history = useHistory();

  const footerMenu = () => {
    if (
      (signIn && location.pathname.indexOf('/mypage')) ||
      location.pathname === '/mypage'
    ) {
      return <BottomNav />;
    } else if (signIn) {
      return <BottomNav />;
    } else {
      return (
        <div className="mx-auto text-white items-center">
          <h1>
            <img src={logo} className={`${styles.logo} cursor-pointer mt-4`} />
          </h1>
          <nav className="md:flex items-center justify-between">
            <ul className={styles.nav_box}>
              <li
                className="cursor-pointer"
                onClick={() => history.push('/terms')}
              >
                <a className={`${styles.nav} inline-block px-3 pb-1`}>
                  利用規約
                </a>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => history.push('/privacy')}
              >
                <a className={`${styles.nav} inline-block px-3 py-1`}>
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`${styles.nav} inline-block px-3 py-1`}
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
            <div className={styles.nav_box}>
              copylight&copy;2022{' '}
              <span className={styles.nav_box__logo}>DeskTravel</span>
            </div>
          </nav>
        </div>
      );
    }
  };

  return (
    <footer className="bg-thin-black">
      {isWide ? (
        footerMenu()
      ) : (
        <div className="md:container mx-auto text-white items-center">
          <h1>
            <img
              src={logo}
              className={`${styles.logo} cursor-pointer mt-4 md:ml-2 md:mt-1 md:mb-1`}
            />
          </h1>
          <nav className="md:flex items-center justify-between">
            <ul className={styles.nav_box}>
              <li
                className="cursor-pointer"
                onClick={() => history.push('/terms')}
              >
                <a className={`${styles.nav} md:inline-block px-3 py-2`}>
                  利用規約
                </a>
              </li>
              <li
                className="cursor-pointer"
                onClick={() => history.push('/privacy')}
              >
                <a className={`${styles.nav} md:inline-block px-3 py-2`}>
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`${styles.nav} md:inline-block px-3 py-2`}
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
            <div className={styles.nav_box}>
              copylight&copy;2022{' '}
              <span className={styles.nav_box__logo}>DeskTravel</span>
            </div>
          </nav>
        </div>
      )}
    </footer>
  );
};

export default Footer;
