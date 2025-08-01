import { TopBar } from '@/components/common/TopBar';
import { MCOLORS } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function Test() {
  const navigation = useNavigation();
  // 헤더 버튼 설정 (_layout.tsx가 아닌 TopBar를 사용하는 각 페이지에서 정의)
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <TopBar
          title="테스트"
          rightButton={<Text style={styles.rightButton}>미션 보기</Text>}
          onRightPress={() => console.log('미션 보기')}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rightButton: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: MCOLORS.grayscale.gray50,
  },
});
