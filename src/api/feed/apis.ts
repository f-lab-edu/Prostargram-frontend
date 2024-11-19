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

export { getFeeds };
