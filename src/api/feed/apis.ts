import { authInstance, defaultInstance } from '../httpRequest';

const getFeeds = (page: number) => {
  const res = defaultInstance<Feed.FeedsResponse>({
    method: 'get',
    url: `/feeds?page=${page}`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
    },
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

const updateCommonFeed = (data: Feed.BasicPostRequestBody) => {
  const res = authInstance({
    method: 'put',
    url: `/posts/basic`,
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
  updateCommonFeed,
  likeFeed,
  dislikeFeed,
  deleteFeed,
};
