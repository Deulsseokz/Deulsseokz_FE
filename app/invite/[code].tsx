import { postInviteCode } from '@/api/myPageDTO';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

export default function AcceptInviteScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const { isAuthenticated } = useAuthenticationStore.getState(); // 훅 대신 getState 사용

  useEffect(() => {
    if (!code) {
      // 잘못된 링크 처리
      Alert.alert('잘못된 링크', '잘못된 링크입니다.', [{ text: '확인', onPress: () => router.replace('/sign-in') }]);
      return;
    }

    if (isAuthenticated) {
      // 1. 이미 로그인된 사용자인 경우
      accept(code);
    } else {
      // 2. 로그인되지 않은 사용자인 경우
      Alert.alert('로그인 필요', '친구 초대를 수락하려면 로그인이 필요합니다. 로그인 후 다시 링크를 클릭해주세요.', [
        {
          text: '로그인하기',
          onPress: () => router.replace(`/sign-in`),
        },
      ]);
    }
  }, [code, isAuthenticated]);

  const accept = async (code: string) => {
    try {
      const response = await postInviteCode({ code });
      console.log('친구 추가 성공 결과', response);
      Alert.alert('성공!', `친구가 추가되었습니다.`, [
        { text: '확인', onPress: () => router.replace('/mypage/friend') },
      ]);
    } catch (error) {
      console.log('친구 추가 실패 결과', error);
    }
  };

  // 처리 중에는 로딩 인디케이터만 표시
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
