import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import {
  POST_STATE,
  NEW_POST,
  POST_BODY,
  POST_ID,
  POST_LIKED,
  POST_IMAGE,
  UPDATE_IMAGE,
  POST_COMMENT,
  POST_BOOKMARK,
  POST_ITEM,
  UPDATE_ITEM,
} from '../../types/Types';

const apiUrl = process.env.REACT_APP_DEV_API_URL;
const apiUrlPost = `${process.env.REACT_APP_DEV_API_URL}api/post/`;
const apiUrlMyPost = `${process.env.REACT_APP_DEV_API_URL}api/mypost/`;
const apiUrlPostImage = `${process.env.REACT_APP_DEV_API_URL}api/post-image/`;
const apiUrlComment = `${process.env.REACT_APP_DEV_API_URL}api/comment/`;

const initialState: POST_STATE = {
  isDrawer: false,
  isOpen: false,
  isEditOpen: false,
  isDeleteOpen: false,
  isLoadingPost: false,
  isMonitor: false,
  isComputer: false,
  isKeyboard: false,
  isMouse: false,
  isSpeaker: false,
  isTable: false,
  isChair: false,
  isOther: false,
  post: [
    {
      id: 0,
      body: '',
      userPost: 0,
      created_on: '',
      bookmark: [0],
      liked: [0],
    },
  ],
  posts: [
    {
      id: 0,
      body: '',
      userPost: 0,
      created_on: '',
      bookmark: [0],
      liked: [0],
    },
  ],
  img: [{ id: 0, img: '', postId: 0 }],
  monitor: [{ id: 0, name: '', postId: 0 }],
  computer: [{ id: 0, name: '', postId: 0 }],
  keyboard: [{ id: 0, name: '', postId: 0 }],
  mouse: [{ id: 0, name: '', postId: 0 }],
  speaker: [{ id: 0, name: '', postId: 0 }],
  table: [{ id: 0, name: '', postId: 0 }],
  chair: [{ id: 0, name: '', postId: 0 }],
  other: [{ id: 0, name: '', postId: 0 }],
  comments: [
    {
      id: 0,
      body: '',
      userComment: 0,
      postId: 0,
    },
  ],
};

