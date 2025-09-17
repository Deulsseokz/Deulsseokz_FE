import IconCopy from '@/assets/icons/icon-copy.svg';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import * as Clipboard from 'expo-clipboard';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LinkContainer() {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('https://www.melog.com/invite/123');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>https://www.melog.com/invite/123</Text>
      <Pressable onPress={copyToClipboard}>
        <IconCopy />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: MCOLORS.brand.third,
    borderRadius: 10,
  },
  text: {
    ...fontStyles.medium9,
    color: MCOLORS.brand.secondary,
    maxWidth: '90%',
  },
});
