import ChallengeCondition from '@/components/map/ChallengeCondition';
import { MCOLORS } from '@/constants/Colors';
import { ModalType } from '@/enums/modalTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import ModalManager from '../common/Modal/ModalManager';
import { PrimaryButton } from '../common/PrimaryButton';

export default function ChallengeOutputTemplate() {
  // const bgColorArray = isSuccess ? ['#FFF5F7', '#FBB4C4'] : ['#FDFEFF', '#89C2FF'];

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <LinearGradient locations={[0, 1]} colors={['#FFF5F7', '#FBB4C4']} style={styles.page}>
      <ModalManager
        isShowing={isModalVisible}
        modalType={ModalType.DEFAULT}
        modalProps={{
          title: '축하합니다!',
          desc: '200 포인트를 획득했어요',
          buttons: { text: '확인', onPress: () => {} },
          children: (
            <Image
              source={require('@/assets/images/modal/icon-coins.png')}
              style={{ width: 100, height: 100, marginBottom: 20 }}
            />
          ),
        }}
        onClose={() => {}}
      />
      <View style={styles.container}>
        <Text style={styles.title}>미션 성공</Text>
        <ChallengeCondition
          condition1="오늘 챌린지를 완료했어요"
          condition2="오늘 챌린지를 완료했어요"
          condition3="오늘 챌린지를 완료했어요"
        />
        <View style={styles.imageContainer}></View>
        <View style={styles.buttonContainer}>
          <PrimaryButton kind="normal-dismiss" size="default" text="닫기" onPress={() => {}} />
          <PrimaryButton
            kind="normal-selected"
            size="default"
            text="앨범으로"
            onPress={() => setIsModalVisible(true)}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    width: '75%',
    paddingLeft: 25,
    fontWeight: 'bold',
    color: MCOLORS.brand.secondary,
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 20,

    width: '80%',
    height: 340,
    backgroundColor: '#000',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    paddingHorizontal: 50,
  },
});
