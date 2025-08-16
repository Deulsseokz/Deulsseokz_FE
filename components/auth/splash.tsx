import { SplashScreen } from 'expo-router';
import { useAuthenticationStore } from '../../store/useAuthenticationStore';

export function SplashScreenController() {
  const { isLoading } = useAuthenticationStore();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
