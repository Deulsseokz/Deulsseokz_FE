import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SheetStep, StepParamMap } from '@/components/map/_type';
import { StepButtonMap } from '@/components/map/_util';
import ChallengeCondition from '@/components/map/ChallengeCondition';
import ChallengeInfo from '@/components/map/ChallengeInfo';
import FriendSelector from '@/components/map/FriendSelector';
import SheetHeader from '@/components/map/SheetHeader';
import WithWhomSelector from '@/components/map/WithWhomSelector';
import { ChallengeInformation } from '@/types/challenge';
import { Friend } from '@/types/friend';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  visible: boolean;
  exitSheet: () => void;
  step: SheetStep;
  challengeInfo: ChallengeInformation;
  stepPayloads: Partial<StepParamMap>; // 기존의 stepPayloads 유지
  nextStep: <S extends SheetStep>(step: S, value?: StepParamMap[S]) => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BottomSheetTemplate({
  visible,
  exitSheet,
  step,
  stepPayloads,
  challengeInfo,
  nextStep,
}: BottomSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const insets = useSafeAreaInsets();
  const sheetHeight = SCREEN_HEIGHT * 0.5;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  const MOCK_FRIENDS: Friend[] = [
    { userId: 1, userName: '김철수' },
    { userId: 2, userName: '이영희' },
    { userId: 3, userName: '박민수' },
    { userId: 4, userName: '최지우' },
    { userId: 5, userName: '장하늘' },
    { userId: 1, userName: '김철수' },
    { userId: 2, userName: '이영희' },
    { userId: 3, userName: '박민수' },
    { userId: 4, userName: '최지우' },
    { userId: 5, userName: '장하늘' },
  ];

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
            onChange={v => nextStep(SheetStep.WITH_WHOM, v)}
          />
        );
      case SheetStep.SELECT_FRIEND:
        return (
          <FriendSelector
            friends={MOCK_FRIENDS}
            selected={stepPayloads[SheetStep.SELECT_FRIEND] ?? []}
            onChange={v => nextStep(SheetStep.SELECT_FRIEND, v)}
          />
        );
      case SheetStep.SUBMIT:
        return (
          <>
            <ChallengeInfo {...challengeInfo} />
            <ChallengeCondition {...challengeInfo} />
            {/* <ChallengeFriends friends={stepPayloads[SheetStep.SELECT_FRIEND] ?? []} /> */}
          </>
        );
    }
  };

  const { text, getKind } = StepButtonMap[step];

  console.log(getKind(stepPayloads));
  return (
    <View style={styles.container}>
      <Pressable style={styles.overlay} onPress={exitSheet} />
      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetHeight + (Platform.OS === 'ios' ? insets.bottom : 0), // iOS에서 safe area 보정
            paddingBottom: 30 + (Platform.OS === 'ios' ? insets.bottom : 0),
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.contentContainer}>
          <SheetHeader
            place={challengeInfo.place}
            isFavorite={challengeInfo.isFavorite}
            exitSheet={exitSheet}
            step={step}
          />
          {renderStepContent()}
        </View>

        <View style={styles.btnContainer}>
          <PrimaryButton kind={getKind(stepPayloads)} text={text} onPress={() => nextStep(step)} />
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 43,
    paddingBottom: 30,
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
