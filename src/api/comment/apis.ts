import { authInstance } from '../httpRequest';

const getComments = (postId: number) => {
  const res = authInstance<Comment.CommentResponse>({
    method: 'get',
    url: `/posts/${postId}/comments`,
  });
  return res;
};

const likeComment = (commentId: number) => {
  const res = authInstance({
    method: 'post',
    url: `/comments/${commentId}/likes`,
  });
  return res;
};

const dislikeComment = (commentId: number) => {
  const res = authInstance({
    method: 'delete',
    url: `/comments/${commentId}/likes`,
  });
  return res;
};

const writeComment = (postId: number, data: string) => {
  const res = authInstance({
    method: 'post',
    url: `/posts/${postId}/comments`,
    data,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  return res;
};

const writeReplyComment = (postId: string, parentId: string, data: string) => {
  const res = authInstance({
    method: 'post',
    url: `/posts/${postId}/comments`,
    params: { parentId },
    data,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  return res;
};

export {
  getComments,
  likeComment,
  dislikeComment,
  writeComment,
  writeReplyComment,
};
