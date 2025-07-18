import { MCOLORS } from '@/constants/Colors';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Loading from '../common/Loading';
import { PrimaryButton } from '../common/PrimaryButton';
import { TopBar } from '../common/TopBar';
import ChallengeCondition from '../map/ChallengeCondition';
import ChallengeInfo from '../map/ChallengeInfo';

export default function ChallengeInputTemplate() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  console.log(isLoading);

  return (
    <View style={styles.page}>
      <Modal transparent={true} animationType="fade" visible={isModalVisible}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ChallengeInfo place="장소" content="미션 이름" point={100} />
              <ChallengeCondition condition1="챌린지 조건 1" condition2="챌린지 조건 2" condition3="챌린지 조건 3" />
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
        <View style={styles.imageContainer}></View>
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
