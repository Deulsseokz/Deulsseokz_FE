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

  // 셀렉터에 의한 값 변경
  const updateValue = <S extends SheetStep>(step: S, value?: StepParamMap[S]) => {
    if (value !== undefined) {
      updateStepPayloads(prev => ({
        ...prev,
        [step]: value,
      }));
    }
  };

  // step 뒤로가기
  const backStep = () => {
    // 해당 step의 데이터는 저장되지 않고 초기화됨
    updateStepPayloads(prev => ({
      ...prev,
      [step]: undefined,
    }));
    setStep(prev => (prev - 1) as SheetStep);
  };

  // 다음 step으로 넘긴다
  const nextStep = () => {
    if (step === SheetStep.SUBMIT) {
      // 촬영버튼 클릭
      return;
    }

    // 혼자 하는 경우 예외적으로 3단계를 건너뜀.
    if (step === SheetStep.WITH_WHOM && stepPayloads[step] == 'ALONE') setStep(prev => (prev + 2) as SheetStep);
    else setStep(prev => (prev + 1) as SheetStep);
  };

  // step 초기화
  const exitSheet = () => {
    updateStepPayloads({}); // 선택된 값들을 초기화
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
        updateValue={updateValue}
        backStep={backStep}
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
