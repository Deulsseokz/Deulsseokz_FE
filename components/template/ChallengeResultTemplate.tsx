import { ButtonVariant } from "@/constants/buttonTypes";
import { MCOLORS } from '@/constants/Colors';
import { ModalType } from '@/enums/modalTypes';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../common/Button/PrimaryButton';
import ModalManager from '../common/Modal/ModalManager';
import ConditionCheckBox from '../map/ConditionCheckBox';

export default function ChallengeOutputTemplate({
  isSuccess,
  isSuccessCondition1,
  isSuccessCondition2,
  isSuccessCondition3,
  condition1,
  condition2,
  condition3,
  image,
  id,
}: {
  id: number;
  isSuccess: boolean;
  isSuccessCondition1: boolean;
  isSuccessCondition2: boolean;
  isSuccessCondition3: boolean;
  condition1: string;
  condition2: string;
  condition3: string;
  image: string;
}) {
  const bgColorArray: [string, string] = isSuccess ? ['#FFF5F7', '#FBB4C4'] : ['#FDFEFF', '#89C2FF'];
  const title = isSuccess ? '미션 성공' : '미션 실패';
  const modalProps = isSuccess
    ? {
        title: '축하합니다!',
        desc: '20 포인트를 획득했어요',
        buttons: {
          text: '확인',
          onPress: () => {
            router.replace('/album');
          },
        },
        children: (
          <Image
            source={require('@/assets/images/modal/icon-coins.png')}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
        ),
      }
    : {
        title: '다시 도전해볼까요?',
        desc: '그래도 여기까지 왔는데...',
        children: (
          <Image
            source={require('@/assets/images/modal/icon-tryAgain.png')}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
        ),
        options: [
          {
            text: '닫기',
            onPress: () => {
              router.replace('/(tabs)');
            },
            types: ButtonVariant.Subtle,
          },
          {
            text: '다시 도전',
            onPress: () => {},
            types: ButtonVariant.Primary,
          },
        ],
      };
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <LinearGradient locations={[0, 1]} colors={bgColorArray} style={styles.page}>
      <ModalManager
        isShowing={isModalVisible}
        modalType={ModalType.DEFAULT}
        modalProps={modalProps}
        onClose={() => {}}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <ConditionCheckBox
          condition1={condition1}
          condition2={condition2}
          condition3={condition3}
          isSuccessCondition1={isSuccessCondition1}
          isSuccessCondition2={isSuccessCondition2}
          isSuccessCondition3={isSuccessCondition3}
        />
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            variant={ButtonVariant.Subtle}
            text={isSuccess ? '닫기' : '취소'}
            onPress={() => {
              router.replace('/(tabs)');
            }}
          />
          <PrimaryButton
            variant={ButtonVariant.Primary}
            text={isSuccess ? '앨범으로' : '다시 도전'}
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
