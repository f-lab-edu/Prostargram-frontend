import { authInstance } from '../httpRequest';

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
  const res = authInstance<FollowingRes[]>({
    method: 'get',
    url: `/users/${userId}/followings`,
  });
  return res;
};

const getFollowerListByUserId = (userId: number) => {
  const res = authInstance<FollowingRes[]>({
    method: 'get',
    url: `/users/${userId}/followers`,
  });
  return res;
};

const getFollowerList = (userId: number) => {
  const res = authInstance<FollowingRes[]>({
    method: 'get',
    url: `/users/${userId}/follows/all`,
  });
  return res;
};

export {
  followUser,
  unfollowUser,
  getFollowingList,
  getFollowerListByUserId,
  getFollowerList,
};
export type { FollowingRes };
