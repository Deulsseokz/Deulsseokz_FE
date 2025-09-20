import BackIcon from '@/assets/icons/icon-back.svg';
import { MCOLORS } from '@/constants/colors';
import fontStyles from "@/constants/fonts";
import { router } from 'expo-router';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopBarProps {
  title: string | null;
  rightButton?: React.ReactNode;
  onRightPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>; // 선택적 최상위 컨테이너 스타일
}

export function TopBar({ title, rightButton, onRightPress, containerStyle }: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }, containerStyle]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <BackIcon width={30} height={30} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {rightButton && (
        <TouchableOpacity style={styles.rightButton} onPress={onRightPress}>
          {rightButton}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: 10,
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    width: '40%',
    textAlign: 'center',
    ...fontStyles.medium15,
  },
  backButton: {
    paddingLeft: 10,
    width: '30%',
  },
  backButtonImage: {
    width: 20,
    height: 20,
  },
  rightButtonText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
    color: MCOLORS.grayscale.gray50,
  },
  rightButton: {
    padding: 10,
    width: '30%',
    alignItems: 'flex-end',
  },
});
