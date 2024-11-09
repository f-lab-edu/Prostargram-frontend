declare module Feed {
  interface Common {
    postId: number;
    userId: number;
    content: string;
    hashTagNames: string;
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
    contentImageUrls?: string;
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

  interface FeedsResponse {
    post: BasicPost | DebatePost | PollPost;
    basicUser: BasicUser;
  }
}
