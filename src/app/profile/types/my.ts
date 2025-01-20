interface SocialAccountType {
  iconUrl: string | null;
  socialCountId: number;
  socialAccountUrl: string;
}

interface UserInterestType {
  hashTagId: number;
  hashTagName: string;
}

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type UserInterestWithOptionalHashTagIdType = MakeOptional<
  UserInterestType,
  'hashTagId'
>;

interface UserType {
  userId: number;
  profileImgUrl: string;
  userName: string;
  selfIntroduction: string;
  departmentName: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  socialAccounts: SocialAccountType[];
  interests: UserInterestType[];
}

export type {
  UserType,
  SocialAccountType,
  UserInterestType,
  UserInterestWithOptionalHashTagIdType,
};
