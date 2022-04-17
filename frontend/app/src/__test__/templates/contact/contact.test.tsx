import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Contact from '../../../templates/contact/Contact';

describe('Contact Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });
  it('Contactですべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.getByTestId('input-name')).toBeTruthy();
    expect(screen.getByTestId('input-email')).toBeTruthy();
    expect(screen.getByTestId('input-message')).toBeTruthy();
    expect(screen.getByTestId('button-submit')).toBeTruthy();
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );
    await act(async () => {
      userEvent.click(screen.getByTestId('button-submit'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });
  it('正しく問い合わせメールを送信できたかを確認', async () => {
    render(
      <Provider store={store}>
        <Contact />
      </Provider>
    );
    userEvent.type(screen.getByTestId('input-name'), 'name');
    userEvent.type(screen.getByTestId('input-email'), 'test@example.com');
    userEvent.type(screen.getByTestId('input-message'), 'test-message');
    await act(async () => {
      userEvent.click(screen.getByTestId('button-submit'));
    });
    await act(async () => {
      expect(await screen.findAllByRole('alert')).toHaveLength(1);
    });
  });
});
