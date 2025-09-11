import { MyFriendListResponse } from '@/api/type';
import { ModalType } from '@/enums/modalTypes';

export type Friend = {
  userId: number;
  userName: string;
  // TODO: 프로필 이미지 추가 필요
};

export interface FriendsList {
  friends: MyFriendListResponse[];
  numOfFriends: number;
  onOpenInviteModal: (type: ModalType, props?: any) => void;
  onCloseInviteModal: () => void;
}
