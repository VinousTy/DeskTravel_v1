export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

export interface AUTH_STATE {
  signIn: boolean;
  isLoadingAuth: boolean;
  isEmail: boolean;
  isNotEmail: boolean;
  category: {
    id: number;
    name: string;
  }[];
  myprofile: {
    id: number;
    name: string;
    user_name: string;
    self_introduction: string;
    category: number;
    userProfile: number;
    created_on: string;
    img: any;
  };
  profiles: {
    id: number;
    name: string;
    user_name: string;
    self_introduction: string;
    category: number;
    userProfile: number;
    created_on: string;
    img: any;
  }[];
}

export interface PROPS_AUTHEN {
  email: string;
  password: string;
}

export interface POST_EMAIL {
  email: string;
}

export interface USER_ID {
  id: number;
}

export interface NEW_PASSWORD {
  password: string;
  token: string | null;
}

export interface PROPS_PROFILE {
  id: number;
  name: string;
  user_name: string;
  self_introduction: string;
  category: number;
  img: File | null;
}

export interface PROPS_NAME {
  name: string;
}

export interface PROPS_PROFILELIST {
  id: number;
  name: string;
  user_name: string;
  self_introduction: string;
  img: any;
}

export interface POST_STATE {
  isDrawer: boolean;
  isOpen: boolean;
  isEditOpen: boolean;
  isDeleteOpen: boolean;
  isMonitor: boolean;
  isComputer: boolean;
  isKeyboard: boolean;
  isMouse: boolean;
  isSpeaker: boolean;
  isTable: boolean;
  isChair: boolean;
  isOther: boolean;
  isLoadingPost: boolean;
  post: {
    id: number;
    body: string;
    userPost: number;
    created_on: string;
    bookmark: number[];
    liked: number[];
  }[];
  posts: {
    id: number;
    body: string;
    userPost: number;
    created_on: string;
    bookmark: number[];
    liked: number[];
  }[];
  img: {
    id: number;
    img: any;
    postId: number;
  }[];
  monitor: {
    id: number;
    name: string;
    postId: number;
  }[];
  computer: {
    id: number;
    name: string;
    postId: number;
  }[];
  keyboard: {
    id: number;
    name: string;
    postId: number;
  }[];
  mouse: {
    id: number;
    name: string;
    postId: number;
  }[];
  speaker: {
    id: number;
    name: string;
    postId: number;
  }[];
  table: {
    id: number;
    name: string;
    postId: number;
  }[];
  chair: {
    id: number;
    name: string;
    postId: number;
  }[];
  other: {
    id: number;
    name: string;
    postId: number;
  }[];
  comments: {
    id: number;
    body: string;
    userComment: number;
    postId: number;
  }[];
}

export interface NEW_POST {
  id: number;
  body: string;
}

export interface POST_BODY {
  body: string;
}

export interface POST_ID {
  id: number;
}

export interface POST_LIKED {
  id: number;
  body: string;
  current: number[];
  current_bookmark: number[];
  new: number;
  new_bookmark: number;
}

export interface POST_BOOKMARK {
  id: number;
  body: string;
  current: number[];
  current_bookmark: number[];
  new: number;
  new_bookmark: number;
}

export interface POST_COMMENT {
  body: string;
  postId: number;
}

export interface POST_IMAGE {
  img: File | null;
  postId: any;
}

export interface UPDATE_IMAGE {
  id: number;
  img: File | null;
  postId: any;
}

export interface POST_ITEM {
  name: string[];
  postId: any;
}

export interface UPDATE_ITEM {
  id: number;
  name: string[];
  postId: any;
}

export interface PROPS_POST_LIST {
  postId: number;
  loginId: number;
  userPost: number;
  body: string;
  liked: number[];
  bookmark: number[];
}

export interface PROPS_POST_DETAIL {
  id: number;
  postId: number;
  loginId: number;
  userPost: number;
  body: string;
  liked: number[];
  bookmark: number[];
}
