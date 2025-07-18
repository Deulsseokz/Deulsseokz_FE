import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

export default function ChallengeOutputTemplate() {
  return (
    <LinearGradient locations={[0, 1]} colors={['#FFF5F7', '#FBB4C4']} style={styles.page}>
      <View style={styles.container}>
        <Text>챌린지 완료</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
