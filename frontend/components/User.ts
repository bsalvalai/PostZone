/* eslint-disable prettier/prettier */
export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  profilePicture?: string | null;
  coverPhoto?: string | null;
  bio?: string | null;
  commentCount?: number;
  gamificationLevel?: number;
  resetPasswordToken?: string | null;
  // eslint-disable-next-line prettier/prettier
  resetPasswordExpires?: Date | null;
  userPosts?: string[];
  favoritePosts?: string[];
  followerUsers?: string[];
  followingUsers?: string[];
}
