import { getInviteLink } from '@/api/myPageDTO';
import IconCopy from '@/assets/icons/icon-copy.svg';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import { showSuccessToast } from '@/utils/toastManager';
import * as Clipboard from 'expo-clipboard';
import { useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function LinkContainer() {
  const [inviteLink, setInviteLink] = useState<string>('');
  useLayoutEffect(() => {
    getInviteLink()
      .then(res => {
        setInviteLink(res.result.url);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(inviteLink);
    showSuccessToast('초대링크를 복사했어요.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{inviteLink}</Text>
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
