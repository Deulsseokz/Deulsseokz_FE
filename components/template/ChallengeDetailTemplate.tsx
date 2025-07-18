import { MCOLORS } from '@/constants/Colors';
import { BASE_URL } from '@env';
import axios from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Loading from '../common/Loading';
import { PrimaryButton } from '../common/PrimaryButton';
import { TopBar } from '../common/TopBar';
import ChallengeCondition from '../map/ChallengeCondition';
import ChallengeInfo from '../map/ChallengeInfo';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ChallengeDetailTemplate({
  id,
  image,
  place,
  content,
  point,
  condition1,
  condition2,
  condition3,
  friends,
}: {
  id: number;
  image: string;
  place: string;
  content: string;
  point: string;
  condition1: string;
  condition2: string;
  condition3: string;
  friends: string;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const uriParts = image.split('.');
  const fileType = uriParts[uriParts.length - 1];
  const formData = new FormData();

  formData.append('place', place);
  if (friends) {
    formData.append('friends', JSON.stringify(friends.split(',').map(Number)));
  }
  formData.append('attemptDate', dayjs().tz('Asia/Seoul').format('YYYY-MM-DD'));

  formData.append('attemptImage', {
    uri: image,
    name: `photo.${fileType}`,
    type: `image/jpeg`,
  } as any); // 또는 as unknown as Blob

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/challenge/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res', res.data);
      if (res.status === 200) {
        router.replace({
          pathname: '/map/[id]/result',
          params: {
            id: id,
            image: image,
            condition1: condition1,
            condition2: condition2,
            condition3: condition3,
            point: point,
            isSuccess: String(res.data.result.attemptResult),
            isSuccessCondition1: String(res.data.result.condition1),
            isSuccessCondition2: String(res.data.result.condition2),
            isSuccessCondition3: String(res.data.result.condition3),
          },
        });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log('formData', formData);
  console.log('attemptImage', formData.get('attemptImage'));
  console.log('place', place);
  console.log('dayjs', dayjs().tz('Asia/Seoul').format('YYYY-MM-DD'));

  console.log('isLoading', isLoading);

  return (
    <View style={styles.page}>
      <Modal transparent={true} animationType="fade" visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ChallengeInfo place={place} content={content} point={Number(point)} />
              <ChallengeCondition condition1={condition1} condition2={condition2} condition3={condition3} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal transparent={true} animationType="fade" visible={isLoading}>
        <Loading />
      </Modal>
      <TopBar
        title="챌린지 입력"
        rightButton={<Text style={styles.rightButtonText}>미션 보기</Text>}
        onRightPress={() => setIsModalVisible(true)}
      />
      <View style={styles.container}>
        <Text style={styles.title}>이 사진을 제출할까요?</Text>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
        </View>
        <Text style={styles.text}>도전 횟수 (1/3)</Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton kind="normal-dismiss" text="다시 찍기" onPress={() => {}} />
          <PrimaryButton kind="status-enabled" text="제출하기" onPress={handleSubmit} />
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
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 120,
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    fontFamily: 'Pretendard',
    color: MCOLORS.brand.secondary,
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
    paddingBottom: 20,
    paddingTop: 50,
    paddingHorizontal: 40,
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
    width: '88%',
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
    paddingHorizontal: 30,
    width: '100%',
    marginTop: 40,
  },
});