export const getPosts = createAsyncThunk('posts/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(apiUrlPost, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else if (localStorage.access_token) {
    const res = await axios.get(apiUrlPost, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const createPost = createAsyncThunk(
  'create/post',
  async (body: POST_BODY) => {
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrlPost}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrlPost}`, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const deletePost = createAsyncThunk(
  'delete/post',
  async (id: POST_ID) => {
    if (localStorage.localJWT) {
      const res = await axios.delete(`${apiUrlPost}${id.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.delete(`${apiUrlPost}${id.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const getMyPost = createAsyncThunk('post/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(apiUrlMyPost, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(apiUrlMyPost, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const updatePost = createAsyncThunk(
  'post/post',
  async (newPost: NEW_POST) => {
    const uploadData = new FormData();
    uploadData.append('body', newPost.body);
    if (localStorage.localJWT) {
      const res = await axios.put(`${apiUrlPost}${newPost.id}/`, uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.put(`${apiUrlPost}${newPost.id}/`, uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const getImage = createAsyncThunk('image/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(apiUrlPostImage, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(apiUrlPostImage, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postImage = createAsyncThunk(
  'image/post',
  async (image: POST_IMAGE) => {
    const uploadData = new FormData();
    image.img && uploadData.append('img', image.img, image.img.name);
    uploadData.append('postId', image.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(apiUrlPostImage, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(apiUrlPostImage, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateImage = createAsyncThunk(
  'image/put',
  async (image: UPDATE_IMAGE) => {
    const uploadData = new FormData();
    image.img && uploadData.append('img', image.img, image.img.name);
    uploadData.append('postId', image.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrlPostImage}${image.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrlPostImage}${image.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const patchLiked = createAsyncThunk(
  'post/patch',
  async (liked: POST_LIKED) => {
    const currentLiked = liked.current;
    const uploadData = new FormData();

    let overlapped = false;
    currentLiked.forEach((current) => {
      if (current === liked.new) {
        overlapped = true;
      } else {
        uploadData.append('liked', String(current));
      }
    });

    if (localStorage.localJWT) {
      if (!overlapped) {
        uploadData.append('liked', String(liked.new));
      } else if (currentLiked.length === 1) {
        uploadData.append('body', liked.body);
        liked.current_bookmark.forEach((current) => {
          uploadData.append('bookmark', String(current));
        });
        const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        });
        return res.data;
      }
      const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      if (!overlapped) {
        uploadData.append('liked', String(liked.new));
      } else if (currentLiked.length === 1) {
        uploadData.append('body', liked.body);
        liked.current_bookmark.forEach((current) => {
          uploadData.append('bookmark', String(current));
        });
        const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        return res.data;
      }
      const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const patchBookmark = createAsyncThunk(
  'patch/bookmark',
  async (bookmark: POST_BOOKMARK) => {
    const currentBookmark = bookmark.current_bookmark;
    const uploadData = new FormData();

    let overlapped = false;
    currentBookmark.forEach((current) => {
      if (current === bookmark.new_bookmark) {
        overlapped = true;
      } else {
        uploadData.append('bookmark', String(current));
      }
    });

    if (localStorage.localJWT) {
      if (!overlapped) {
        uploadData.append('bookmark', String(bookmark.new_bookmark));
      } else if (currentBookmark.length === 1) {
        uploadData.append('body', bookmark.body);
        bookmark.current.forEach((current) => {
          uploadData.append('liked', String(current));
        });
        const res = await axios.put(
          `${apiUrlPost}${bookmark.id}/`,
          uploadData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.localJWT}`,
            },
          }
        );
        return res.data;
      }
      const res = await axios.patch(
        `${apiUrlPost}${bookmark.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      if (!overlapped) {
        uploadData.append('bookmark', String(bookmark.new_bookmark));
      } else if (currentBookmark.length === 1) {
        uploadData.append('body', bookmark.body);
        bookmark.current.forEach((current) => {
          uploadData.append('liked', String(current));
        });
        const res = await axios.put(
          `${apiUrlPost}${bookmark.id}/`,
          uploadData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          }
        );
        return res.data;
      }
      const res = await axios.patch(
        `${apiUrlPost}${bookmark.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getMonitor = createAsyncThunk('monitor/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/monitor/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/monitor/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postMonitor = createAsyncThunk(
  'monitor/post',
  async (monitor: POST_ITEM) => {
    const uploadData = new FormData();
    const name = monitor.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', monitor.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/monitor/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/monitor/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateMonitor = createAsyncThunk(
  'monitor/put',
  async (monitor: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = monitor.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', monitor.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/monitor/${monitor.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/monitor/${monitor.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getComputer = createAsyncThunk('computer/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/computer/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/computer/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postComputer = createAsyncThunk(
  'computer/post',
  async (computer: POST_ITEM) => {
    const uploadData = new FormData();
    const name = computer.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', computer.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/computer/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/computer/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateComputer = createAsyncThunk(
  'computer/put',
  async (computer: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = computer.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', computer.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/computer/${computer.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/computer/${computer.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getKeyboard = createAsyncThunk('keyboard/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/keyboard/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/keyboard/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postKeyboard = createAsyncThunk(
  'keyboard/post',
  async (keyboard: POST_ITEM) => {
    const uploadData = new FormData();
    const name = keyboard.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', keyboard.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/keyboard/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/keyboard/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateKeyboard = createAsyncThunk(
  'keyboard/put',
  async (keyboard: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = keyboard.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', keyboard.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/keyboard/${keyboard.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/keyboard/${keyboard.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getMouse = createAsyncThunk('mouse/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/mouse/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/mouse/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postMouse = createAsyncThunk(
  'mouse/post',
  async (mouse: POST_ITEM) => {
    const uploadData = new FormData();
    const name = mouse.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', mouse.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/mouse/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/mouse/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateMouse = createAsyncThunk(
  'mouse/put',
  async (mouse: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = mouse.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', mouse.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/mouse/${mouse.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/mouse/${mouse.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getSpeaker = createAsyncThunk('speaker/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/speaker/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/speaker/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postSpeaker = createAsyncThunk(
  'speaker/post',
  async (speaker: POST_ITEM) => {
    const uploadData = new FormData();
    const name = speaker.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', speaker.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/speaker/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/speaker/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateSpeaker = createAsyncThunk(
  'speaker/put',
  async (speaker: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = speaker.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', speaker.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/speaker/${speaker.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/speaker/${speaker.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getTable = createAsyncThunk('table/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/table/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/table/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postTable = createAsyncThunk(
  'table/post',
  async (table: POST_ITEM) => {
    const uploadData = new FormData();
    const name = table.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', table.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/table/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/table/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateTable = createAsyncThunk(
  'table/put',
  async (table: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = table.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', table.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/table/${table.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/table/${table.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getChair = createAsyncThunk('chair/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/chair/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/chair/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postChair = createAsyncThunk(
  'chair/post',
  async (chair: POST_ITEM) => {
    const uploadData = new FormData();
    const name = chair.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', chair.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/chair/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/chair/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateChair = createAsyncThunk(
  'chair/put',
  async (chair: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = chair.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', chair.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/chair/${chair.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/chair/${chair.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getOther = createAsyncThunk('other/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/other/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/other/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postOther = createAsyncThunk(
  'other/post',
  async (other: POST_ITEM) => {
    const uploadData = new FormData();
    const name = other.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', other.postId);
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/other/`, uploadData, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/other/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateOther = createAsyncThunk(
  'other/put',
  async (other: UPDATE_ITEM) => {
    const uploadData = new FormData();
    const name = other.name.join(',');
    uploadData.append('name', name);
    uploadData.append('postId', other.postId);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/other/${other.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${localStorage.localJWT}`,
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${apiUrl}api/other/${other.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      return res.data;
    }
  }
);

export const getComments = createAsyncThunk('comment/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(apiUrlComment, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(apiUrlComment, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const postComment = createAsyncThunk(
  'comment/post',
  async (comment: POST_COMMENT) => {
    if (localStorage.localJWT) {
      const res = await axios.post(apiUrlComment, comment, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(apiUrlComment, comment, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    isToggleDrawer(state) {
      state.isDrawer = !state.isDrawer;
    },
    isOpenModal(state) {
      state.isOpen = true;
    },
    isCloseModal(state) {
      state.isOpen = false;
    },
    isOpenEditModal(state) {
      state.isEditOpen = true;
    },
    isCloseEditModal(state) {
      state.isEditOpen = false;
    },
    isOpenDeleteModal(state) {
      state.isDeleteOpen = true;
    },
    isCloseDeleteModal(state) {
      state.isDeleteOpen = false;
    },
    isLoadingPostStart(state) {
      state.isLoadingPost = true;
    },
    isLoadingPostEnd(state) {
      state.isLoadingPost = false;
    },
    isMonitorPost(state) {
      state.isMonitor = true;
    },
    isComputerPost(state) {
      state.isComputer = true;
    },
    isKeyboardPost(state) {
      state.isKeyboard = true;
    },
    isMousePost(state) {
      state.isMouse = true;
    },
    isSpeakerPost(state) {
      state.isSpeaker = true;
    },
    isTablePost(state) {
      state.isTable = true;
    },
    isChairPost(state) {
      state.isChair = true;
    },
    isOtherPost(state) {
      state.isOther = true;
    },
    editBody(state, action) {
      state.post[0].body = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      return {
        ...state,
        posts: action.payload,
      };
    });
    builder.addCase(getMyPost.fulfilled, (state, action) => {
      return {
        ...state,
        post: action.payload,
      };
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      return {
        ...state,
        post: [...state.post, action.payload],
      };
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.post = state.post.map((po) =>
        po.id === action.payload.id ? action.payload : po
      );
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.post = state.post.filter((po) => po.id !== action.payload);
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
    builder.addCase(postComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(getImage.fulfilled, (state, action) => {
      return {
        ...state,
        img: action.payload,
      };
    });
    builder.addCase(postImage.fulfilled, (state, action) => {
      return {
        ...state,
        img: [...state.img, action.payload],
      };
    });
    builder.addCase(updateImage.fulfilled, (state, action) => {
      state.img = state.img.map((img) =>
        img.id === action.payload.id ? action.payload : img
      );
    });
    builder.addCase(getMonitor.fulfilled, (state, action) => {
      return {
        ...state,
        monitor: action.payload,
      };
    });
    builder.addCase(postMonitor.fulfilled, (state, action) => {
      return {
        ...state,
        monitor: [...state.monitor, action.payload],
      };
    });
    builder.addCase(updateMonitor.fulfilled, (state, action) => {
      state.monitor = state.monitor.map((monitor) =>
        monitor.id === action.payload.id ? action.payload : monitor
      );
    });
    builder.addCase(getComputer.fulfilled, (state, action) => {
      return {
        ...state,
        computer: action.payload,
      };
    });
    builder.addCase(postComputer.fulfilled, (state, action) => {
      return {
        ...state,
        computer: [...state.computer, action.payload],
      };
    });
    builder.addCase(updateComputer.fulfilled, (state, action) => {
      state.computer = state.computer.map((computer) =>
        computer.id === action.payload.id ? action.payload : computer
      );
    });
    builder.addCase(getKeyboard.fulfilled, (state, action) => {
      return {
        ...state,
        keyboard: action.payload,
      };
    });
    builder.addCase(postKeyboard.fulfilled, (state, action) => {
      return {
        ...state,
        keyboard: [...state.keyboard, action.payload],
      };
    });
    builder.addCase(updateKeyboard.fulfilled, (state, action) => {
      state.keyboard = state.keyboard.map((keyboard) =>
        keyboard.id === action.payload.id ? action.payload : keyboard
      );
    });
    builder.addCase(getMouse.fulfilled, (state, action) => {
      return {
        ...state,
        mouse: action.payload,
      };
    });
    builder.addCase(postMouse.fulfilled, (state, action) => {
      return {
        ...state,
        mouse: [...state.mouse, action.payload],
      };
    });
    builder.addCase(updateMouse.fulfilled, (state, action) => {
      state.mouse = state.mouse.map((mouse) =>
        mouse.id === action.payload.id ? action.payload : mouse
      );
    });
    builder.addCase(getSpeaker.fulfilled, (state, action) => {
      return {
        ...state,
        speaker: action.payload,
      };
    });
    builder.addCase(postSpeaker.fulfilled, (state, action) => {
      return {
        ...state,
        speaker: [...state.speaker, action.payload],
      };
    });
    builder.addCase(updateSpeaker.fulfilled, (state, action) => {
      state.speaker = state.speaker.map((speaker) =>
        speaker.id === action.payload.id ? action.payload : speaker
      );
    });
    builder.addCase(getTable.fulfilled, (state, action) => {
      return {
        ...state,
        table: action.payload,
      };
    });
    builder.addCase(postTable.fulfilled, (state, action) => {
      return {
        ...state,
        table: [...state.table, action.payload],
      };
    });
    builder.addCase(updateTable.fulfilled, (state, action) => {
      state.table = state.table.map((table) =>
        table.id === action.payload.id ? action.payload : table
      );
    });
    builder.addCase(getChair.fulfilled, (state, action) => {
      return {
        ...state,
        chair: action.payload,
      };
    });
    builder.addCase(postChair.fulfilled, (state, action) => {
      return {
        ...state,
        chair: [...state.chair, action.payload],
      };
    });
    builder.addCase(updateChair.fulfilled, (state, action) => {
      state.chair = state.chair.map((chair) =>
        chair.id === action.payload.id ? action.payload : chair
      );
    });
    builder.addCase(getOther.fulfilled, (state, action) => {
      return {
        ...state,
        other: action.payload,
      };
    });
    builder.addCase(postOther.fulfilled, (state, action) => {
      return {
        ...state,
        other: [...state.other, action.payload],
      };
    });
    builder.addCase(updateOther.fulfilled, (state, action) => {
      state.other = state.other.map((other) =>
        other.id === action.payload.id ? action.payload : other
      );
    });
    builder.addCase(patchLiked.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    });
    builder.addCase(patchBookmark.fulfilled, (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      };
    });
  },
});

export const {
  isToggleDrawer,
  isLoadingPostStart,
  isLoadingPostEnd,
  isOpenModal,
  isCloseModal,
  isOpenEditModal,
  isCloseEditModal,
  isOpenDeleteModal,
  isCloseDeleteModal,
  isMonitorPost,
  isComputerPost,
  isKeyboardPost,
  isMousePost,
  isSpeakerPost,
  isTablePost,
  isChairPost,
  isOtherPost,
  editBody,
} = postSlice.actions;

export const selectIsOpen = (state: RootState) => state.post.isOpen;
export const selectIsEditOpen = (state: RootState) => state.post.isEditOpen;
export const selectIsDeleteOpen = (state: RootState) => state.post.isDeleteOpen;
export const selectIsDrawerOpen = (state: RootState) => state.post.isDrawer;
export const selectIsMonitor = (state: RootState) => state.post.isMonitor;
export const selectIsComputer = (state: RootState) => state.post.isComputer;
export const selectIsKeyboard = (state: RootState) => state.post.isKeyboard;
export const selectIsMouse = (state: RootState) => state.post.isMouse;
export const selectIsSpeaker = (state: RootState) => state.post.isSpeaker;
export const selectIsTable = (state: RootState) => state.post.isTable;
export const selectIsChair = (state: RootState) => state.post.isChair;
export const selectIsOther = (state: RootState) => state.post.isOther;
export const selectIsLoadingPost = (state: RootState) =>
  state.post.isLoadingPost;
export const selectPost = (state: RootState) => state.post.post;
export const selectPosts = (state: RootState) => state.post.posts;
export const selectComments = (state: RootState) => state.post.comments;
export const selectImage = (state: RootState) => state.post.img;
export const selectMonitor = (state: RootState) => state.post.monitor;
export const selectPc = (state: RootState) => state.post.computer;
export const selectKeyboard = (state: RootState) => state.post.keyboard;
export const selectMouse = (state: RootState) => state.post.mouse;
export const selectSpaker = (state: RootState) => state.post.speaker;
export const selectTable = (state: RootState) => state.post.table;
export const selectChair = (state: RootState) => state.post.chair;
export const selectOther = (state: RootState) => state.post.other;

export default postSlice.reducer;
