import { NaverMapView } from '@mj-studio/react-native-naver-map';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_CAMERA = {
  latitude: 37.5666102,
  longitude: 126.9783881,
  zoom: 12,
  latitudeDelta: 0.38,
  longitudeDelta: 0.8,
};

const MountainMapScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('권한 상태', status);

      if (status !== 'granted') {
        Alert.alert('위치 권한이 필요합니다.');
        setHasPermission(false);
        return;
      }
      setHasPermission(true);
    })();
  }, []);

  if (hasPermission === false) {
    return <SafeAreaView className="flex-1 bg-white" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NaverMapView style={{ flex: 1 }} initialCamera={INITIAL_CAMERA} />
    </View>
  );
};

export default MountainMapScreen;
