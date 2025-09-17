import { FriendProfileResponse } from '@/api/type';

/**
 * myPage의 라우트 아이템
 */
export type MenuItem = {
  label: string;
  route: string;
};

/**
 * myPage 메인의 버튼 아이템
 */
export type BtnItem = {
  label: string;
};

/**
 * 친구 프로필 모달 props 타입
 */
export interface FriendProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: FriendProfileResponse;
  onDeleteFriend: (id: number) => void;
}
