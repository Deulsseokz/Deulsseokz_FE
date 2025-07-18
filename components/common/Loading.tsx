import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
  return (
    <View style={styles.container}>
      <LottieView source={require('@/assets/lottie/loading.json')} style={styles.lottie} autoPlay loop />
      <Text style={styles.text}>미션 수행 확인 중이에요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 100,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
  },
});
