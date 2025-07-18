import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SheetStep, StepParamMap } from '@/components/map/_type';
import { StepButtonMap } from '@/components/map/_util';
import ChallengeCondition from '@/components/map/ChallengeCondition';
import ChallengeFriends from '@/components/map/ChallengeFriends';
import ChallengeInfo from '@/components/map/ChallengeInfo';
import FriendSelector from '@/components/map/FriendSelector';
import SheetHeader from '@/components/map/SheetHeader';
import WithWhomSelector from '@/components/map/WithWhomSelector';
import { MOCK_FRIENDS } from '@/constants/map/friends';
import { ChallengeInformation } from '@/types/challenge';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  visible: boolean; // 시트가 열려있는지
  /** 선택된 값 변경 감지 */
  updateValue: <S extends SheetStep>(step: S, value?: StepParamMap[S]) => void;
  backStep: () => void; // 모달 내 뒤로가기 처리
  exitSheet: () => void; // 모달 나가기 처리
  /* 모달 내 버튼 클릭시 다음 스텝으로 넘어감 처리 */
  nextStep: (challengeInfo: ChallengeInformation, stepPayloads: Partial<StepParamMap>) => void;
  step: SheetStep; // 모달의 step 관리
  challengeInfo: ChallengeInformation; // 챌린지 정보 객체
  stepPayloads: Partial<StepParamMap>; // 부모가 관리하는 파라미터 값
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BottomSheetTemplate({
  visible,
  updateValue,
  backStep,
  exitSheet,
  step,
  stepPayloads,
  challengeInfo,
  nextStep,
}: BottomSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const insets = useSafeAreaInsets();
  const sheetHeight = SCREEN_HEIGHT * 0.5;

  // 바텀시트 올라오기 애니메이션
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // 각 스텝별 중심 콘텐츠를 렌더합니다.
  const renderStepContent = () => {
    switch (step) {
      case SheetStep.INFO:
        return (
          <View style={{ ...styles.contentContainer, gap: 6 }}>
            <ChallengeInfo {...challengeInfo} />
            <ChallengeCondition {...challengeInfo} />
          </View>
        );
      case SheetStep.WITH_WHOM:
        return (
          <WithWhomSelector
            selected={stepPayloads[SheetStep.WITH_WHOM] ?? undefined}
            updateValue={v => updateValue(SheetStep.WITH_WHOM, v)}
          />
        );
      case SheetStep.SELECT_FRIEND:
        return (
          <FriendSelector
            friends={MOCK_FRIENDS}
            selected={stepPayloads[SheetStep.SELECT_FRIEND] ?? []}
            updateValue={v => updateValue(SheetStep.SELECT_FRIEND, v)}
          />
        );
      case SheetStep.SUBMIT:
        return (
          <View style={{ ...styles.contentContainer, gap: 6 }}>
            <ChallengeInfo {...challengeInfo} />
            <ChallengeCondition {...challengeInfo} />
            <ChallengeFriends friends={stepPayloads[SheetStep.SELECT_FRIEND] ?? []} />
          </View>
        );
    }
  };

  console.log('challengeInfo', challengeInfo);
  console.log('stepPayloads', stepPayloads);
  // getKind 함수를 통해 버튼의 status를 동적으로 결정할 수 있도록 한다.
  const { text, getKind } = StepButtonMap[step];

  if (!visible || !challengeInfo) return null;
  return (
    <View style={styles.container}>
      {/* 바텀 모달뷰 */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetHeight + (Platform.OS === 'ios' ? insets.bottom : 0), // iOS에서 safe area 보정
            paddingBottom: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
            transform: [{ translateY }],
          },
        ]}
      >
        {/* 상단 영역 */}
        <View style={styles.contentContainer}>
          {/* step에 따른 헤더*/}
          <SheetHeader
            place={challengeInfo.place}
            isFavorite={challengeInfo.isFavorite}
            backStep={backStep}
            exitSheet={exitSheet}
            step={step}
          />
          {renderStepContent()}
        </View>

        {/* 하단 버튼 영역 */}
         <View style={styles.btnContainer}>
          {challengeInfo.isChallenged ? <PrimaryButton kind={'normal-dismiss'} text={"점령 완료"} onPress={() => {}} /> : <PrimaryButton
            kind={getKind(stepPayloads)}
            text={text}
            onPress={() => nextStep(challengeInfo, stepPayloads)}
          />}
        </View>
       
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 28,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 43,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
