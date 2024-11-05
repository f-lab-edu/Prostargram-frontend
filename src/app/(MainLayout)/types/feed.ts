type CommonFeedStep = '이미지추가' | '게시글작성';

type CommonFeedData = {
  images: File[];
  content: string;
  hashtag: string[];
};

type DiscussionFeedData = {
  subject1: string;
  subject2: string;
  content: string;
  hashtag: string[];
};

type Post = {
  postId: number;
  userId: number;
  content: string;
  hashTagNames: string[];
  postType: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isLike: boolean;
  isFollow: boolean;
  contentImageUrls: string;
  preSignedImageUrls: string;
};

type BasicUser = {
  userId: number;
  userName: string;
  profileImgUrl: string;
};

type MainFeed = {
  post: Post;
  basicUser: BasicUser;
};

type FeedPopup = 'confirm' | 'publish' | null;

export type {
  CommonFeedStep,
  CommonFeedData,
  DiscussionFeedData,
  FeedPopup,
  Post,
  BasicUser,
  MainFeed,
};
