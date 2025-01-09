interface UserType {
  userId: number;
  profileImgUrl: string;
  userName: string;
  selfIntroduction: string;
  departmentName: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  socialAccounts: {
    iconUrl: string | null;
    socialCountId: number;
    socialAccountUrl: string;
  }[];
  interests: string[];
}

export type { UserType };
