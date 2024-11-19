interface UserType {
  userId: number;
  profileUrl: string;
  nickname: string;
  userName: string;
  currentState: string;
  description: string;
  followers: number;
  followings: number;
  feeds: number;
  links: string[];
  interests: string[];
}

export type { UserType };
