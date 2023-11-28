export type TAuthor = {
  avatar: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  fullName: string;
};

export type TBAuthor = {
  avatar: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  fullName: string;
};

export type TBBusiness = {
  adminPassword: string | null;
  category: TCategory[];
  cover: string;
  creator: TBBusinessUser;
  description: string;
  email: string;
  id: number;
  logo: string;
  place: string;
  slug: string;
  title: string;
};

export type TBBusinessUser = {
  avatar: string;
  countFollowers: number;
  countFollowing: number;
  firstname: string;
  id: number;
  lastname: string;
  fullName: string;
};

export type TBComment = {
  author: TBAuthor;
  content: string;
  id: number;
  post: {
    id: number;
    slug: string;
    title: string;
  };
  postId: number;
};

export type TBLinkedinToken = {
  access_token?: string;
  expires_in?: number;
};

export type TBMessage = {
  attachment: string;
  attachmentType: string;
  author: TBAuthor;
  id: number;
  content: string;
  createdAt: string;
  readBy: TBAuthor[];
};

export type TBMessageByUser = {
  id: number;
  object: {
    author: TBAuthor;
    id: number;
    participants: TBAuthor[];
    lastMessage: {
      author: TBAuthor;
      content: string;
      createdAt: string;
    };
  };
  UnreadMessages: number;
};

export type TBNotification = {
  content: string;
  createdAt: string;
  id: number;
  idType: number;
  seen: boolean;
  sender: TBUser;
  type: string;
  user: TBUser;
};

export type TBPredictSearchUser = {
  avatar: string;
  currentId: number;
  currentUser: {};
  firstname: string;
  followersList: [];
  id: number;
  lastname: string;
  type: string;
};

export type TBSignUpForm = {
  accountType: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: string[];
  zipcode: string;
};

export type TBSubTitle = {
  end_time: string;
  phrase: string;
  start_time: string;
};

export type TBUser = {
  avatar: string;
  biography: string;
  city: string;
  countFollowers: number;
  countFollowing: number;
  country: string;
  cover: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  password: string;
  progress: number;
  video: string;
  zipcode: string;
};

export type TBusiness = {
  adminPassword: string | null;
  category: TCategory[];
  cover: string;
  creator: TBusinessUser;
  description: string;
  email: string;
  id: number;
  logo: string;
  place: string;
  slug: string;
  title: string;
};

export type TBusinessUser = {
  avatar: string;
  countFollowers: number;
  countFollowing: number;
  firstName: string;
  id: number;
  lastName: string;
  fullName: string;
};

export type TBVideo = {
  category: {name: string};
  countComments: number;
  countLikes: number;
  createdAt: string;
  description: string;
  hashtag: string;
  id: number;
  image: string;
  subcategory: {name: string};
  title: string;
  user: TBUser;
  video: string;
};

export type TCategory = {
  id: number;
  name: string;
};

export type TComment = {
  author: TAuthor;
  content: string;
  id: number;
  post: {
    id: number;
    slug: string;
    title: string;
  };
  postId: number;
};

export type TFile = {
  name: string;
  type: string;
  uri: string;
};

export type TFollowUser = {
  id: number;
  avatar: string;
  username: string;
};

export type TLinkedinToken = {
  accessToken?: string;
  expiresIn?: number;
};

export type TMessage = {
  attachment: string;
  attachmentType: string;
  author: TAuthor;
  id: number;
  content: string;
  createdAt: string;
  readBy: TAuthor[];
};

export type TMessageAttachment = {
  name: string;
  type: string;
  uri: string;
};

export type TMessageByUser = {
  id: number;
  object: {
    author: TAuthor;
    id: number;
    participants: TAuthor[];
    lastMessage: {
      author: TAuthor;
      content: string;
      createdAt: string;
    };
  };
  unreadMessages: number;
};

export type TMusic = {
  id: number;
  music: string;
  title: string;
  user?: string;
};

export type TNotification = {
  content: string;
  createdAt: string;
  id: number;
  idType: number;
  seen: boolean;
  sender: TUser;
  type: string;
  user: TUser;
};

export type TPredictSearchBusiness = {
  id: number;
  logo: string;
  title: string;
  type: string;
};

export type TPredictSearchUser = {
  avatar: string;
  currentId: number;
  currentUser: {};
  firstName: string;
  followersList: [];
  id: number;
  lastName: string;
  type: string;
};

export type TPredictSearchVideo = {
  id: number;
  image: string;
  title: string;
  type: string;
};

export type TQuestion = {
  id: number;
  needTranspose: boolean;
  path: string;
  title: string;
};

export type TSignInForm = {
  email: string;
  password: string;
};

export type TSignUpForm = {
  accountType: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles: string[];
  zipCode: string;
};

export type TSubBusiness = {
  cover: string;
  description: string;
  id: number;
  logo: string;
  place: string;
  slug: string;
  title: string;
};

export type TSubCategory = {
  id: number;
  name: string;
};

export type TSubTitle = {
  endTime: string;
  phrase: string;
  startTime: string;
};

export type TSubVideo = {
  id: number;
  needTranspose: boolean;
  path: string;
  title: string;
  transitionImagePath: string;
  transitionMusicPath: string;
  transitionPath: string;
  transposePath: string;
};

export type TTendency = {
  countPosts: number;
  id: number;
  name: string;
  posts: TTendencyPost[];
};

export type TTendencyPost = {
  description: string;
  hashtag: string;
  id: number;
  image: string;
  title: string;
  video: string;
};

export type TTheme = {
  color?: string;
  id?: number;
  image?: string;
  title?: string;
  user?: string;
};

export type TUser = {
  avatar: string;
  biography: string;
  city: string;
  countFollowers: number;
  countFollowing: number;
  country: string;
  cover: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  password: string;
  progress: number;
  video: string;
  zipCode: string;
};

export type TVideo = {
  category: {name: string};
  countComments: number;
  countLikes: number;
  createdAt: string;
  description: string;
  hashTag: string;
  id: number;
  image: string;
  subCategory: {name: string};
  title: string;
  user: TUser;
  video: string;
};
