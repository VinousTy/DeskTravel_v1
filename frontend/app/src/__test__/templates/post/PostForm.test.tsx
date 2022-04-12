import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import postReducer from '../../../features/post/postSlice';
import { act } from 'react-dom/test-utils';
import PostRegist from '../../../templates/post/PostRegist';
import PostEdit from '../../../templates/post/PostEdit';
import { MemoryRouter } from 'react-router';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const handlers = [
  rest.get<Record<string, any>>(
    `${apiUrl}api/mypost/`,
    (req: any, res: any, ctx: any) => {
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
    }
  ),
  rest.put(`${apiUrl}api/post/1/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(201));
  }),
  rest.post(`${apiUrl}api/post-image/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, img: 'img.jpg', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/monitor/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_monitor', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/computer/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_computer', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/keyboard/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_keyboard', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/mouse/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_mouse', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/speaker/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_speaker', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/table/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_table', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/chair/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_chair', postId: 1 }])
    );
  }),
  rest.post(`${apiUrl}api/other/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_other', postId: 1 }])
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

describe('PostForm Components Test Cases', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        post: postReducer,
      },
    });
  });
  it('PostRegistですべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <PostRegist />
      </Provider>
    );
    await act(async () => {
      expect(screen.getByTestId('label-body')).toBeTruthy();
      expect(screen.getByTestId('label-monitor')).toBeTruthy();
      expect(screen.getByTestId('label-computer')).toBeTruthy();
      expect(screen.getByTestId('label-keyboard')).toBeTruthy();
      expect(screen.getByTestId('label-mouse')).toBeTruthy();
      expect(screen.getByTestId('label-speaker')).toBeTruthy();
      expect(screen.getByTestId('label-table')).toBeTruthy();
      expect(screen.getByTestId('label-chair')).toBeTruthy();
      expect(screen.getByTestId('label-other')).toBeTruthy();
      expect(screen.getByTestId('input-body')).toBeTruthy();
      expect(screen.getByTestId('input-monitor')).toBeTruthy();
      expect(screen.getByTestId('input-computer')).toBeTruthy();
      expect(screen.getByTestId('input-keyboard')).toBeTruthy();
      expect(screen.getByTestId('input-mouse')).toBeTruthy();
      expect(screen.getByTestId('input-speaker')).toBeTruthy();
      expect(screen.getByTestId('input-table')).toBeTruthy();
      expect(screen.getByTestId('input-chair')).toBeTruthy();
      expect(screen.getByTestId('input-other')).toBeTruthy();
      expect(screen.getByTestId('button-regist')).toBeTruthy();
    });
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <PostRegist />
      </Provider>
    );
    await act(async () => {
      userEvent.type(screen.getByTestId('input-monitor'), 'monitor');
      userEvent.type(screen.getByTestId('input-computer'), 'computer');
      userEvent.type(screen.getByTestId('input-keyboard'), 'keyboard');
      userEvent.type(screen.getByTestId('input-mouse'), 'mouse');
      userEvent.type(screen.getByTestId('input-speaker'), 'speaker');
      userEvent.type(screen.getByTestId('input-table'), 'table');
      userEvent.type(screen.getByTestId('input-chair'), 'chair');
      userEvent.type(screen.getByTestId('input-other'), 'other');
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-regist'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(9);
    expect(mockHistoryPush).not.toBeCalledWith('/post/list');
  });
  it('投稿作成に失敗した際にページ遷移しないことを確認', async () => {
    server.use(
      rest.post(`${apiUrl}api/post/1`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <Provider store={store}>
        <PostRegist />
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-regist'));
    });
    expect(await mockHistoryPush).not.toBeCalledWith('/post/list');
  });
  it('PostRegistですべての要素を正しくレンダリングできているか確認', async () => {
    const history = createMemoryHistory();
    history.push('/post/edit/1');
    render(
      <Provider store={store}>
        <Router history={history}>
          <PostEdit />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId('label-body')).toBeTruthy();
    userEvent.click(screen.getByTestId('button-item'));
    await act(async () => {
      expect(screen.getByTestId('label-monitor')).toBeTruthy();
      expect(screen.getByTestId('label-computer')).toBeTruthy();
      expect(screen.getByTestId('label-keyboard')).toBeTruthy();
      expect(screen.getByTestId('label-mouse')).toBeTruthy();
      expect(screen.getByTestId('label-speaker')).toBeTruthy();
      expect(screen.getByTestId('label-table')).toBeTruthy();
      expect(screen.getByTestId('label-chair')).toBeTruthy();
      expect(screen.getByTestId('label-other')).toBeTruthy();
      expect(screen.getByTestId('input-body')).toBeTruthy();
      expect(screen.getByTestId('input-monitor')).toBeTruthy();
      expect(screen.getByTestId('input-computer')).toBeTruthy();
      expect(screen.getByTestId('input-keyboard')).toBeTruthy();
      expect(screen.getByTestId('input-mouse')).toBeTruthy();
      expect(screen.getByTestId('input-speaker')).toBeTruthy();
      expect(screen.getByTestId('input-table')).toBeTruthy();
      expect(screen.getByTestId('input-chair')).toBeTruthy();
      expect(screen.getByTestId('input-other')).toBeTruthy();
      expect(screen.getByTestId('button-regist')).toBeTruthy();
    });
  });
  it('入力する値が無効の場合エラーを表示', async () => {
    render(
      <Provider store={store}>
        <PostEdit />
      </Provider>
    );
    userEvent.click(screen.getByTestId('button-item'));
    await act(async () => {
      userEvent.type(screen.getByTestId('input-monitor'), 'monitor');
      userEvent.type(screen.getByTestId('input-computer'), 'computer');
      userEvent.type(screen.getByTestId('input-keyboard'), 'keyboard');
      userEvent.type(screen.getByTestId('input-mouse'), 'mouse');
      userEvent.type(screen.getByTestId('input-speaker'), 'speaker');
      userEvent.type(screen.getByTestId('input-table'), 'table');
      userEvent.type(screen.getByTestId('input-chair'), 'chair');
      userEvent.type(screen.getByTestId('input-other'), 'other');
    });
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-regist'));
    });
    expect(await screen.findAllByRole('alert')).toHaveLength(9);
    expect(mockHistoryPush).not.toBeCalledWith('/post/list');
  });
  it('投稿作成に失敗した際にページ遷移しないことを確認', async () => {
    server.use(
      rest.post(`${apiUrl}api/post/1`, (req, res, ctx) => {
        return res(ctx.status(400));
      })
    );
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/post/edit/1' }]}>
          <PostEdit />
        </MemoryRouter>
      </Provider>
    );
    await act(async () => {
      fireEvent.submit(screen.getByTestId('button-regist'));
    });
    expect(await mockHistoryPush).not.toBeCalledWith('/post/list');
  });
});
