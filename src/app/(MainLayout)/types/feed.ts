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

type FeedPopup = 'confirm' | 'publish' | null;

interface BasicUserType {
  userId: number;
  userName: string;
  profileImgUrl: string;
}

interface DebateOptionType {
  optionId: number;
  optionContent: string;
  voteCount: number;
}

interface ReadOnlyFeedType {
  postId: number;
  content: string;
  hashTagNames: string[];
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isLike: boolean;
  isFollow: boolean;
}

interface ReadOnlyCommonFeedType {
  post: {
    postType: 'BASIC';
    contentImageUrls: string[];
  } & ReadOnlyFeedType;
  basicUser: BasicUserType;
}

interface ReadOnlyDebateFeedType {
  post: {
    postType: 'DEBATE';
    options: DebateOptionType[];
    selectedOptionId: number;
  } & ReadOnlyFeedType;
  basicUser: BasicUserType;
}

export type {
  CommonFeedStep,
  CommonFeedData,
  DiscussionFeedData,
  FeedPopup,
  BasicUserType,
  DebateOptionType,
  ReadOnlyCommonFeedType,
  ReadOnlyDebateFeedType,
};
