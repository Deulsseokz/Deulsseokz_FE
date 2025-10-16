import { toastConfig } from '@/components/common/Toast/ToastWrapper';
import notifee, { AndroidImportance } from '@notifee/react-native';
import analytics from '@react-native-firebase/analytics';
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { SplashScreenController } from '../components/auth/splash';
import { useAuthenticationStore } from '../store/useAuthenticationStore';

SplashScreen.preventAutoHideAsync();

// @description 앱이 백그라운드나 종료된 상태에서 메시지를 받았을 때 실행되는 함수
setBackgroundMessageHandler(getMessaging(), async remoteMessage => {
  const { isAuthenticated } = useAuthenticationStore.getState();
  if (!isAuthenticated) {
    return;
  }
  console.log('Background message received:', remoteMessage);
  // 푸시 알림 표시
  // 푸시 알림 표시
});

export default function Root() {
  async function createNotificationChannel() {
    await notifee.createChannel({
      id: 'default', // 앞으로 사용할 채널의 ID
      name: 'Default Channel', // 사용자가 설정에서 볼 채널 이름
      importance: AndroidImportance.HIGH,
    });
  }
  useEffect(() => {
    createNotificationChannel();
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '711444441700-kvqpr2rvkmb0c80dfbrrer4tlto31j15.apps.googleusercontent.com',
      webClientId: '711444441700-uce88ggmppo1t9f3e04a0jd02ueqh71a.apps.googleusercontent.com',
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SplashScreenController />
      <RootNavigator />
      <Toast config={toastConfig} topOffset={75} />
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { isAuthenticated, checkAuthStatus } = useAuthenticationStore();
  const pathname = usePathname();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // 화면 전환 시마다 화면 이름을 Firebase Analytics에 기록
  useEffect(() => {
    const logScreenView = async () => {
      if (pathname) {
        await analytics().logEvent('screen_view', {
          screen_name: pathname,
          screen_class: pathname,
        });
      }
    };

    logScreenView();
  }, [pathname]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
    </Stack>
  );
}
