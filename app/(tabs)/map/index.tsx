import MapTemplate from '@/components/template/MapTemplate';
import { CHALLENGE_LOCATIONS } from '@/constants/map/challengeLocations';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MountainMapScreen = () => {
  // 위치 정보를 받아올 수 있는 권한 여부 확인 후 위치 설정
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        setLocation(null);
        return <SafeAreaView className="flex-1 bg-white" />;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    })();
  }, []);

  // data fetch
  const challengeLocationData = CHALLENGE_LOCATIONS;

  // polygon click event
  const handleClickPolygon = () => {
    Alert.alert('click');
    // data fetch (챌린지 정보)
    // 바텀 시트 open
  };

  return (
    <MapTemplate
      challengeLocationData={challengeLocationData}
      handleClickPolygon={handleClickPolygon}
      userLocation={location}
    />
  );
};

export default MountainMapScreen;
