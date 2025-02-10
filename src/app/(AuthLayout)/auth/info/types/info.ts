export type UserInterestType = { id: string; interestName: string };
export type UserSocialAccountType = { id: string; socialAccount: string };
export type UserInterestsType = {
  recommended: UserInterestType[];
  user: UserInterestType[];
};
