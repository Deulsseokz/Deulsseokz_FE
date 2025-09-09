import { MyFriendListResponse } from '@/api/type';

export type Friend = {
  userId: number;
  userName: string;
  // TODO: 프로필 이미지 추가 필요
};

export interface FriendsList {
  friends: MyFriendListResponse[];
  numOfFriends: number;
}
