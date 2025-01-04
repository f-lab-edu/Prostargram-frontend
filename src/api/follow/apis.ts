import { authInstance, defaultInstance } from '../httpRequest';

const followUser = (data: { fromUserId: number; toUserId: number }) => {
  const res = authInstance({
    method: 'post',
    url: `/users/${data.fromUserId}/follows`,
    data,
  });
  return res;
};

const unfollowUser = (data: { fromUserId: number; toUserId: number }) => {
  const res = authInstance({
    method: 'delete',
    url: `/users/${data.fromUserId}/follows`,
    data,
  });
  return res;
};

interface FollowingRes {
  departmentName: string;
  profileImgUrl: string;
  userId: number;
  userName: string;
}

const getFollowingList = (userId: number) => {
  const res = defaultInstance<FollowingRes[]>({
    method: 'get',
    url: `/users/${userId}/followings`,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdHkiOiJOT1JNQUxfVVNFUiIsInRva2VuVHlwZSI6IkFDQ0VTU19UT0tFTiIsInN1YiI6IjEiLCJleHAiOjE3NDI3MTUzMDV9.eFVccnbsYRqpJFzg2rL5LNgsMLoEFPESoj3W4e5bgm2Uzy7-DCjA6hgixDZ8MYgXeV6q7VetKQTab-pH-g0caw',
    },
  });
  return res;
};

export { followUser, unfollowUser, getFollowingList };
