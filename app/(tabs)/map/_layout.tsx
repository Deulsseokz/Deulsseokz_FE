import { Stack } from 'expo-router';

export default function MapLayout() {
  // 탭 내부에 전용 Stack 정의
  return <Stack screenOptions={{ headerShown: false }} />;
}
