import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import { act } from 'react-dom/test-utils';
import PasswordReset from '../../../templates/auth/PasswordReset';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const handlers = [
  rest.post(
    `${apiUrl}password/reset/confirm/`,
    (req: any, res: any, ctx: any) => {
      return res(ctx.status(200));
    }
  ),
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

describe('PasswordReset Components Test Cases', () => {
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
        <MemoryRouter
          initialEntries={[
            {
              pathname:
                '/password/reset/?token=c988f7c00d2299f46de38bdba7b2cbb5915b7eb65909c',
            },
          ]}
        >
          <PasswordReset />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('input-password')).toBeTruthy();
    expect(screen.getByTestId('input-password-confirm')).toBeTruthy();
    expect(screen.getByTestId('button-submit')).toBeTruthy();
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[
            {
              pathname:
                '/password/reset/?token=c988f7c00d2299f46de38bdba7b2cbb5915b7eb65909c',
            },
          ]}
        >
          <PasswordReset />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      userEvent.click(screen.getByTestId('button-submit'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
});
