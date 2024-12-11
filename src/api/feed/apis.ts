import { authInstance } from '../httpRequest';

const getFeeds = (page: number) => {
  const res = authInstance<Feed.FeedsResponse>({
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
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
    },
  });
  return res;
};

// const createCommonFeed = (data: Feed.BasicPostRequestBody) => {
//   const res = authInstance({
//     method: 'post',
//     url: `/posts/basic`,
//     data,
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
//     },
//   });
//   return res;
// };

const likeFeed = (postId: number) => {
  const res = authInstance({
    method: 'post',
    url: `/posts/${postId}/likes`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
    },
  });
  return res;
};

const dislikeFeed = (postId: number) => {
  const res = authInstance({
    method: 'delete',
    url: `/posts/${postId}/likes`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
    },
  });
  return res;
};

const deleteFeed = (postId: number) => {
  const res = authInstance({
    method: 'delete',
    url: `/posts/${postId}`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
    },
  });
  return res;
};

export { getFeeds, getDetailCommonFeed, likeFeed, dislikeFeed, deleteFeed };
