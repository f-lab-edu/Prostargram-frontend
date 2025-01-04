declare module Feed {
  interface Common {
    postId: number;
    userId: number;
    content: string;
    hashTagNames: string[];
    postType: 'BASIC' | 'DEBATE' | 'POLL';
    likeCount: number;
    commentCount: number;
    createdAt: string;
    isLike: boolean;
    isFollow: boolean;
  }

  type DetailOption = {
    optionId: number;
    optionContent: string;
    voteCount: number;
  };

  interface BasicPost extends Feed.Common {
    contentImageUrls: string[];
    preSignedImageUrls?: string;
  }

  interface DebatePost extends Feed.Common {
    options: DetailOption[];
    selectedOptionId?: number;
  }

  interface PollPost extends Feed.Common {
    options: DetailOption[];
    selectedOptionId?: number;
    startDate: string;
    endDate: string;
  }

  interface BasicUser {
    userId: number;
    userName: string;
    profileImgUrl: string;
  }

  interface FeedData {
    post: BasicPost | DebatePost | PollPost;
    basicUser: BasicUser;
  }

  interface FeedsResponse {
    data: FeedData[];
    hasNextPage: boolean;
  }

  interface BasicPostRequestBody {
    content: string;
    hashTagNames: string[];
    imageCount: number;
  }

  interface BasicPostResponse {
    commentCount: number;
    content: string;
    contentImageUrls: string[];
    createdAt?: string;
    hashTagNames?: string[];
    isFollow: boolean;
    isLike: boolean;
    likeCount: number;
    postId: number;
    postType: string;
    preSignedImageUrls: string[];
    userId: number;
  }
}
