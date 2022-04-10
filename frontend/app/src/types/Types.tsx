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
