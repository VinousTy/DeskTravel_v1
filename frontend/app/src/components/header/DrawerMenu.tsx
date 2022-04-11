import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  isToggleDrawer,
  selectIsDrawerOpen,
} from '../../features/post/postSlice';

const DrawerMenu: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const drawer = useSelector(selectIsDrawerOpen);
  const toggleOpen = () => {
    dispatch(isToggleDrawer());
  };

  return (
    <div>
      <button className="mt-6" onClick={toggleOpen}>
        <svg
          className="mr-4 h-6 w-6 fill-current cursor-pointer md:hidden"
          viewBox="0 0 24 24"
        >
          {drawer ? (
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          ) : (
            <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
          )}
        </svg>
      </button>
    </div>
  );
};

export default DrawerMenu;
