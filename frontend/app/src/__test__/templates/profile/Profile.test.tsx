import React from 'react';
import {
  render,
  screen,
  cleanup,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import { act } from 'react-dom/test-utils';
import Profile from '../../../templates/profile/Profile';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const handlers = [
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
  rest.get(`${apiUrl}api/category/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200)), ctx.json([{ id: 1, name: 'Enginner' }]);
  }),
  rest.post(`${apiUrl}api/profile/1/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(201));
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

describe('Profile Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
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
  });
  it('Profileですべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    await act(async () => {
      expect(screen.getByTestId('label-name')).toBeTruthy();
      expect(screen.getByTestId('label-username')).toBeTruthy();
      expect(screen.getByTestId('label-category')).toBeTruthy();
      expect(screen.getByTestId('label-self-introduction')).toBeTruthy();
      expect(screen.getByTestId('input-name')).toBeTruthy();
      expect(screen.getByTestId('input-username')).toBeTruthy();
      expect(screen.getByTestId('select-category')).toBeTruthy();
      expect(screen.getByTestId('input-self-introduction')).toBeTruthy();
      expect(screen.getByTestId('button-regist')).toBeTruthy();
    });
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-regist'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockHistoryPush).not.toBeCalledWith('/home');
  });
  it('ユーザー登録に失敗した際にページ遷移しないことを確認', async () => {
    server.use(
      rest.post(`${apiUrl}api/profile/1/`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-regist'));
    });
    expect(mockHistoryPush).not.toBeCalledWith('/home');
  });
});
