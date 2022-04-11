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
import SignUp from '../../../templates/auth/SignUp';
import { act } from 'react-dom/test-utils';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const handlers = [
  rest.post<Record<string, any>>(`${apiUrl}api/register/`, (req, res, ctx) => {
    return res(ctx.status(201));
  }),
  rest.post(`${apiUrl}authen/jwt/create`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json({
        refresh:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90e…jozfQ.gQhNwz2yPJwyR9qbhgj0Je_uNdVDY-z3gxEMCyMsq2Q',
        access:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5MjQzNzk0LCJqdGkiOiIwMWRhYzQ0MzYxN2Y0YzJjODk3YTJmMDdmMGRiZjNlYiIsInVzZXJfaWQiOjN9.83vQbDzXvjcoFHd-VQA1okRtg6wJzj5lhX9hOV_AJcE',
      })
    );
  }),
  rest.post(`${apiUrl}api/profile/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json({
        name: 'anonymouse',
      })
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

describe('SignUp Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });
  it('SignUpですべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    expect(screen.getByTestId('label-email')).toBeTruthy();
    expect(screen.getByTestId('label-password')).toBeTruthy();
    expect(screen.getByTestId('label-confirm-password')).toBeTruthy();
    expect(screen.getByTestId('input-email')).toBeTruthy();
    expect(screen.getByTestId('input-password')).toBeTruthy();
    expect(screen.getByTestId('input-confirm-password')).toBeTruthy();
    expect(screen.getByTestId('button-signup')).toBeTruthy();
  });
  it('ユーザー作成完了後profileへ遷移するか確認', async () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    userEvent.type(screen.getByTestId('input-email'), 'test@example.com');
    userEvent.type(screen.getByTestId('input-confirm-password'), 'password');
    await act(async () => {
      userEvent.type(screen.getByTestId('input-password'), 'password');
    });
    await waitFor(() => {
      fireEvent.submit(screen.getByTestId('button-signup'));
    });
    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith('/profile');
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  }, 10000);
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-signup'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockHistoryPush).not.toBeCalledWith('/profile');
  });
  it('ユーザー登録に失敗した際にページ遷移しないことを確認', async () => {
    server.use(
      rest.post(`${apiUrl}api/register/`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-signup'));
    });
    expect(mockHistoryPush).not.toBeCalledWith('/profile');
  });
});
