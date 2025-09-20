import { fetchChallengeInfo } from "@/api/challengeDTO";
import { getMyFriendsList } from "@/api/myPageDTO";
import { MyFriendListResponse } from '@/api/type';
import { SheetStep } from '@/components/map/_type';
import FriendListSheet from '@/components/map/FriendListSheet';
import SearchLocationBtn from '@/components/map/SearchLocationBtn';
import BottomSheetTemplate from '@/components/template/map/BottomSheetTemplate';
import MapTemplate from '@/components/template/MapTemplate';
import { useStepManager } from '@/hooks/useStepManager';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useChallengeListStore } from '@/store/useChallengeListStore';
import { ChallengeInformation, Coord } from '@/types/challenge';
import { convertRawChallengeInfo } from "@/utils/convertRawChallengeData";
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MountainMapScreen = () => {
  // 전역 챌린지 정보
  const { data: parsedChallengeData, fetchData, refetchData, loading } = useChallengeListStore();
  // 바텀시트에 전달되는 챌린지 정보
  const [selectedChallengeInfo, setSelectedChallengeInfo] = useState<ChallengeInformation | null>(null);
  // 유저의 위치 관리
  const [location, isLoadingLocation] = useUserLocation();
  // 모달 시트 오픈 설정
  const [open, setOpen] = useState(false);
  // fetching 상태 관리
  const [isFetching, setIsFetching] = useState(false);

  // 친구 관련 상태
   // 친구 목록 시트의 visible 상태 추가
  const [isFriendListSheetVisible, setFriendListSheetVisible] = useState(false);
    // 모든 친구 목록
  const [allFriends, setAllFriends] = useState<MyFriendListResponse[]>([]);

  // 바텀시트의 step과 param을 관리하는 state/ 함수들
  const { step, stepPayloads, updateValue, backStep, nextStep, resetStep } = useStepManager();
  

  // 지역 검색 화면에서 이동한 경우, initialCoord 값을 넣어 카메라 위치 이동 처리
  const { latitude, longitude } = useLocalSearchParams();

  const parsedLat = typeof latitude === 'string' ? parseFloat(latitude) : NaN;
  const parsedLng = typeof longitude === 'string' ? parseFloat(longitude) : NaN;

  const initialCoord: Coord | undefined =
    !isNaN(parsedLat) && !isNaN(parsedLng) ? { latitude: parsedLat, longitude: parsedLng } : undefined;

  // 챌린지 리스트 데이터 fetch
   useFocusEffect(
    useCallback(() => {
      refetchData();

      console.log('refetch challenge data on focus');
    }, [refetchData])
  );

   useEffect(() => {
    // 부모에서 친구 목록 fetch
    getMyFriendsList().then(res => {
      setAllFriends(res.result);
    });
  }, []);

  // 친구 목록 시트 열기 핸들러
  const showFriendListSheet = () => {
    setFriendListSheetVisible(true);
  };

  /**
   * 폴리곤 클릭 이벤트 처리 핸들러
   * @description 클릭한 폴리곤의 id, 챌린지 달성 여부를 받아 챌린지 상세 정보를 받아옵니다.
   * @param challengeId 
   * @param isChallenged 
   */
  const handleClickPolygon = async (challengeId: number, isChallenged:boolean) => {
    try {
      setIsFetching(true); 
      const response = await fetchChallengeInfo(challengeId);
      if (response.result.length > 0) {
        const parsedResult = convertRawChallengeInfo(response.result[0], challengeId, isChallenged);
        setSelectedChallengeInfo(parsedResult);
        setOpen(true); // 모달 오픈
      } else {
        console.warn('No challenge info found for the given ID.');
      }
    } catch (error) {
      console.error('Error fetching challenge info:', error);
    } finally {
      setIsFetching(false);
    }
  };

    // 바텀시트 종료
  const exitSheet = () => {
    resetStep();
    setSelectedChallengeInfo(null);
    setOpen(false); // 모달 닫기
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
          allFriends={allFriends}
          onShowFriendListSheet={showFriendListSheet}
        />
      )}
      {isFriendListSheetVisible && (
        <FriendListSheet
          visible={isFriendListSheetVisible}
          onClose={() => setFriendListSheetVisible(false)}
          allFriends={allFriends}
          selectedFriends={stepPayloads[SheetStep.SELECT_FRIEND] ?? []}
          updateSelection={(newSelection) => {
            // 선택된 친구 목록을 부모의 state에 업데이트
            updateValue(SheetStep.SELECT_FRIEND, newSelection);
        }}
      />)}
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
