import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

import { sendFcmToken } from '@/api/fcmToken';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  AuthorizationStatus,
  getMessaging,
  getToken,
  onTokenRefresh,
  requestPermission,
} from '@react-native-firebase/messaging';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const setUpFcm = async () => {
    const messaging = getMessaging();
    if (Platform.OS === 'ios') {
      const authStatus = await requestPermission(messaging);
      const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('Notification permission denied');
        return;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        Alert.alert('알림 권한 설정', '알림 권한을 허용해야만 앱의 기능을 사용할 수 있습니다.');
        return;
      }
    }

    try {
      const token = await getToken(messaging);
      console.log('Token:', token);
      if (token) {
        const response = await sendFcmToken({ 'fcm-token': token });
        console.log('Token sent to server:', response);
      } else {
        console.log('토큰 서버 전송 중 에러 발생');
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }

    // 앱 실행 중에 토큰 갱신 시 서버에 전송
    onTokenRefresh(messaging, token => {
      console.log('Token refreshed:', token);
      sendFcmToken({ 'fcm-token': token });
    });
  };

  useEffect(() => {
    setUpFcm();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].icon,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '지도',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="album"
        options={{
          title: '앨범',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="photo.on.rectangle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          title: '마이페이지',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
