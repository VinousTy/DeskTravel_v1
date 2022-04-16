import React, { useEffect } from 'react';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import './SwiperPostList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { getPosts, selectPosts } from '../../../features/post/postSlice';
import SwiperList from './SwiperList';

interface PROPS_LOGINID {
  loginId: number;
}
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]);

const SwiperPostList: React.FC<PROPS_LOGINID> = ({ loginId }) => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    const fetchBootLoader = async () => {
      await dispatch(getPosts());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <div className="z-0">
      <Swiper
        id="swiper"
        spaceBetween={5}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
        }}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        centeredSlides={true}
        grabCursor={true}
        scrollbar={{ draggable: true }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        <div className="md:text-center md:mx-auto">
          {posts
            .slice(-5)
            .reverse()
            .map((post) => (
              <SwiperSlide key={post.id}>
                <SwiperList
                  postId={post.id}
                  body={post.body}
                  loginId={loginId}
                  userPost={post.userPost}
                  bookmark={post.bookmark}
                  liked={post.liked}
                />
              </SwiperSlide>
            ))}
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperPostList;
