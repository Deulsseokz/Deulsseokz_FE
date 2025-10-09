import { ChallengeDetailModalProps } from '@/types/challenge';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import ChallengeCondition from './ChallengeCondition';
import ChallengeInfo from './ChallengeInfo';

export default function ChallengeDetailModal({
  isModalVisible,
  setIsModalVisible,
  placeName,
  content,
  point,
  condition1,
  condition2,
  condition3,
}: ChallengeDetailModalProps) {
  return (
    <Modal transparent={true} animationType="fade" visible={isModalVisible}>
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ChallengeInfo placeName={placeName} content={content} point={Number(point)} />
            <ChallengeCondition condition1={condition1} condition2={condition2} condition3={condition3} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 120,
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
  },
});
