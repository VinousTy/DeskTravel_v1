import React, { useEffect, useState } from 'react';
import styles from './Detail.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Checkbox, Divider } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import MouseIcon from '@material-ui/icons/Mouse';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { SiAirtable } from 'react-icons/si';
import { GiOfficeChair } from 'react-icons/gi';
import { FaHeadphones } from 'react-icons/fa';
import useMedia from 'use-media';
import { PROPS_POST_DETAIL } from '../../types/Types';
import {
  getProfiles,
  selectProfiles,
  getCategory,
  selectCategory,
  isSignIn,
  getMyProfile,
  selectProfile,
} from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChair,
  getComments,
  getComputer,
  getImage,
  getKeyboard,
  getMonitor,
  getMouse,
  getOther,
  getSpeaker,
  getTable,
  isLoadingPostEnd,
  isLoadingPostStart,
  isOpenEditModal,
  patchBookmark,
  patchLiked,
  postComment,
  selectChair,
  selectComments,
  selectImage,
  selectKeyboard,
  selectMonitor,
  selectMouse,
  selectOther,
  selectPc,
  selectSpaker,
  selectTable,
} from '../../features/post/postSlice';
import { AppDispatch } from '../../app/store';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  right: {
    marginLeft: 'auto',
  },
  icon_left: {
    marginLeft: 0,
  },
}));

interface CATEGORY {
  id: number;
  name: string;
}

