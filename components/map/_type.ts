import { BtnKind } from '@/types/btnAttributes';
import { Friend } from '@/types/friend';
import { ImageSourcePropType } from 'react-native';

// 바텀시트의 단계 정의
export enum SheetStep {
  INFO = 0,
  WITH_WHOM = 1,
  SELECT_FRIEND = 2,
  SUBMIT = 3,
}

// 바텀 시트의 각 단계별 입력 데이터 타입 정의
export type StepParamMap = {
  [SheetStep.INFO]: void;
  [SheetStep.WITH_WHOM]: ChallengeWith;
  [SheetStep.SELECT_FRIEND]: Friend[];
  [SheetStep.SUBMIT]: void;
};

// header 렌더링 설정 타입
export interface SheetHeaderConfig {
  showPlace: boolean;
  showFavorite: boolean;
  showBackButton: boolean;
}

// 바텀시트 버튼 렌더링 설정 타입
export type StepButtonProps = {
  text: string;
  getKind: (payloads: Partial<StepParamMap>) => BtnKind;
};

// 2단계(WITHWHOM) 챌린지를 혼자 할지 친구와 할지 결정 타입
export const CHALLENGE_WITH = {
  ALONE: 'alone',
  FRIEND: 'friend',
} as const;

export type ChallengeWith = keyof typeof CHALLENGE_WITH;

// 옵션 선택 UI용 타입
export type WithWhom = {
  whom: ChallengeWith;
  label: string;
  icon: {
    active: ImageSourcePropType;
    inactive: ImageSourcePropType;
  };
};
