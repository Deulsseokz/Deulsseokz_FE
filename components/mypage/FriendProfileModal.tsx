import { patchCloseFriend } from "@/api/myPageDTO";
import IconCloseBlack from '@/assets/icons/icon-close-black.svg';
import IconDeleteFriend from '@/assets/icons/icon-deleteFriend.svg';
import IconStarEmpty from '@/assets/icons/icon-star-empty.svg';
import IconStarPink from '@/assets/icons/icon-star-pink.svg';
import { MCOLORS } from '@/constants/colors';
import fonts from '@/constants/fonts';
import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FriendProfileModalProps } from './_type';

export default function FriendProfileModal({ isVisible, onClose, data, onDeleteFriend }: FriendProfileModalProps) {
  const [isClose, setIsClose] = useState(data.isClose);

  const handlePatchCloseFriend = () => {
    try {
      if (isClose) {
        patchCloseFriend({ subtract: data.friendId });
      } else {
        patchCloseFriend({ add: data.friendId });
      }
    } catch (error) {
      console.error(error);
    }
    setIsClose(!isClose);
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btn} onPress={onClose}>
              <IconCloseBlack />
            </TouchableOpacity>
            <View style={styles.btnRightContainer}>
              <TouchableOpacity style={styles.btn} onPress={() => onDeleteFriend(data.friendId)}>
                <IconDeleteFriend />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={handlePatchCloseFriend}>
                {isClose ? <IconStarPink /> : <IconStarEmpty />}
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{ uri: data.profileImage }} style={styles.profileImage} />
          <Text style={styles.friendName}>{data.friendName}</Text>
          <View style={styles.missionContainer}>
            <View style={styles.missionItem}>
              <Text style={styles.missionTitle}>나와 함께한 미션</Text>
              <Text style={styles.missionCount}>{data.withMe}</Text>
            </View>
            <View style={styles.missionItem}>
              <Text style={styles.missionTitle}>친구가 성공한 미션</Text>
              <Text style={styles.missionCount}>{data.friendSuccess}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 180,
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  btn: {
    width: 28,
    height: 28,
  },
  btnRightContainer: {
    flexDirection: 'row',
    gap: 30,
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginTop: 50,
  },
  friendName: {
    ...fonts.medium17,
    color: MCOLORS.grayscale.gray70,
    marginTop: 15,
  },
  missionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
  missionItem: {
    alignItems: 'center',
    gap: 25,
    paddingHorizontal: 40,
  },
  missionTitle: {
    ...fonts.medium13,
    color: MCOLORS.grayscale.gray50,
  },
  missionCount: {
    ...fonts.bold20,
    color: MCOLORS.grayscale.gray80,
  },
});
