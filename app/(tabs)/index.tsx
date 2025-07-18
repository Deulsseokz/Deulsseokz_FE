import { fetchChallengeInfo } from '@/api/fetchChallengeInfo';
import SearchLocationBtn from '@/components/map/SearchLocationBtn';
import BottomSheetTemplate from '@/components/template/map/BottomSheetTemplate';
import MapTemplate from '@/components/template/MapTemplate';
import { useStepManager } from '@/hooks/useStepManager';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useChallengeListStore } from '@/store/useChallengeListStore';
import { ChallengeInformation, Coord } from '@/types/challenge';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MountainMapScreen = () => {
  // 전역 챌린지 정보
  const { data: parsedChallengeData, fetchOnce, loading } = useChallengeListStore();
  // 바텀시트에 전달되는 챌린지 정보
  const [selectedChallengeInfo, setSelectedChallengeInfo] = useState<ChallengeInformation | null>(null);
  // 유저의 위치 관리
  const [location, isLoadingLocation] = useUserLocation();
  // 모달 시트 오픈 설정
  const [open, setOpen] = useState(false);
  // 바텀시트의 step과 param을 관리하는 state/ 함수들
  const { step, stepPayloads, updateValue, backStep, nextStep, resetStep } = useStepManager();

  // 바텀시트 종료
  const exitSheet = () => {
    resetStep();
    setSelectedChallengeInfo(null);
    setOpen(false); // 모달 닫기
  };

  // 지역 검색 화면에서 이동한 경우, initialCoord 값을 넣어 카메라 위치 이동 처리
  const { latitude, longitude } = useLocalSearchParams();

  const parsedLat = typeof latitude === 'string' ? parseFloat(latitude) : NaN;
  const parsedLng = typeof longitude === 'string' ? parseFloat(longitude) : NaN;

  const initialCoord: Coord | undefined =
    !isNaN(parsedLat) && !isNaN(parsedLng) ? { latitude: parsedLat, longitude: parsedLng } : undefined;

  // 챌린지 리스트 데이터 fetch
  useEffect(() => {
    fetchOnce();
  }, []);

  // 폴리곤 클릭 이벤트 처리 핸들러
  const handleClickPolygon = async (challengeId: number, isChallenged:boolean) => {
    try {
      const data = await fetchChallengeInfo(challengeId);

      // 괄호 제거
      const stripBracket = (text?: string) => (text ? text.replace(/^\[[^\]]+\]\s*/, '') : undefined);

      // 데이터를 타입에 맞게 변환
      const parsedData: ChallengeInformation = {
        ...data[0],
        place: data[0].placeName,
        condition1: stripBracket(data[0].condition1),
        condition2: stripBracket(data[0].condition2),
        condition3: stripBracket(data[0].condition3),
        isChallenged: isChallenged,
      };

      setSelectedChallengeInfo(parsedData as ChallengeInformation);
      setOpen(true); // 모달 오픈
    } catch (error) {
      console.error('Error fetching challenge info:', error);
    }
  };

  if (loading || isLoadingLocation || !location || !parsedChallengeData) {
    return <SafeAreaView className="flex-1 bg-white" />; // 추후 스피너로 대체 & 로딩 상태 한번에 관리.
  }

  return (
    <View style={styles.contianer}>
      <SearchLocationBtn onPress={() => router.push('/map/location')} />
      <MapTemplate
        challengeLocationData={parsedChallengeData}
        handleClickPolygon={handleClickPolygon}
        userLocation={location}
        initialCoord={initialCoord}
        modalOpen={open}
      />
      {/* 오버레이: 바텀시트 외 영역 클릭 감지 */}
      {open && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={exitSheet}
          pointerEvents="box-only" // 핵심!
        />
      )}
      {selectedChallengeInfo && open && (
        <BottomSheetTemplate
          visible={open}
          updateValue={updateValue}
          backStep={backStep}
          nextStep={nextStep}
          exitSheet={exitSheet}
          step={step} // 실제 step
          challengeInfo={selectedChallengeInfo}
          stepPayloads={stepPayloads}
        />
      )}
    </View>
  );
};

export default MountainMapScreen;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    position: 'relative',
  },
});