const Detail: React.FC<PROPS_POST_DETAIL> = ({
  id,
  postId,
  loginId,
  userPost,
  body,
  liked,
  bookmark,
}) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [text, setText] = useState('');
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const categories = useSelector(selectCategory);
  const monitors = useSelector(selectMonitor);
  const computers = useSelector(selectPc);
  const keyboards = useSelector(selectKeyboard);
  const mouses = useSelector(selectMouse);
  const speakers = useSelector(selectSpaker);
  const tables = useSelector(selectTable);
  const chairs = useSelector(selectChair);
  const others = useSelector(selectOther);
  const comments = useSelector(selectComments);
  const image = useSelector(selectImage);
  const isWide = useMedia({ maxWidth: '768px' });
  const arry: CATEGORY[] = [];

  const commentsOnPost = comments.filter((com) => {
    return com.postId === postId;
  });

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  categories.filter((category) => {
    prof.forEach((prof) => {
      if (category.id === prof.category) {
        arry.push(category);
      }
    });
  });

  const loginProf = profiles.filter((prof) => {
    return prof.userProfile === loginId;
  });

  const img = image.filter((img) => {
    return img.postId === postId;
  });

  const monitor = monitors.filter((monitor) => {
    return monitor.postId === postId;
  });

  const computer = computers.filter((computer) => {
    return computer.postId === postId;
  });
  const keyboard = keyboards.filter((keyboard) => {
    return keyboard.postId === postId;
  });
  const mouse = mouses.filter((mouse) => {
    return mouse.postId === postId;
  });
  const speaker = speakers.filter((speaker) => {
    return speaker.postId === postId;
  });
  const table = tables.filter((table) => {
    return table.postId === postId;
  });
  const chair = chairs.filter((chair) => {
    return chair.postId === postId;
  });
  const other = others.filter((other) => {
    return other.postId === postId;
  });

  const handleClickPost = () => {
    dispatch(isOpenEditModal());
  };

  useEffect(() => {
    const fetchBootLoader = async () => {
      if (localStorage.localJWT || localStorage.access_token) {
        await dispatch(isSignIn());
        await dispatch(getProfiles());
        await dispatch(getMyProfile());
        await dispatch(getImage());
        await dispatch(getComments());
        await dispatch(getMonitor());
        await dispatch(getComputer());
        await dispatch(getKeyboard());
        await dispatch(getMouse());
        await dispatch(getSpeaker());
        await dispatch(getTable());
        await dispatch(getChair());
        await dispatch(getOther());
        await dispatch(getCategory());
      }
    };
    fetchBootLoader();
  }, []);

  const submitComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { body: text, postId: postId };
    await dispatch(isLoadingPostStart);
    await dispatch(postComment(packet));
    await dispatch(isLoadingPostEnd);
    setText('');
  };

  const handlerLiked = async () => {
    let isMounted = true;
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
    return () => {
      isMounted = false;
    };
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
    <div>
      <div className="md:bg-bg-gray">
        <div className="flex relative">
          <Avatar
            src={prof[0]?.img}
            style={
              isWide ? { width: 60, height: 60 } : { width: 90, height: 90 }
            }
            className="ml-10 pt-0 md:mt-4 md:ml-20"
            data-testid="avatar"
          />
          <div className="md:mt-4">
            <div
              className="font-bold text-lg ml-6 md:ml-10 md:mt-2"
              data-testid="name"
            >
              {prof[0]?.name}
            </div>
            <div
              className={`${
                !isWide && styles.edit_btn_box
              } absolute top-0 right-4`}
            >
              {loginId === userPost && (
                <span
                  className="cursor-pointer text-lg md:text-3xl"
                  onClick={handleClickPost}
                >
                  …
                </span>
              )}
            </div>
            <div
              className="text-gray-500 ml-6 md:mt-2 md:mb-4 md:ml-10"
              data-testid="user_name"
            >
              @{prof[0]?.user_name}
            </div>
          </div>
        </div>
        <div className="w-3/4 ml-14 pt-3 pb-6 md:ml-24 md:py-6">
          <div>{prof[0]?.self_introduction}</div>
        </div>
      </div>
      {isWide ? (
        <div className="bg-black pb-4">
          <img
            className={`${styles.img_sm}`}
            src={img[0]?.img}
            alt="投稿画像"
          />
          <div className="mx-auto w-11/12">
            <div className="flex my-2">
              <h5 className="font-bold">投稿文</h5>
              <h6 className="text-gray-500 ml-auto">
                {arry.map((arr) => (
                  <span key={arr.id} className={styles.category}>
                    {arr.name}
                  </span>
                ))}
              </h6>
            </div>
            <div className="flex w-11/12 mx-auto">
              <IconButton aria-label="add to favorites">
                <Checkbox
                  className={`${classes.icon_left} text-white`}
                  icon={<FavoriteBorderIcon className="text-white" />}
                  checkedIcon={<Favorite />}
                  checked={liked.some((like) => like === loginId)}
                  onChange={handlerLiked}
                />
                <span className="font-extralight text-white">
                  {liked.length}
                </span>
              </IconButton>
              <IconButton aria-label="comment">
                <ChatBubbleOutlineIcon className="text-white" />
                <span className="font-extralight text-white ml-1">
                  {commentsOnPost.length}
                </span>
              </IconButton>
              <IconButton className={classes.right} aria-label="bookmark">
                <Checkbox
                  className="text-white"
                  icon={<BookmarkBorderIcon className="text-white" />}
                  checkedIcon={<BookmarkIcon className="text-green" />}
                  checked={bookmark.some((bookmark) => bookmark === loginId)}
                  onChange={handlerBookmark}
                />
                <span className="font-extralight text-white mr-8">
                  {bookmark.length}
                </span>
              </IconButton>
            </div>
            <div className="w-10/12 mx-auto">{body}</div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={`${styles.flex_container} flex`}>
            <img className={styles.img} src={img[0]?.img} alt="投稿画像" />
            <div className="mt-5 mx-2 w-2/5">
              <div className={styles.scroll_box}>
                <div className="mb-4" data-testid="category">
                  {arry.map((arr) => (
                    <span key={arr.id} className={styles.category}>
                      {arr.name}
                    </span>
                  ))}
                </div>
                <span data-testid="body">{body}</span>
                <hr className={`${styles.border} mt-2`} />
                <div className="mt-2">コメント</div>

                <div className={`text-white rounded`}>
                  <div className="py-2 mb-2" data-testid="comment">
                    {commentsOnPost.length === 0 ? (
                      <div>コメントはありません</div>
                    ) : (
                      commentsOnPost.reverse().map((comment) => (
                        <div key={comment.id}>
                          <div className="flex items-center break-all">
                            <Avatar
                              src={
                                profiles.find(
                                  (prof) =>
                                    prof.userProfile === comment.userComment
                                )?.img
                              }
                              style={
                                isWide
                                  ? { width: 30, height: 30 }
                                  : { width: 40, height: 40 }
                              }
                              className="mt-1 mr-3"
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
                              <br />
                              {comment.body}
                            </p>
                          </div>
                          <hr
                            className={`${styles.border} mt-3 mb-8 mx-auto`}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <IconButton aria-label="add to favorites">
                    <Checkbox
                      className={`${classes.icon_left} text-white`}
                      icon={<FavoriteBorderIcon className="text-white" />}
                      checkedIcon={<Favorite />}
                      checked={liked.some((like) => like === loginId)}
                      data-testid="like-icon"
                      onChange={handlerLiked}
                    />
                    <span className="font-extralight text-white">
                      {liked.length}
                    </span>
                  </IconButton>
                  <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon className="text-white" />
                    <span className="font-extralight text-white ml-1">
                      {commentsOnPost.length}
                    </span>
                  </IconButton>
                  <IconButton className={classes.right} aria-label="bookmark">
                    <Checkbox
                      className="text-white"
                      icon={<BookmarkBorderIcon className="text-white" />}
                      checkedIcon={<BookmarkIcon className="text-green" />}
                      checked={bookmark.some(
                        (bookmark) => bookmark === loginId
                      )}
                      data-testid="bookmark-icon"
                      onChange={handlerBookmark}
                    />
                    <span className="font-extralight text-white mr-8">
                      {bookmark.length}
                    </span>
                  </IconButton>
                </div>
              </div>
              <form className="flex">
                <Avatar
                  src={loginProf[0]?.img === undefined ? '' : loginProf[0]?.img}
                  style={
                    isWide
                      ? { width: 30, height: 30 }
                      : { width: 30, height: 30 }
                  }
                  className="mt-1 mx-1"
                />
                {profile.self_introduction ==
                'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。' ? (
                  <textarea
                    disabled={true}
                    className="flex-auto w-8/12 py-2 bg-thin-black rounded outline-none border border-gray-500"
                    rows={1}
                    placeholder="ゲストはコメント入力できません"
                    value={text}
                  />
                ) : (
                  <>
                    <textarea
                      className="flex-auto py-2 bg-thin-black rounded outline-none border border-gray-500"
                      rows={1}
                      placeholder="コメント入力"
                      value={text}
                      data-testid="input-comment"
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button
                      disabled={!text.length}
                      className="bg-transparent mr-1 text-blue-500"
                      type="submit"
                      data-testid="button-comment"
                      onClick={submitComment}
                    >
                      送信
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
      <div
        className="
        mb-10 pb-10 pt-2 mx-auto text-white bg-thin-black rounded md:mt-0 md:h-auto md:bg-bg-gray"
      >
        <h5 className="text-center font-bold text-lg">機器構成</h5>
        <div className="md:flex md:flex-wrap mb-6">
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-blue-200 px-1 py-1 rounded-full">
                <DesktopWindowsIcon className="text-blue-700" />
              </div>
              <span className="ml-1 font-bold">モニター</span>
            </div>
            <div data-testid="monitor">
              {monitor[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className={`${styles.computer_bg} px-1 py-1 rounded-full`}>
                <LaptopChromebookIcon className={styles.computer} />
              </div>
              <span className="ml-1 font-bold">コンピューター</span>
            </div>
            <div data-testid="computer">
              {computer[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-red-200 px-1 py-1 rounded-full">
                <KeyboardIcon className="text-red-500" />
              </div>
              <span className="ml-1 font-bold">キーボード</span>
            </div>
            <div data-testid="keyboard">
              {keyboard[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div
                className={`${styles.mouse_bg} bg-red-200 px-1 py-1 rounded-full`}
              >
                <MouseIcon className={styles.mouse} />
              </div>
              <span className="ml-1 font-bold">マウス</span>
            </div>
            <div data-testid="mouse">
              {mouse[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-purple-200 px-1 py-1 rounded-full">
                <VolumeUpIcon className="text-purple-500" />
              </div>
              <span className="ml-1 font-bold">スピーカー</span>
            </div>
            <div data-testid="speaker">
              {speaker[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-pink-200 px-2 py-2 rounded-full">
                <SiAirtable className="text-pink-800" />
              </div>
              <span className="ml-1 font-bold">テーブル</span>
            </div>
            <div data-testid="table">
              {table[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className="bg-yellow-200 px-2 py-2 rounded-full">
                <GiOfficeChair className="text-yellow-900" />
              </div>
              <span className="ml-1 font-bold">チェア</span>
            </div>
            <div data-testid="chair">
              {chair[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 md:w-6/12">
            <div className="ml-5 md:ml-10 flex items-center">
              <div className={`${styles.other_bg} px-2 py-2 rounded-full`}>
                <FaHeadphones className={styles.other} />
              </div>
              <span className="ml-1 font-bold">その他機器</span>
            </div>
            <div data-testid="other">
              {other[0]?.name.split(',').map((name, i) => (
                <p key={i} className="ml-14 md:ml-16 md:pl-3">
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isWide && (
        <div
          className={`mt-10 mb-10 pb-10 pt-2 md:w-10/12 mx-auto md:pt-14 md:h-auto text-white rounded`}
        >
          <div className="font-bold text-lg">コメント</div>
          <div className="py-2 mb-2 overflow-scroll h-52 md:ml-10">
            {commentsOnPost.length === 0 ? (
              <div>コメントはありません</div>
            ) : (
              commentsOnPost.reverse().map((comment) => (
                <div key={comment.id}>
                  <div className="flex items-center break-all">
                    <Avatar
                      src={
                        profiles.find(
                          (prof) => prof.userProfile === comment.userComment
                        )?.img
                      }
                      style={
                        isWide
                          ? { width: 30, height: 30 }
                          : { width: 50, height: 50 }
                      }
                      className="mt-1 mx-1 mr-3"
                    />
                    <p>
                      <strong className="mr-2">
                        {
                          profiles.find(
                            (prof) => prof.userProfile === comment.userComment
                          )?.name
                        }
                      </strong>
                      <br />
                      {comment.body}
                    </p>
                  </div>
                  <hr
                    className={`${styles.border} mt-3 mb-8 mx-auto w-11/12`}
                  />
                </div>
              ))
            )}
          </div>
          <form className="flex md:w-10/12 ml-auto mt-3">
            <Avatar
              src={loginProf[0]?.img === undefined ? '' : loginProf[0]?.img}
              style={
                isWide ? { width: 30, height: 30 } : { width: 30, height: 30 }
              }
              className="mt-1 mx-1"
            />
            {profile.self_introduction ==
            'ゲストユーザーとしてログインしています。ゲストユーザーのため、各種投稿やユーザー情報の変更等の一部機能の使用は制限されております。' ? (
              <textarea
                disabled={true}
                className="flex-auto py-2 bg-thin-black rounded outline-none"
                rows={1}
                placeholder="ゲストはコメント入力できません"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            ) : (
              <>
                <textarea
                  className="flex-auto py-2 bg-thin-black rounded outline-none"
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
                >
                  送信
                </button>
              </>
            )}
          </form>
        </div>
      )}
      {/* <div className="mb-10 pb-10 md:pt-14"></div> */}
    </div>
  );
};

export default Detail;
