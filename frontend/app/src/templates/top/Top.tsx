import React, { useEffect } from 'react';
import styles from './Top.module.scss';
import top_image_first from '../../assets/top.jpg';
import top_image_second from '../../assets/top_2.jpg';
import top_image_third from '../../assets/top_3.jpg';
import aboutUsImage from '../../assets/about_us.jpg';
import main_first_Image from '../../assets/main_1.jpg';
import main_second_Image from '../../assets/main_2.jpg';
import connectionTextImage from '../../assets/connection.png';
import searchTextImage from '../../assets/search.png';
import useMedia from 'use-media';
import Loading from '../../components/load/Loading';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoadingStart,
  selectIsLoadingAuth,
} from '../../features/auth/authSlice';
import { AppDispatch } from '../../app/store';
import { useHistory } from 'react-router-dom';

const topImageFirst = {
  backgroundImage: `url(${top_image_first})`,
};
const topImageSecond = {
  backgroundImage: `url(${top_image_second})`,
};
const topImageThird = {
  backgroundImage: `url(${top_image_third})`,
};

const Top: React.FC = () => {
  const isWide = useMedia({ maxWidth: '768px' });
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingAuth);
  const history = useHistory();

  useEffect(() => {
    const bootLoader = async () => {
      await dispatch(isLoadingStart());
    };
    bootLoader();
  }, []);

  return (
    <div className="mt-0 pt-0">
      {isLoading ? (
        <>
          <section>
            <div className={styles.top_img_box}>
              <div
                className={`${styles.top_img} h-full`}
                style={topImageFirst}
              />
              <div
                className={`${styles.top_img} h-full`}
                style={topImageSecond}
              />
              <div
                className={`${styles.top_img} h-full`}
                style={topImageThird}
              />
              <h1
                className={`${styles.item} absolute top-44 left-2 md:top-0 md:left-0 text-white md:text-6xl md:ml-8 md:pt-28`}
              >
                Let your own special
                <br /> desk travel the world.
              </h1>
              <h2
                className={`${styles.item} absolute bottom-28 left-2 md:left-0 text-white md:text-3xl md:ml-8`}
              >
                世界中のデスクを探しに行こう
              </h2>
            </div>
          </section>
          <section className="mt-32 text-white">
            <div className={`${styles.about_back_img} h-full`}>
              <h2
                className={`${styles.item} text-white text-5xl md:text-8xl absolute -top-10 left-1/4 md:-top-16 md:left-28`}
              >
                About Us
              </h2>
              <div className="w-full pt-16 text-center md:pt-24 md:ml-3 md:w-6/12">
                <h3 className={`${styles.item} md:text-4xl font-bold`}>
                  世界中のデスクスペースをシェアリング
                </h3>
                <p className={`${styles.item} pt-10 md:text-lg`}>
                  世界中エンジニアやデザイナーなどのデスクスペースをシェアリングできるサービスです。
                </p>
                <p className={`${styles.item} pt-2 md:text-lg`}>
                  こだわりのデスクスペースが世界中から集約されています。
                  <br />
                  あなただけのこだわりの機材や最新の機材をシェアしあい「理想の見た目」を手に入れよう！
                </p>
                <div
                  className={`${styles.item} mt-8 mx-auto text-center`}
                  onClick={() => history.push('/signup')}
                >
                  <button type="button" className={`${styles.button} `}>
                    今すぐ参加する
                  </button>
                </div>
              </div>
              {isWide ? (
                <></>
              ) : (
                <img
                  src={aboutUsImage}
                  className="w-5/12 absolute top-10 right-10"
                />
              )}
            </div>
          </section>
          <section className="mt-32 w-full text-white">
            <div className={styles.main}>
              <h2
                className={`${styles.item} text-5xl md:text-8xl absolute -top-10 left-1/4 md:-top-16 md:left-28`}
              >
                Function
              </h2>
              <div className="w-full md:flex md:justify-around md:items-center">
                <div className="w-full md:w-6/12">
                  <h3
                    className={`${styles.main_title} ${styles.item} pt-10 font-bold md:text-2xl md:ml-28 text-purple-800`}
                  >
                    Connection
                  </h3>
                  <h4
                    className={`${styles.item} pt-6 font-bold md:text-4xl md:ml-28`}
                  >
                    いつでもどこでも
                    <span className="text-purple-800">繋がり</span>合える
                  </h4>
                  <p className={`${styles.item} pt-8 md:text-lg md:ml-28`}>
                    「いいね」「コメント」など他ユーザーと繋がり合うことができます。また、お気に入りのユーザーの投稿を「ブックマーク」に登録することで瞬時に閲覧することも可能です。
                  </p>
                </div>
                <div>
                  <div className="relative">
                    <img
                      src={main_first_Image}
                      alt="メイン画像1"
                      className="mt-20 w-9/12 md:w-full"
                    />
                    <img
                      className="w-9/12 absolute top-24 left-24 md:top-44 md:-left-52 md:w-full"
                      src={connectionTextImage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:flex md:justify-around items-center flex-row-reverse mt-20">
                <div className="w-full md:w-6/12">
                  <h3
                    className={`${styles.main_title} ${styles.item} font-bold md:text-2xl md:ml-28 text-purple-800`}
                  >
                    Search
                  </h3>
                  <h4
                    className={`${styles.item} pt-6 font-bold md:text-4xl md:ml-28`}
                  >
                    気になる<span className="text-purple-800">ユーザー</span>
                    を瞬時に見つける
                  </h4>
                  <p className={`${styles.item} pt-8 md:text-lg md:ml-28`}>
                    ユーザー名で検索することが可能のため、気になるユーザーの投稿を瞬時に見つけることが可能です。また、全ての投稿を一覧で閲覧することもできます。
                  </p>
                </div>
                <div>
                  <div className="relative mb-20">
                    <img
                      src={main_second_Image}
                      alt="メイン画像2"
                      className="mt-5 w-9/12 md:w-full"
                    />
                    <img
                      className="w-9/12 absolute top-24 left-24 md:top-44 md:left-60 md:w-full"
                      src={searchTextImage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div>
              <div className={`${styles.cd_fixed_bg} ${styles.cd_bg_1}`} />
              <div className="relative my-7 text-white">
                <h2 className="text-5xl md:text-8xl absolute top-0 left-1/4 md:-top-0 md:left-28">
                  Solution
                </h2>
                <div className="pt-20 md:pt-32">
                  <p className="md:ml-28">
                    「DeskTravel」は以下のような問題を解決してくれます。
                  </p>
                  <div className="pt-16 md:flex md:justify-around">
                    <div className="mb-10 mx-auto w-10/12 md:w-3/12">
                      <div className={styles.card__imgframe_1}></div>
                      <div className="w-full py-5 px-4 bg-white text-black box-border">
                        <div className="text-lg font-bold">生産性の向上</div>
                        <div className="leading-5 text-sm pt-4">
                          「コメント機能」を搭載しているため、使用しているアイテムの使い心地・使用感まで知ることができるため、生産性が向上が期待できます。
                        </div>
                      </div>
                    </div>
                    <div className="mb-10 mx-auto w-10/12 md:w-3/12">
                      <div className={styles.card__imgframe_2}></div>
                      <div className="w-full py-5 px-4 bg-white text-black box-border">
                        <div className="text-lg font-bold">理想の見た目</div>
                        <div className="leading-5 text-sm pt-4">
                          写真の投稿機能はもちろん、使用しているアイテム名まで知ることが可能なため、より自分自身の理想の見た目を追求することが可能です。
                        </div>
                      </div>
                    </div>
                    <div className="mb-10 mx-auto w-10/12 md:w-3/12">
                      <div className={styles.card__imgframe_3}></div>
                      <div className="w-full py-5 px-4 bg-white text-black box-border">
                        <div className="text-lg font-bold">繋がりを拡大</div>
                        <div className="leading-5 text-sm pt-4">
                          「いいね」や「ブックマーク」など他ユーザーと繋がり合える機能を搭載しています。また、他SNSと連携して幅広く知ってもらうことができます。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.cd_fixed_bg} ${styles.cd_bg_1}`} />
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Top;
