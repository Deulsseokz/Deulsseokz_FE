import { RegionName } from "@/constants/map/regionMap";
import { ImageSourcePropType } from "react-native";
import { FriendProfileResponse } from '@/api/type';

/**
 * myPage의 라우트 아이템
 */
export type MenuItem = {
  label: string;
  route: string;
  icon : ImageSourcePropType;
};

/**
 * myPage 메인의 버튼 아이템
 */
export type BtnItem = {
  label: string;
};

/**
 * 지역별 정복률 배열 타입
 */
export type RegionConquerRateList = Record<RegionName, number>;

/**
 * 지역 카테고리별 정복 여부 타입
 */
export type ChallengeCompletionStatus = {
  regionName: Record<RegionName, Record<string, boolean>>;
}
 * 친구 프로필 모달 props 타입
 */
export interface FriendProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  data: FriendProfileResponse;
  onDeleteFriend: (id: number) => void;
}