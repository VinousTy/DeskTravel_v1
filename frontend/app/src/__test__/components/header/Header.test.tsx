import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import postReducer from '../../../features/post/postSlice';
import Header from '../../../components/header/Header';
import { MemoryRouter } from 'react-router';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const headers = [
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

const server = setupServer(...headers);

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

describe('Header Components Test Cases', () => {
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
  });
  it('Headerにすべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('button-signup')).toBeTruthy();
    expect(screen.getByTestId('button-signin')).toBeTruthy();
    expect(screen.getByTestId('button-guest-signin')).toBeTruthy();
    expect(screen.getByTestId('button-contact')).toBeTruthy();
  });
  it('button-signupクリック後signupへ遷移するか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getByTestId('button-signup'));
    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith('/signup');
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
  it('button-signinクリック後signinへ遷移するか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getByTestId('button-signin'));
    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith('/signin');
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
  it('button-contactクリック後contactへ遷移するか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getByTestId('button-contact'));
    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith('/contact');
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
  it('button-guest-signinクリック後ゲストログイン機能が動作するか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getByTestId('button-guest-signin'));
    await waitFor(() => {
      expect(mockHistoryPush).toBeCalledWith('/home');
      expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    });
  });
});
