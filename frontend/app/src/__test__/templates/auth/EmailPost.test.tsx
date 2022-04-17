import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import { act } from 'react-dom/test-utils';
import EmailPost from '../../../templates/auth/EmailPost';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const handlers = [
  rest.post(`${apiUrl}password/reset/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
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

describe('EmailPost Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });
  it('PasswordResetですべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <EmailPost />
      </Provider>
    );
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('input-email')).toBeTruthy();
    expect(screen.getByTestId('button-submit')).toBeTruthy();
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <EmailPost />
      </Provider>
    );
    await act(async () => {
      userEvent.click(screen.getByTestId('button-submit'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
  it('登録されていないメールアドレスを入力して際にエラーを表示', async () => {
    server.use(
      rest.post(`${apiUrl}password/reset/`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <Provider store={store}>
        <EmailPost />
      </Provider>
    );
    await act(async () => {
      userEvent.click(screen.getByTestId('button-submit'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
