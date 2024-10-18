interface UserType {
  profileUrl: string;
  nickname: string;
  currentState: string;
  description: string;
  followers: number;
  followings: number;
  feeds: number;
  links: string[];
  interests: string[];
}

export type { UserType };
