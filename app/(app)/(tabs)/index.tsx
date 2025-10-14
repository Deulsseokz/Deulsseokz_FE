import { fetchChallengeInfo } from '@/api/challengeDTO';
import { getMyFriendsList } from '@/api/myPageDTO';
import { MyFriendListResponse } from '@/api/type';

import LoadingSpinner from "@/components/common/LoadingSpinner";
import SearchLocationBtn from '@/components/map/SearchLocationBtn';
import BottomSheetTemplate from '@/components/template/map/BottomSheetTemplate';
import MapTemplate from '@/components/template/MapTemplate';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { useChallengeListStore } from '@/store/useChallengeListStore';
import { ChallengeInformation, Coord } from '@/types/challenge';
import { convertRawChallengeInfo } from '@/utils/convertRawChallengeData';
import { router, useFocusEffect, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';

const MountainMapScreen = () => {
  const pathname = usePathname();
  // 전역 챌린지 정보
  const { data: parsedChallengeData, fetchData, refetchData, loading } = useChallengeListStore();
  // 바텀시트에 전달되는 챌린지 정보
  const [selectedChallengeInfo, setSelectedChallengeInfo] = useState<ChallengeInformation | null>(null);
  // 유저의 위치 관리
  const [location, isLoadingLocation] = useUserLocation();
  // 모달 시트 종류 관리
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  // fetching 상태 관리
  const [isFetching, setIsFetching] = useState(false);
  const { isNew } = useAuthenticationStore();
  // 모든 친구 목록
  const [allFriends, setAllFriends] = useState<MyFriendListResponse[]>([]);

  // 지역 검색 화면에서 이동한 경우, initialCoord 값을 넣어 카메라 위치 이동 처리
  const { latitude, longitude } = useLocalSearchParams();

  const parsedLat = typeof latitude === 'string' ? parseFloat(latitude) : NaN;
  const parsedLng = typeof longitude === 'string' ? parseFloat(longitude) : NaN;

  const initialCoord: Coord | undefined =
    !isNaN(parsedLat) && !isNaN(parsedLng) ? { latitude: parsedLat, longitude: parsedLng } : undefined;

  // 챌린지 리스트 최초 1회 데이터 fetch
  useEffect(() => {
    fetchData();
  }, []);
  
  // 새로운 유저이면 온보딩 화면으로 이동
  useLayoutEffect(() => {
    if (isNew) {
      router.replace('/onboarding');
    }
  }, [isNew]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          '앱 종료', // 제목
          '정말로 앱을 종료하시겠습니까?', // 내용
          [
            {
              text: '아니오',
              onPress: () => null, // 아무것도 하지 않음
              style: 'cancel',
            },
            {
              text: '예',
              onPress: () => BackHandler.exitApp(), // 앱 종료
            },
          ],
        );
        // Alert를 띄웠으므로 기본 동작(앱 종료)을 막기 위해 true를 반환합니다.
        return true;
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, []),
  );

  useEffect(() => {
    // 부모에서 친구 목록 fetch
    getMyFriendsList().then(res => {
      setAllFriends(res.result);
    });
  }, []);

  useEffect(() => {
    if (sheetOpen) {
      exitSheet();
    }
  }, [pathname]);

  /**
   * 폴리곤 클릭 이벤트 처리 핸들러
   * @description 클릭한 폴리곤의 id, 챌린지 달성 여부를 받아 챌린지 상세 정보를 받아옵니다.
   * @param challengeId
   * @param isChallenged
   */
  const handleClickPolygon = async (challengeId: number, isChallenged: boolean) => {
    try {
      setIsFetching(true);
      const response = await fetchChallengeInfo(challengeId);
      if (response.result.length > 0) {
        const parsedResult = convertRawChallengeInfo(response.result[0], challengeId, isChallenged);
        setSelectedChallengeInfo(parsedResult);
        setSheetOpen(true);
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
    setSelectedChallengeInfo(null);
    setSheetOpen(false);
  };

  if (!location || !parsedChallengeData) {
    return  (
      <View style={styles.container}>
        <LoadingSpinner isVisible={true} isOverlayVisible={false}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchLocationBtn onPress={() => router.push('/map/location')} />
      <MapTemplate
        challengeLocationData={parsedChallengeData}
        handleClickPolygon={handleClickPolygon}
        userLocation={location}
        initialCoord={initialCoord}
        modalOpen={sheetOpen}
      />
      {selectedChallengeInfo && (
        <BottomSheetTemplate
          visible={sheetOpen}
          exitSheet={exitSheet}
          challengeInfo={selectedChallengeInfo}
          allFriends={allFriends}
        />
      )}
    </View>
  );
};

export default MountainMapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
});
