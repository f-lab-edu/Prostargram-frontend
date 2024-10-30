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

export type { CommonFeedStep, CommonFeedData, DiscussionFeedData, FeedPopup };
