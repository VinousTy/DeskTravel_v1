import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../features/auth/authSlice';
import postReducer from '../../../features/post/postSlice';
import { MemoryRouter } from 'react-router';
import Detail from '../../../components/detail/Detail';
import { act } from 'react-dom/test-utils';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const headers = [
  rest.get(`${apiUrl}api/myprofile/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)),
      ctx.json([
        {
          id: 1,
          name: 'dummy',
          user_name: 'dummy_user_name',
          self_introduction: '自己紹介',
          category: 1,
          userProfile: 1,
          created_on: '2022',
          img: 'img.jpg',
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
          name: 'dummy',
          user_name: 'dummy_user_name',
          self_introduction: '自己紹介',
          userProfile: 1,
          category: 1,
          created_on: '2022',
          img: 'img.jpg',
        },
        {
          id: 2,
          name: 'dummy2',
          user_name: 'dummy_user_name2',
          self_introduction: '自己紹介2',
          userProfile: 2,
          category: 1,
          created_on: '2022',
          img: 'img2.jpg',
        },
      ])
    );
  }),
  rest.get(`${apiUrl}api/myprofile/`, (req: any, res: any, ctx: any) => {
    const query = req.url.searchParams;
    const name = query.get('name');
    if (name === 'dummy') {
      return (
        res(ctx.status(200)),
        ctx.json([
          {
            id: 1,
            name: 'dummy',
            user_name: 'dummy_user_name',
            self_introduction: '自己紹介',
            userProfile: 1,
            category: 1,
            created_on: '2022',
            img: 'img.jpg',
          },
        ])
      );
    }
  }),
  rest.get(`${apiUrl}api/post-image/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(200)), ctx.json([{ id: 1, img: 'img.jpg', postId: 1 }])
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
  rest.get(`${apiUrl}api/category/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(200)), ctx.json([{ id: 1, name: 'Enginner' }]);
  }),
  rest.post(`${apiUrl}api/comment/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(201));
  }),
  rest.put(`${apiUrl}api/post/1/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(201));
  }),
  rest.patch(`${apiUrl}api/post/1/`, (req: any, res: any, ctx: any) => {
    return res(ctx.status(201));
  }),
  rest.get(`${apiUrl}api/monitor/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_monitor', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/computer/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_computer', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/keyboard/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_keyboard', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/mouse/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_mouse', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/speaker/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)),
      ctx.json([{ id: 1, name: 'test_speaker', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/table/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_table', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/chair/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_chair', postId: 1 }])
    );
  }),
  rest.get(`${apiUrl}api/other/`, (req: any, res: any, ctx: any) => {
    return (
      res(ctx.status(201)), ctx.json([{ id: 1, name: 'test_other', postId: 1 }])
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

describe('Detail Components Test Cases', () => {
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
  it('PostCardにすべての要素を正しくレンダリングできているか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/post/detail/1' }]}>
          <Detail
            id={1}
            postId={1}
            body={'投稿文'}
            liked={[1]}
            userPost={1}
            bookmark={[1]}
            loginId={1}
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('avatar')).toBeTruthy();
    expect(screen.getByTestId('name')).toBeTruthy();
    expect(screen.getByTestId('category')).toBeTruthy();
    expect(screen.getByTestId('like-icon')).toBeTruthy();
    expect(screen.getByTestId('bookmark-icon')).toBeTruthy();
    expect(screen.getByTestId('input-comment')).toBeTruthy();
    expect(screen.getByTestId('button-comment')).toBeTruthy();
    expect(screen.getByTestId('monitor')).toBeTruthy();
    expect(screen.getByTestId('computer')).toBeTruthy();
    expect(screen.getByTestId('keyboard')).toBeTruthy();
    expect(screen.getByTestId('mouse')).toBeTruthy();
    expect(screen.getByTestId('speaker')).toBeTruthy();
    expect(screen.getByTestId('table')).toBeTruthy();
    expect(screen.getByTestId('chair')).toBeTruthy();
    expect(screen.getByTestId('other')).toBeTruthy();
  });
  it('コメントの送信が正しく機能しているか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/post/detail/1' }]}>
          <Detail
            id={1}
            postId={1}
            body={'投稿文'}
            liked={[1]}
            userPost={1}
            bookmark={[1]}
            loginId={1}
          />
        </MemoryRouter>
      </Provider>
    );
    userEvent.type(screen.getByTestId('input-comment'), 'コメント');
    userEvent.click(screen.getByTestId('button-comment'));
    await waitFor(() => {
      expect(screen.findByTestId('comment')).toBeTruthy();
    });
  });
  it('like-iconをクリックした際に値が反映されるか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/post/detail/1' }]}>
          <Detail
            id={1}
            postId={1}
            body={'投稿文'}
            liked={[1]}
            userPost={1}
            bookmark={[1]}
            loginId={1}
          />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getByTestId('like-icon'));
    await waitFor(() => {
      expect(screen.findByText('1')).toBeTruthy();
    });
  });
  it('bookmark-iconをクリックした際に値が反映されるか確認', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[{ pathname: '/post/detail/1' }]}>
          <Detail
            id={1}
            postId={1}
            body={'投稿文'}
            liked={[1]}
            userPost={1}
            bookmark={[1]}
            loginId={1}
          />
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(screen.getByTestId('bookmark-icon'));
    await waitFor(() => {
      expect(screen.findByText('1')).toBeTruthy();
    });
  });
});
