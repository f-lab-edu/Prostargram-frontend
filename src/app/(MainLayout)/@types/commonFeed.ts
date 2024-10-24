type CommonFeedStep = '이미지추가' | '게시글작성';
type FeedImage = {
  name: string;
  size: number;
  src: string;
  index: number;
};

type CommonFeedData = {
  images: FeedImage[];
  content: string;
  hashtag: string[];
};

type CommonFeedPopup = 'confirm' | 'publish' | null;

export type { CommonFeedStep, FeedImage, CommonFeedData, CommonFeedPopup };
