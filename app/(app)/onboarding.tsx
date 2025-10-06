import { PrimaryButton } from '@/components/common/Button/PrimaryButton';
import AnimatedImage from '@/components/onboarding/AnimatedImage';
import Dot from '@/components/onboarding/Dot';
import OnboardingBg from '@/components/onboarding/OnboardingBg';
import { ButtonVariant } from '@/constants/buttonTypes';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

// 온보딩 데이터
const onboardingData = [
  {
    id: 1,
    title: '각 장소에서 미션을 수행하세요',
    image: require('@/assets/images/onboarding/onboarding_1.png'),
    width: 333,
    height: 309,
  },
  {
    id: 2,
    title: '친구들과 함께 도전하세요',
    image: require('@/assets/images/onboarding/onboarding_2.png'),
    width: 310,
    height: 360,
  },
  {
    id: 3,
    title: '특별한 추억을 만들어보세요',
    image: require('@/assets/images/onboarding/onboarding_3.png'),
    width: 236,
    height: 375,
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeIndex = useSharedValue(0);
  const { setIsNew } = useAuthenticationStore();

  const handleNext = () => {
    if (currentIndex === 2) {
      setIsNew(false);
      router.replace('/(app)/(tabs)');
      return;
    }

    activeIndex.value += 1;
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <View style={styles.container}>
      <OnboardingBg />
      <View style={styles.viewContainer}>
        <View style={styles.paginationBar}>
          {Array.from({ length: 3 }, (_, index) => (
            <Dot key={index} index={index} activeIndex={activeIndex} />
          ))}
        </View>
        <Text style={styles.title}>{onboardingData[currentIndex].title}</Text>
        <View style={styles.animatedContainer}>
          {onboardingData.map((data, index) => (
            <AnimatedImage key={index} data={data} index={index} activeIndex={activeIndex} />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            text={currentIndex === 2 ? '시작하기' : '다음'}
            onPress={handleNext}
            variant={ButtonVariant.Primary}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: '25%',
    alignItems: 'center',
  },
  paginationBar: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 40,
  },
  title: {
    ...fontStyles.bold20,
    color: MCOLORS.grayscale.gray70,
    marginBottom: 80,
  },
  animatedContainer: {
    position: 'relative',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '15%',
  },
});
