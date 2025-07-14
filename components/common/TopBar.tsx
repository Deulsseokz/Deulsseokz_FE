import BackIcon from '@/assets/icons/icon-edit.svg';
import { MCOLORS } from '@/constants/Colors';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface TopBarProps {
  title: string;
  rightButton?: React.ReactNode;
  onRightPress?: () => void;
}

export function TopBar({ title, rightButton, onRightPress }: TopBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
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

    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    width: '40%',
    textAlign: 'center',
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
