import { MyFriendListResponse } from '@/api/type';
import { PrimaryButton } from '@/components/common/Button/PrimaryButton';
import { SheetStep } from '@/components/map/_type';
import { StepButtonMap } from '@/components/map/_util';
import ChallengeCondition from '@/components/map/ChallengeCondition';
import ChallengeFriends from '@/components/map/ChallengeFriends';
import ChallengeInfo from '@/components/map/ChallengeInfo';
import FriendListSheet from '@/components/map/FriendListSheet';
import FriendSelector from '@/components/map/FriendSelector';
import SheetHeader from '@/components/map/SheetHeader';
import WithWhomSelector from '@/components/map/WithWhomSelector';
import { ButtonVariant } from '@/constants/buttonTypes';
import { useStepManager } from '@/hooks/useStepManager';
import { ChallengeInformation } from '@/types/challenge';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomSheetProps {
  visible: boolean; // 시트가 열려있는지
  exitSheet: () => void; // 모달 나가기 처리
  /* 모달 내 버튼 클릭시 다음 스텝으로 넘어감 처리 */
  challengeInfo: ChallengeInformation; // 챌린지 정보 객체
  allFriends: MyFriendListResponse[]; // 전체 친구 목록
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type BottomSheetState = 'MAIN' | 'FRIEND_LIST' | null;

export default function BottomSheetTemplate({ visible, exitSheet, challengeInfo, allFriends }: BottomSheetProps) {
  const { step, stepPayloads, updateValue, backStep, nextStep, resetStep } = useStepManager();
  const [activeSheet, setActiveSheet] = useState<BottomSheetState>('MAIN');

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const insets = useSafeAreaInsets();
  const sheetHeight = SCREEN_HEIGHT * 0.5;
  const router = useRouter();
  
  console.log(challengeInfo);

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
            {challengeInfo.isChallenged && <ChallengeFriends friends={allFriends.filter(friend => challengeInfo.friends?.includes(friend.userId))} />}
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
            selected={stepPayloads[SheetStep.SELECT_FRIEND] ?? []}
            updateValue={v => updateValue(SheetStep.SELECT_FRIEND, v)}
            onShowFriendListSheet={() => setActiveSheet('FRIEND_LIST')}
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

  // getKind 함수를 통해 버튼의 status를 동적으로 결정할 수 있도록 한다.
  const { text, getVariant } = StepButtonMap[step];

  if (!visible || !challengeInfo) return null;

  return (
    <>
      <Modal visible={visible} transparent={true} onRequestClose={exitSheet} animationType="fade">
        <Pressable style={styles.overlay} onPress={exitSheet} />
        {activeSheet === 'MAIN' && (
          <Animated.View
            style={[
              styles.sheet,
              {
                height: sheetHeight + (Platform.OS === 'ios' ? insets.bottom : 0),
                paddingBottom: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
                transform: [{ translateY }],
              },
            ]}
          >
            {/* 상단 영역 */}
            <View style={styles.contentContainer}>
              {/* step에 따른 헤더*/}
              <SheetHeader
                placeName={challengeInfo.placeName}
                isFavorite={challengeInfo.isFavorite}
                backStep={backStep}
                exitSheet={exitSheet}
                step={step}
              />
              {renderStepContent()}
              {/* TODO: 친구 객체를 한꺼번에 받아 렌더링 */}
              {challengeInfo.isChallenged && challengeInfo.friends?.length !== 0 && (
                <ChallengeFriends
                  friends={allFriends.filter(friend => challengeInfo.friends?.includes(friend.userId))}
                />
              )}
            </View>

            {/* 하단 버튼 영역 */}

            <View style={styles.btnContainer}>
              {challengeInfo.isChallenged ? (
                <PrimaryButton
                  variant={ButtonVariant.Primary}
                  text={'사진 보기'}
                  onPress={() => router.push(`/album/${challengeInfo.placeName}`)}
                />
              ) : (
                <PrimaryButton
                  variant={getVariant(stepPayloads)}
                  text={text}
                  onPress={() => nextStep(challengeInfo, stepPayloads)}
                />
              )}
            </View>
          </Animated.View>
        )}
        {activeSheet === 'FRIEND_LIST' && (
          <FriendListSheet
            visible={activeSheet === 'FRIEND_LIST'}
            onClose={() => setActiveSheet('MAIN')}
            allFriends={allFriends}
            selectedFriends={stepPayloads[SheetStep.SELECT_FRIEND] ?? []}
            updateSelection={newSelection => {
              updateValue(SheetStep.SELECT_FRIEND, newSelection);
            }}
          />
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
