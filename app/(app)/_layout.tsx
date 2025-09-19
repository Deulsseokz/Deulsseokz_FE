import { sendFcmToken } from '@/api/fcmToken';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import notifee, { EventType } from '@notifee/react-native';
import {
  AuthorizationStatus,
  FirebaseMessagingTypes,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  requestPermission,
} from '@react-native-firebase/messaging';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'Pretendard-Regular': require('../../assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-Bold': require('../../assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-SemiBold': require('../../assets/fonts/Pretendard-SemiBold.ttf'),
  });

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

  const handleNotificationNavigation = (notification: FirebaseMessagingTypes.RemoteMessage) => {
    const { attemptId, type } = notification.data as { attemptId: string; type: string };
    if (attemptId && type === 'challenge_result') {
      router.push(`/map/${attemptId}/result`);
    }
  };

  useEffect(() => {
    const unsubscribe = onMessage(getMessaging(), async remoteMessage => {
      console.log('Notification received:', remoteMessage);
      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    onNotificationOpenedApp(getMessaging(), remoteMessage => {
      console.log('Notification opened:', remoteMessage);
      handleNotificationNavigation(remoteMessage);
    });

    // quit 상태도 처리해야 함

    const unSubscribeNotifee = notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log('Notifee background event:', type, detail);
      if (type === EventType.PRESS) {
        handleNotificationNavigation(detail.notification?.data as unknown as FirebaseMessagingTypes.RemoteMessage);
      }
    });

    return () => {
      unsubscribe();
      unSubscribeNotifee();
    };
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ActionSheetProvider>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="test" />
            <Stack.Screen name="map/location" />
            <Stack.Screen name="map/searchArea" />
            <Stack.Screen name="map/searchAreaResult" />
            <Stack.Screen name="map/[id]/index" />
            <Stack.Screen name="map/[id]/result" />
            <Stack.Screen name="album/share/index" />
            <Stack.Screen name="album/share/[id]" />
            <Stack.Screen name="album/[id]/index" />
            <Stack.Screen name="album/[id]/edit" />
            <Stack.Screen name="album/[id]/download" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </ActionSheetProvider>
  );
}
