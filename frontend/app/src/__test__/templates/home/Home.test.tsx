import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import postReducer from '../../../features/post/postSlice';
import Modal from 'react-modal';
import Home from '../../../templates/home/Home';
import { MemoryRouter } from 'react-router';

const apiUrl = process.env.REACT_APP_DEV_API_URL;
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
  rest.get(`${apiUrl}api/postImage/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          img: 'img',
          postId: 1,
        },
      ])
    );
  }),
  rest.get(`${apiUrl}api/comment/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          body: 'コメント',
          userComment: 1,
          postId: 1,
        },
      ])
    );
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

describe('Home Components Test Cases', () => {
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
  it('Homeで要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/home' }]}>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('button-post')).toBeTruthy();
    expect(screen.getByTestId('ribbon')).toBeTruthy();
  });
});
