import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../PostCard.module.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { Avatar, Checkbox } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoadingPostEnd,
  isLoadingPostStart,
  patchLiked,
  getComments,
  patchBookmark,
  selectImage,
  getImage,
} from '../../../features/post/postSlice';
import { AppDispatch } from '../../../app/store';
import {
  getCategory,
  getMyProfile,
  getProfiles,
  selectCategory,
  selectProfile,
  selectProfiles,
} from '../../../features/auth/authSlice';
import { selectComments } from '../../../features/post/postSlice';
import { PROPS_POST_LIST } from '../../../types/Types';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '80%',
      margin: 'auto',
    },
    width: '100%',
    background: '#222',
    color: '#fff',
    textAlign: 'center',
    margin: 0,
  },
  header: {
    color: '#fff',
  },
  media: {
    height: '0%',
    paddingTop: '56.25%',
    cursor: 'pointer',
  },
  comment: {
    marginLeft: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const SwiperList: React.FC<PROPS_POST_LIST> = ({
  postId,
  loginId,
  userPost,
  body,
  liked,
  bookmark,
}) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const categories = useSelector(selectCategory);
  const comments = useSelector(selectComments);
  const image = useSelector(selectImage);
  const history = useHistory();

  const commentsOnPost = comments.filter((com) => {
    return com.postId === postId;
  });

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  const img = image.filter((img) => {
    return img.postId === postId;
  });

  const userCategory = categories?.filter((category?) => {
    return category?.id === prof[0]?.category;
  });

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.loczalJWT || localStorage.access_token) {
        const result = await dispatch(getMyProfile());
        if (getMyProfile.rejected.match(result)) {
          return null;
        }
        await dispatch(getProfiles());
        await dispatch(getImage());
        await dispatch(getComments());
        await dispatch(getCategory());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  const handlerLiked = async () => {
    const packet = {
      id: postId,
      body: body,
      current: liked,
      current_bookmark: bookmark,
      new: loginId,
      new_bookmark: loginId,
    };
    await dispatch(isLoadingPostStart);
    if (
      profile.self_introduction ==
      'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。'
    ) {
      Swal.fire({
        icon: 'error',
        title: '機能制限',
        text: 'ゲストは「いいね」できません',
        color: '#fff',
        background: '#222',
      });
    } else {
      await dispatch(patchLiked(packet));
    }
    await dispatch(isLoadingPostEnd);
  };

  const handlerBookmark = async () => {
    const packet = {
      id: postId,
      body: body,
      current: liked,
      current_bookmark: bookmark,
      new: loginId,
      new_bookmark: loginId,
    };
    await dispatch(isLoadingPostStart);
    if (
      profile.self_introduction ==
      'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。'
    ) {
      Swal.fire({
        icon: 'error',
        title: '機能制限',
        text: 'ゲストは投稿を保存できません',
        color: '#fff',
        background: '#222',
      });
    } else {
      await dispatch(patchBookmark(packet));
    }
    await dispatch(isLoadingPostEnd);
  };

  return (
    <>
      <Card className={`${classes.root} ${styles.card_container}`}>
        <div className="flex">
          <CardHeader
            avatar={
              <Avatar
                src={prof[0]?.img === undefined ? '' : prof[0]?.img}
                data-testid="avatar"
              ></Avatar>
            }
          />
          <div className="mt-3">
            <h5 className="text-left" data-testid="name">
              {prof[0]?.name}
            </h5>
            <h6 className="text-gray-500">
              {userCategory.map((category) => (
                <span
                  key={category.id}
                  className={styles.category}
                  data-testid="category"
                >
                  {category.name}
                </span>
              ))}
            </h6>
          </div>
        </div>
        {img[0]?.img ? (
          <CardMedia
            className={classes.media}
            image={img[0]?.img}
            onClick={() => history.push(`/post/detail/${postId}`)}
            data-testid="image"
          />
        ) : (
          <></>
        )}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              className="text-white"
              icon={<FavoriteBorderIcon className="text-white" />}
              checkedIcon={<Favorite />}
              checked={liked.some((like) => like === loginId)}
              onChange={handlerLiked}
              data-testid="like-icon"
            />
            <span
              className="font-extralight text-white ml-1"
              data-testid="like"
            >
              {liked.length}
            </span>
          </IconButton>
          <IconButton aria-label="comment" data-testid="comments-icon">
            <ChatBubbleOutlineIcon className="text-white" />
            <span className="font-extralight text-white ml-1">
              {commentsOnPost.length}
            </span>
          </IconButton>
          <IconButton aria-label="bookmark">
            <Checkbox
              className="text-white"
              icon={<BookmarkBorderIcon className="text-white" />}
              checkedIcon={<BookmarkIcon className="text-green" />}
              checked={bookmark.some((bookmark) => bookmark === loginId)}
              data-testid="bookmark-icon"
              onChange={handlerBookmark}
            />
            <span
              className="font-extralight text-white ml-1"
              data-testid="bookmark"
            >
              {bookmark.length}
            </span>
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default SwiperList;
