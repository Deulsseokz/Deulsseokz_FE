import { BtnKind } from '@/types/btnAttributes';
import { SheetHeaderConfig, SheetStep, StepButtonProps, StepParamMap, WithWhom } from './_type';

// 헤더 설정 매핑
export const StepHeaderMap: Record<SheetStep, SheetHeaderConfig> = {
  [SheetStep.INFO]: { showFavorite: true, showPlace: false, showBackButton: false },
  [SheetStep.WITH_WHOM]: { showFavorite: false, showPlace: true, showBackButton: true },
  [SheetStep.SELECT_FRIEND]: { showFavorite: false, showPlace: true, showBackButton: true },
  [SheetStep.SUBMIT]: { showFavorite: true, showPlace: false, showBackButton: false },
};

// 버튼 상태 및 텍스트 매핑
export const StepButtonMap: Record<SheetStep, StepButtonProps> = {
  [SheetStep.INFO]: {
    text: '다음',
    getKind: (_: Partial<StepParamMap>): BtnKind => 'status-enabled',
  },
  [SheetStep.WITH_WHOM]: {
    text: '다음',
    getKind: (payloads: Partial<StepParamMap>): BtnKind => {
      const val = payloads[SheetStep.WITH_WHOM];
      return val === 'ALONE' || val === 'FRIEND' ? 'status-enabled' : 'status-disabled';
    },
  },
  [SheetStep.SELECT_FRIEND]: {
    text: '다음',
    getKind: (payloads: Partial<StepParamMap>): BtnKind => {
      const selectedFriends = payloads[SheetStep.SELECT_FRIEND];
      return Array.isArray(selectedFriends) && selectedFriends.length > 0 ? 'status-enabled' : 'status-disabled';
    },
  },
  [SheetStep.SUBMIT]: {
    text: '제출하기',
    getKind: (_: Partial<StepParamMap>): BtnKind => 'status-enabled',
  },
};

// 누구와 챌린지를 할지 선택 옵션
export const WITH_WHOM_OPTIONS: WithWhom[] = [
  {
    whom: 'ALONE',
    label: '혼자',
    img: require('@/assets/images/map/options/alone.png'),
  },
  {
    whom: 'FRIEND',
    label: '친구와 함께',
    img: require('@/assets/images/map/options/friends.png'),
  },
];
