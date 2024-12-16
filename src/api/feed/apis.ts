import { authInstance } from '../httpRequest';

const getFeeds = (page: number) => {
  const res = authInstance<Feed.FeedsResponse>({
    method: 'get',
    url: `/feeds?page=${page}`,
  });
  return res;
};

const getDetailCommonFeed = (postId: string) => {
  const res = authInstance<Feed.FeedData>({
    method: 'get',
    url: `/posts/${postId}/basic-post`,
  });
  return res;
};

const createCommonFeed = (data: Feed.BasicPostRequestBody) => {
  const res = authInstance({
    method: 'post',
    url: `/posts/basic`,
    data,
  });
  return res;
};

const createDebateFeed = (data: Feed.DebatePostRequestBody) => {
  const res = authInstance({
    method: 'post',
    url: `/posts/debate`,
    data,
  });
  return res;
};

const likeFeed = (postId: number) => {
  const res = authInstance({
    method: 'post',
    url: `/posts/${postId}/likes`,
  });
  return res;
};

const dislikeFeed = (postId: number) => {
  const res = authInstance({
    method: 'delete',
    url: `/posts/${postId}/likes`,
  });
  return res;
};

const deleteFeed = (postId: number) => {
  const res = authInstance({
    method: 'delete',
    url: `/posts/${postId}`,
  });
  return res;
};

export {
  getFeeds,
  getDetailCommonFeed,
  createCommonFeed,
  likeFeed,
  dislikeFeed,
  deleteFeed,
  createDebateFeed,
};
