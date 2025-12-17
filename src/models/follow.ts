export interface FollowApiItem {
  id: number;
  followerId: number;
  followingId: number;
  followerNickname: string;
  followingNickname: string;
  createdAt: string;
}

export interface FollowUser {
  userId: number;
  nickname: string;
}

export interface FollowListResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: FollowApiItem[];
}
