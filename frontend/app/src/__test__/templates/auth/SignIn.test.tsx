import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import { act } from 'react-dom/test-utils';
import SignIn from '../../../templates/auth/SignIn';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const handlers = [
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

describe('SignIn Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });
  it('SignInですべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    expect(screen.getByTestId('label-email')).toBeTruthy();
    expect(screen.getByTestId('label-password')).toBeTruthy();
    expect(screen.getByTestId('input-email')).toBeTruthy();
    expect(screen.getByTestId('input-password')).toBeTruthy();
    expect(screen.getByTestId('button-signin')).toBeTruthy();
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-signin'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockHistoryPush).not.toBeCalledWith('/home');
  });
  it('ログインに失敗した際にページ遷移しないことを確認', async () => {
    server.use(
      rest.post(`${apiUrl}authen/jwt/create`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <Provider store={store}>
        <SignIn />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-signin'));
    });
    expect(mockHistoryPush).not.toBeCalledWith('/home');
  });
});
