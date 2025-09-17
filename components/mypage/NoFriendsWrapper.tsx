import Empty from '@/assets/images/album/empty.svg';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function NoFriendsWrapper() {
  return (
    <View style={styles.container}>
      <Empty />
      <Text style={styles.text}>등록된 친구가 없습니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  text: {
    ...fontStyles.medium13,
    color: MCOLORS.grayscale.gray30,
  },
});
