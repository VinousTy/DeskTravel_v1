import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import styles from './PostCard.module.scss';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, Checkbox } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import useMedia from 'use-media';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoadingPostEnd,
  isLoadingPostStart,
  postComment,
  patchLiked,
  getComments,
  patchBookmark,
  selectImage,
  getImage,
} from '../../features/post/postSlice';
import { AppDispatch } from '../../app/store';
import {
  getCategory,
  getMyProfile,
  getProfiles,
  searchGetProfiles,
  selectCategory,
  selectProfile,
  selectProfiles,
} from '../../features/auth/authSlice';
import { selectComments } from '../../features/post/postSlice';
import { PROPS_POST_LIST } from '../../types/Types';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    width: '32%',
    background: '#222',
    color: '#fff',
  },
  header: {
    color: '#fff',
  },
  media: {
    height: '0%',
    paddingTop: '56.25%',
    cursor: 'pointer',
  },
  iconButton: {
    paddingLeft: '2px',
    paddingRight: 0,
  },
  icon: {
    [theme.breakpoints.down('sm')]: {
      paddingRight: '2px',
    },
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

const PostList: React.FC<PROPS_POST_LIST> = ({
  postId,
  loginId,
  userPost,
  body,
  liked,
  bookmark,
}) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState(''),
    [expanded, setExpanded] = useState(false);
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const categories = useSelector(selectCategory);
  const image = useSelector(selectImage);
  const isWide = useMedia({ maxWidth: '768px' });
  const isWide_sm = useMedia({ maxWidth: '300px' });
  const history = useHistory();
  const search = useLocation().search;
  const location = useLocation();

  const query = new URLSearchParams(search);
  const query_name = query.get('name');

  const home = location.pathname.includes('/home');

  const commentsOnPost = comments.filter((com) => {
    return com.postId === postId;
  });

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  const loginProf = profiles.filter((prof) => {
    return prof.userProfile === loginId;
  });

  const img = image.filter((img) => {
    return img.postId === postId;
  });

  const userCategory = categories?.filter((category?) => {
    return category?.id === prof[0]?.category;
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT || localStorage.access_token) {
        const result = await dispatch(getMyProfile());
        if (getMyProfile.rejected.match(result)) {
          return null;
        }
        if (query_name === null) {
          await dispatch(getProfiles());
        } else if (query_name) {
          await dispatch(searchGetProfiles({ name: String(query_name) }));
        }
        await dispatch(getImage());
        await dispatch(getComments());
        await dispatch(getCategory());
      }
    };
    fetchBootLoader();
  }, [dispatch]);

  const submitComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { body: text, postId: postId };
    await dispatch(isLoadingPostStart);
    await dispatch(postComment(packet));
    await dispatch(isLoadingPostEnd);
    setText('');
  };

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
            <h5 data-testid="name">{prof[0]?.name}</h5>
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
          <IconButton
            className={classes.iconButton}
            aria-label="add to favorites"
          >
            <Checkbox
              className={`${classes.iconButton} text-white`}
              icon={<FavoriteBorderIcon className="text-white" />}
              checkedIcon={<Favorite />}
              checked={liked.some((like) => like === loginId)}
              onChange={handlerLiked}
              data-testid="like-icon"
            />
            <span
              className="font-extralight pb-2 text-white ml-1"
              data-testid="like"
            >
              {liked.length}
            </span>
          </IconButton>
          <IconButton aria-label="comment" data-testid="comments-icon">
            <ChatBubbleOutlineIcon className="text-white" />
            <span className="font-extralight pb-2 text-white ml-1">
              {commentsOnPost.length}
            </span>
          </IconButton>
          <IconButton aria-label="bookmark">
            <Checkbox
              className={`${classes.iconButton} text-white`}
              icon={<BookmarkBorderIcon className="text-white" />}
              checkedIcon={<BookmarkIcon className="text-green" />}
              data-testid="bookmark-icon"
              checked={bookmark.some((bookmark) => bookmark === loginId)}
              onChange={handlerBookmark}
            />
            <span className="font-extralight pb-2 text-white ml-1">
              {bookmark.length}
            </span>
          </IconButton>
          {home ? (
            <></>
          ) : (
            <>
              {isWide_sm ? (
                <></>
              ) : (
                <IconButton
                  className={classes.comment}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <span className="text-white text-xs">コメントを表示</span>
                  <ExpandMoreIcon
                    className={`text-white ${clsx(classes.comment, {
                      [classes.expandOpen]: expanded,
                    })}`}
                    data-testid="button-comment-open"
                  />
                </IconButton>
              )}
            </>
          )}
        </CardActions>
        {home ? (
          <></>
        ) : (
          <>
            <hr className={styles.hr} />
            <Collapse
              in={expanded}
              timeout="auto"
              unmountOnExit
              data-testid="comment"
            >
              <CardContent>
                <div className="py-2">
                  {commentsOnPost.length === 0 ? (
                    <div>コメントはありません</div>
                  ) : (
                    commentsOnPost.reverse().map((comment) => (
                      <div
                        key={comment.id}
                        className="flex items-center"
                        data-testid="comment-list"
                      >
                        <Avatar
                          src={
                            profiles.find(
                              (prof) => prof.userProfile === comment.userComment
                            )?.img
                          }
                          style={
                            isWide
                              ? { width: 30, height: 30 }
                              : { width: 30, height: 30 }
                          }
                          className="mt-1 mx-1"
                        />
                        <p>
                          <strong className="mr-2">
                            {
                              profiles.find(
                                (prof) =>
                                  prof.userProfile === comment.userComment
                              )?.name
                            }
                          </strong>
                          {comment.body}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <hr className={styles.hr} />
            </Collapse>
            <form className="flex">
              <Avatar
                src={loginProf[0]?.img === undefined ? '' : loginProf[0]?.img}
                style={
                  isWide ? { width: 30, height: 30 } : { width: 30, height: 30 }
                }
                className="mt-1 mx-1"
              />
              {profile.self_introduction ==
              'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。' ? (
                <>
                  <textarea
                    disabled={true}
                    className="flex-auto py-2 bg-transparent outline-none"
                    rows={1}
                    placeholder="ゲストはコメント入力できません"
                    value={text}
                  />
                </>
              ) : (
                <>
                  <textarea
                    className="flex-auto py-2 bg-transparent outline-none"
                    data-testid="input-comment"
                    rows={1}
                    placeholder="コメント入力"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button
                    disabled={!text.length}
                    className="bg-transparent mr-1 text-blue-500"
                    type="submit"
                    onClick={submitComment}
                    data-testid="button-comment"
                  >
                    送信
                  </button>
                </>
              )}
            </form>
          </>
        )}
      </Card>
    </>
  );
};

export default PostList;
