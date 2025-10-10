import { ButtonVariant } from '@/constants/buttonTypes';
import { MCOLORS } from '@/constants/colors';
import { ChallengeDetailTemplateProps } from '@/types/challenge';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../common/Button/PrimaryButton';
import Loading from '../common/Loading';
import { TopBar } from '../common/TopBar';
import ChallengeDetailModal from '../map/ChallengeDetailModal';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ChallengeDetailTemplate({
  id,
  image,
  placeName,
  content,
  point,
  condition1,
  condition2,
  condition3,
  friends,
  handleSubmit,
  isLoading,
}: ChallengeDetailTemplateProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={styles.page}>
      <ChallengeDetailModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        placeName={placeName}
        content={content}
        point={Number(point)}
        condition1={condition1}
        condition2={condition2}
        condition3={condition3}
      />
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <Loading />
      </Modal>
      <TopBar
        title={placeName}
        rightButton={<Text style={styles.rightButtonText}>미션 보기</Text>}
        onRightPress={() => setIsModalVisible(true)}
      />
      <View style={styles.container}>
        <Text style={styles.title}>이 사진을 제출할까요?</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            variant={ButtonVariant.Subtle}
            text="다시 찍기"
            onPress={() => {
              router.back();
            }}
          />
          <PrimaryButton variant={ButtonVariant.Primary} text="제출하기" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  rightButtonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: MCOLORS.brand.secondary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '2%',
    paddingTop: '12%',
    paddingHorizontal: '10%',
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#000',
    marginBottom: 24,
    width: '100%',
  },
  imageContainer: {
    width: '90%',
    height: 340,
    backgroundColor: '#000',
  },
  text: {
    marginTop: 65,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: MCOLORS.grayscale.gray50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },
});
