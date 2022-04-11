import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  getMyProfile,
  isSignOut,
  selectProfile,
} from '../../features/auth/authSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    dropdown: {
      position: 'absolute',
      top: 75,
      right: -30,
      width: '150px',
      zIndex: 1,
      border: '1px solid',
    },
  })
);

const AvatarMenu: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const [tooltip, setTooltip] = useState(false);
  const history = useHistory();

  const handleTooltipClose = useCallback(() => {
    setTooltip(false);
  }, [setTooltip, tooltip]);

  const handleTooltipToggle = useCallback(() => {
    setTooltip(!tooltip);
  }, [setTooltip, tooltip]);

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div className={`${classes.root} pt-4 cursor-pointer`}>
        <Avatar alt="who?" src={profile.img} onClick={handleTooltipToggle} />
        {tooltip ? (
          <div
            className={`${classes.dropdown} py-1 bg-thin-black rounded box-border`}
          >
            <div className="pl-1 pb-2 cursor-pointer hover:bg-purple-900 transition-all">
              <PersonIcon />
              <Link to="/mypage" className="pl-1">
                Mypageへ
              </Link>
            </div>
            <div className="pl-1 cursor-pointer hover:bg-purple-900 transition-all">
              <ExitToAppIcon />
              <Link
                to="/signin"
                className="pl-1"
                onClick={() => {
                  localStorage.removeItem('localJWT');
                  dispatch(isSignOut());
                  history.push('/signin');
                }}
              >
                ログアウト
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default AvatarMenu;
