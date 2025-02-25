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

const getDetailDebateFeed = (postId: string) => {
  const res = authInstance<Feed.FeedData>({
    method: 'get',
    url: `/posts/${postId}/debate-post`,
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

const updateCommonFeed = (data: Feed.BasicPostRequestBody) => {
  const res = authInstance({
    method: 'put',
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

const postImageController = (imageCount: number, fileType: string) => {
  const res = authInstance({
    method: 'post',
    url: '/images',
    data: {
      imageCount,
      fileType,
    },
  });

  return res;
};

export {
  getFeeds,
  getDetailCommonFeed,
  getDetailDebateFeed,
  createCommonFeed,
  updateCommonFeed,
  createDebateFeed,
  likeFeed,
  dislikeFeed,
  deleteFeed,
  postImageController,
};
