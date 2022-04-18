import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import {
  AUTH_STATE,
  NEW_PASSWORD,
  POST_EMAIL,
  PROPS_AUTHEN,
  PROPS_NAME,
  PROPS_PROFILE,
  USER_ID,
} from '../../types/Types';

const apiUrl = process.env.REACT_APP_DEV_API_URL;
const drfClientId = process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;

const initialState: AUTH_STATE = {
  signIn: false,
  isLoadingAuth: false,
  isEmail: false,
  isNotEmail: false,
  category: [
    {
      id: 0,
      name: '',
    },
  ],
  myprofile: {
    id: 0,
    name: '',
    user_name: '',
    self_introduction: '',
    category: 0,
    userProfile: 0,
    created_on: '',
    img: '',
  },
  profiles: [
    {
      id: 0,
      name: '',
      user_name: '',
      self_introduction: '',
      userProfile: 0,
      category: 0,
      created_on: '',
      img: '',
    },
  ],
};

export const loginEmail = createAsyncThunk(
  'auth/post',
  async (authen: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}authen/jwt/create`, authen, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
);

export const postEmail = createAsyncThunk(
  'auth/email',
  async (email: POST_EMAIL) => {
    const res = await axios.post(`${apiUrl}password/reset/`, email, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
);

export const newPassword = createAsyncThunk(
  'new/password',
  async (password: NEW_PASSWORD) => {
    const res = await axios.post(`${apiUrl}password/reset/confirm/`, password, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
);

export const registUser = createAsyncThunk(
  'auth/register',
  async (auth: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  'auth/delete',
  async (id: USER_ID) => {
    if (localStorage.localJWT) {
      const res = await axios.delete(`${apiUrl}api/register/${id.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.delete(`${apiUrl}api/register/${id.id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/social',
  async (response: any) => {
    const res = await axios.post(`${apiUrl}auth/convert-token`, {
      token: response.accessToken,
      backend: 'google-oauth2',
      grant_type: 'convert_token',
      client_id: drfClientId,
      client_secret: drfClientSecret,
    });
    return res.data;
  }
);

export const createProfile = createAsyncThunk(
  'profile/post',
  async (name: PROPS_NAME) => {
    if (localStorage.localJWT) {
      const res = await axios.post(`${apiUrl}api/profile/`, name, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.post(`${apiUrl}api/profile/`, name, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const updateProfile = createAsyncThunk(
  'profile/put',
  async (profile: PROPS_PROFILE) => {
    const uploadData = new FormData();
    uploadData.append('name', profile.name);
    uploadData.append('user_name', profile.user_name);
    uploadData.append('self_introduction', profile.self_introduction);
    uploadData.append('category', String(profile.category));
    profile.img && uploadData.append('img', profile.img, profile.img.name);
    if (localStorage.localJWT) {
      const res = await axios.put(
        `${apiUrl}api/profile/${profile.id}/`,
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
        `${apiUrl}api/profile/${profile.id}/`,
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

export const getMyProfile = createAsyncThunk('profile/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/myprofile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data[0];
  } else {
    const res = await axios.get(`${apiUrl}api/myprofile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data[0];
  }
});

export const getProfiles = createAsyncThunk('profiles/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const searchGetProfiles = createAsyncThunk(
  'search/profile',
  async (name: PROPS_NAME) => {
    if (localStorage.localJWT) {
      const res = await axios.get(`${apiUrl}api/profile/?name=${name.name}`, {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      });
      return res.data;
    } else {
      const res = await axios.get(`${apiUrl}api/profile/?name=${name.name}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      return res.data;
    }
  }
);

export const getCategory = createAsyncThunk('category/get', async () => {
  if (localStorage.localJWT) {
    const res = await axios.get(`${apiUrl}api/category/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  } else {
    const res = await axios.get(`${apiUrl}api/category/`, {
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    return res.data;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isSignIn(state) {
      state.signIn = true;
    },
    isSignOut(state) {
      state.signIn = false;
    },
    isLoadingStart(state) {
      state.isLoadingAuth = true;
    },
    isLoadingEnd(state) {
      state.isLoadingAuth = false;
    },
    editName(state, action) {
      state.myprofile.name = action.payload;
    },
    editUserName(state, action) {
      state.myprofile.user_name = action.payload;
    },
    editSelfIntroduction(state, action) {
      state.myprofile.self_introduction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginEmail.fulfilled, (state, action) => {
      localStorage.setItem('localJWT', action.payload.access);
    });
    builder.addCase(googleLogin.fulfilled, (state, action) => {
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('refresh_token', action.payload.refresh_token);
    });
    builder.addCase(postEmail.fulfilled, (state, action) => {
      state.isEmail = true;
      state.isNotEmail = false;
    });
    builder.addCase(postEmail.rejected, (state, action) => {
      state.isNotEmail = true;
    });
    builder.addCase(createProfile.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(searchGetProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.myprofile = action.payload;
      state.profiles = state.profiles.map((prof) =>
        prof.id === action.payload.id ? action.payload : prof
      );
    });
  },
});

export const {
  isSignIn,
  isSignOut,
  isLoadingStart,
  isLoadingEnd,
  editName,
  editUserName,
  editSelfIntroduction,
} = authSlice.actions;

export const selectIsSignIn = (state: RootState) => state.auth.signIn;
export const selectIsLoadingAuth = (state: RootState) =>
  state.auth.isLoadingAuth;
export const selectIsNotEmail = (state: RootState) => state.auth.isNotEmail;
export const selectIsEmail = (state: RootState) => state.auth.isEmail;
export const selectProfile = (state: RootState) => state.auth.myprofile;
export const selectProfiles = (state: RootState) => state.auth.profiles;
export const selectCategory = (state: RootState) => state.auth.category;

export default authSlice.reducer;
