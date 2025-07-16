import { SheetStep, StepParamMap } from '@/components/map/_type';
import BottomSheetTemplate from '@/components/template/map/BottomSheetTemplate';
import MapTemplate from '@/components/template/MapTemplate';
import { CHALLENGE_LOCATIONS } from '@/constants/map/challengeLocations';
import { useUserLocation } from '@/hooks/useUserLocation';
import { ChallengeInformation } from '@/types/challenge';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MountainMapScreen = () => {
  // 위치 정보를 받아올 수 있는 권한 여부 확인 후 위치 설정
  const [location, isLoadingLocation] = useUserLocation();

  // 모달 시트 오픈 설정
  const [open, setOpen] = useState(false);

  // 바텀시트의 step과 param을 관리하는 state
  const [step, setStep] = useState<SheetStep>(SheetStep.INFO);
  const [stepPayloads, updateStepPayloads] = useState<Partial<StepParamMap>>({});
  const [tempStepValue, setTempStepValue] = useState<any>(null); // step별 임시 값

  if (isLoadingLocation) {
    // 스피너 추가
  }

  // data fetch
  const challengeLocationData = CHALLENGE_LOCATIONS;

  // 챌린지 목데이터
  const CHALLENGE_DATA = {
    place: 'N서울타워',
    content: '야경 보기',
    point: 300,
    condition1: '팔짱 끼고 사진 찍기',
    condition2: '팔짱 끼고 사진 찍기',
    condition3: '팔짱 끼고 사진 찍기',
    isFavorite: false,
  } as ChallengeInformation;

  // polygon click event
  const handleClickPolygon = (place: string) => {
    // place 변경시마다 챌린지 정보가 바뀌어야 함.
    setOpen(true);
    // data fetch (챌린지 정보)
  };

  // 전달된 파라미터를 저장하고
  // 다음 step으로 넘긴다
  const nextStep = <S extends SheetStep>(step: S, value?: StepParamMap[S]) => {
    // tempStepValue를 확정하고 저장
    if (value !== undefined) {
      updateStepPayloads(prev => ({
        ...prev,
        [step]: value,
      }));
    }

    if (step === SheetStep.SUBMIT) {
      console.log('최종 데이터', stepPayloads);
      return;
    }

    setStep(prev => (prev + 1) as SheetStep);
    setTempStepValue(null); // 다음 단계 가기 전 임시값 초기화
  };

  // step 초기화
  const exitSheet = () => {
    setOpen(false);
    setStep(0);
  };

  if (!location) {
    return <SafeAreaView className="flex-1 bg-white" />;
  }

  return (
    <SafeAreaView style={styles.contianer}>
      <MapTemplate
        challengeLocationData={challengeLocationData}
        handleClickPolygon={handleClickPolygon}
        userLocation={location}
      />
      <BottomSheetTemplate
        visible={open}
        nextStep={nextStep}
        exitSheet={exitSheet}
        step={step} // 실제 step
        challengeInfo={CHALLENGE_DATA}
        stepPayloads={stepPayloads}
      />
    </SafeAreaView>
  );
};

export default MountainMapScreen;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
});
