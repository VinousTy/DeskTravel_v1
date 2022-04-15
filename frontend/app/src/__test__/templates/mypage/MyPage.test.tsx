import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import postReducer from '../../../features/post/postSlice';
import MyPage from '../../../templates/mypage/MyPage';
import Modal from 'react-modal';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const handlers = [
  rest.get(`${apiUrl}api/category/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200)), ctx.json([{ id: 1, name: 'Enginner' }]);
  }),
  rest.get(`${apiUrl}api/myprofile/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          name: 'user',
          user_name: 'user_name',
          self_introduction: 'test',
          category: 1,
          userProfile: 1,
          created_on: '2022',
          img: 'img',
        },
      ])
    );
  }),
  rest.get(`${apiUrl}api/profile/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          name: 'user',
          user_name: 'user_name',
          self_introduction: 'test',
          category: 1,
          userProfile: 1,
          created_on: '2022',
          img: 'img',
        },
      ])
    );
  }),
  rest.get(`${apiUrl}api/mypost/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          body: '投稿文',
          userPost: 1,
          created_on: '2022',
          bookmark: [0],
          liked: [0],
        },
      ])
    );
  }),
  rest.get(`${apiUrl}api/post/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          body: '投稿文',
          userPost: 1,
          created_on: '2022',
          bookmark: [0],
          liked: [0],
        },
      ])
    );
  }),
  rest.get(`${apiUrl}api/post-image/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200)), ctx.json([{ id: 1, img: 'img', postId: 1 }]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe('MyPage Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        post: postReducer,
      },
    });
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    Modal.setAppElement = () => null;
  });
  it('MyPageで要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <MyPage />
      </Provider>
    );
    expect(screen.getByTestId('post-title')).toBeTruthy();
    expect(screen.getByTestId('post')).toBeTruthy();
    expect(screen.getByTestId('bookmark-title')).toBeTruthy();
  });
  it('タブが切り替わった際に正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <MyPage />
      </Provider>
    );
    userEvent.click(screen.getByTestId('bookmark-title'));
    expect(screen.getByTestId('post-title')).toBeTruthy();
    expect(screen.getByTestId('bookmark-title')).toBeTruthy();
    expect(screen.getByTestId('bookmark')).toBeTruthy();
  });
});
