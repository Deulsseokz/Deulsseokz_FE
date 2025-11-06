import { sendFcmToken } from '@/api/fcmToken';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import notifee, { EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AuthorizationStatus,
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
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
        Alert.alert('알림 권한 설정', '알림 권한을 허용해야만 앱의 주요 기능을 사용할 수 있습니다.');
        return;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission granted');
      } else {
        Alert.alert('알림 권한 설정', '알림 권한을 허용해야만 앱의 주요 기능을 사용할 수 있습니다.');
        return;
      }
    }

    try {
      const token = await getToken(messaging);
      if (token) {
        await sendFcmToken({ 'fcm-token': token });
      } else {
        console.log('토큰 서버 전송 중 에러 발생');
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }

    // 앱 실행 중에 토큰 갱신 시 서버에 전송
    // onTokenRefresh(messaging, token => {
    //   console.log('Token refreshed:', token);
    //   sendFcmToken({ 'fcm-token': token });
    // });
  };

  // android location persmission 요청
  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "위치 정보 권한 요청",
  //         message: "앱에서 사용자의 위치 정보에 접근하려고 합니다.",
  //         buttonNeutral: "나중에 다시 확인",
  //         buttonNegative: "거부",
  //         buttonPositive: "허용"
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("위치 정보 접근 권한이 허용되었습니다.");
  //     } else {
  //       console.log("위치 정보 접근 권한이 거부되었습니다.");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }}
  //   requestLocationPermission();
  // }, []);

  const handleNotificationNavigation = async (data: { attemptId: string; type: string } | undefined) => {
    if (data) {
      const { attemptId, type } = data;
      if (attemptId && type === 'challenge_result') {
        try {
          const placeName = await AsyncStorage.getItem('placeName');
          const condition1 = await AsyncStorage.getItem('condition1');
          const condition2 = await AsyncStorage.getItem('condition2');
          const condition3 = await AsyncStorage.getItem('condition3');
          const point = await AsyncStorage.getItem('point');
          const image = await AsyncStorage.getItem('image');

          router.push({
            pathname: '/map/[id]/result',
            params: {
              id: attemptId,
              placeName: placeName,
              condition1: condition1,
              condition2: condition2,
              condition3: condition3,
              point: point,
              image: image,
            },
          });
        } catch (error) {
          console.error('Error navigating to challenge result:', error);
        }
      }
    }
  };

  useEffect(() => {
    setUpFcm();

    const unsubscribeOnMessage = onMessage(getMessaging(), async remoteMessage => {
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

    const unsubscribeNotificationOpenedApp = onNotificationOpenedApp(getMessaging(), remoteMessage => {
      console.log('Notification opened:', remoteMessage);
      handleNotificationNavigation(remoteMessage.data as { attemptId: string; type: string });
    });

    getInitialNotification(getMessaging()).then(remoteMessage => {
      console.log('Initial notification:', remoteMessage);
      handleNotificationNavigation(remoteMessage?.data as { attemptId: string; type: string });
    });

    const unSubscribeNotifee = notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log('Notifee background event:', type, detail);
      if (type === EventType.PRESS) {
        handleNotificationNavigation(detail.notification?.data as unknown as { attemptId: string; type: string });
      }
    });

    return () => {
      unsubscribeOnMessage();
      unsubscribeNotificationOpenedApp();
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
            <Stack.Screen name="onboarding" />
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
