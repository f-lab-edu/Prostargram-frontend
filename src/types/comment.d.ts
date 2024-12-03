declare module Comment {
  interface Common {
    commentId: number;
    postId: number;
    userId: number;
    parentId: number;
    content: string;
    createdAt: string;
    likeCount: number;
    childrenCount: number;
    isLike: boolean;
  }

  interface CommentResponse {
    basicUser: Feed.BasicUser;
    comment: Common;
  }
}
