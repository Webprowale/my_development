export type IPOST = {
  id: string;
  firstName: string;
  lastName: string;
  caption: string;
  avatar: string;
  commentsCount: string;
  verified: boolean;
  commmentsNum?: number;
  commentsLists?: any;
  share: number;
  bookmark: number;
  createdAt: string;
  likedStatus: boolean;
  likesCount: string;
  views: number;
  images: string[];
  likes: number;
  commentsNum: number;
  diary: boolean;
  comments: ICOMMENT[];
  userinfo: any;
  files: any;
};

export type ICOMMENT = {
  name: string;
  avatar: string;
  text: string;
  commentsNum?: number;
  verified: boolean;
};

