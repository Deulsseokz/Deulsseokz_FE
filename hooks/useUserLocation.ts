// 위치 권한 요청 및 현재 위치를 가져오는 훅
import { Coord } from '@/types/challenge';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useUserLocation(): [Coord | null, boolean] {
  const [location, setLocation] = useState<Coord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        setLocation(null);
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  return [location, loading];
}
