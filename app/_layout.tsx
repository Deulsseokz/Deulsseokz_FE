import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { SplashScreenController } from '../components/auth/splash';
import { useAuthenticationStore } from '../store/useAuthenticationStore';

export default function Root() {
  // Set up the auth context and render our layout inside of it.

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId: '711444441700-kvqpr2rvkmb0c80dfbrrer4tlto31j15.apps.googleusercontent.com',
      webClientId: '711444441700-uce88ggmppo1t9f3e04a0jd02ueqh71a.apps.googleusercontent.com',
    });
  }, []);

  return (
    <React.Fragment>
      <SplashScreenController />
      <RootNavigator />
    </React.Fragment>
  );
}

// Separate this into a new component so it can access the SessionProvider context later
function RootNavigator() {
  const { isAuthenticated, checkAuthStatus } = useAuthenticationStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

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
