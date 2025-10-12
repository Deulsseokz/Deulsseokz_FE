import { deleteMyFriend, getFriendProfile } from '@/api/myPageDTO';
import { FriendProfileResponse } from '@/api/type';
import IconAddFriend from '@/assets/icons/icon-addFriend.svg';
import { TopBar } from '@/components/common/TopBar';
import FriendsContainer from '@/components/mypage/FriendsContainer';
import LinkContainer from '@/components/mypage/LinkContainer';
import { ButtonVariant } from '@/constants/buttonTypes';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import { ModalType } from '@/enums/modalTypes';
import { FriendsList } from '@/types/friend';
import React, { useState } from 'react';
import { Share, StyleSheet, Text, View } from 'react-native';
import FriendProfileModal from '../mypage/FriendProfileModal';

export default function MyPageFriendTemplate({
  friends,
  numOfFriends,
  onOpenInviteModal,
  onCloseInviteModal,
  isProfileVisible,
  setIsProfileVisible,
}: FriendsList) {
  const [friendProfileData, setFriendProfileData] = useState<FriendProfileResponse | null>(null);

  const handleOpenInviteModal = () => {
    onOpenInviteModal(ModalType.DEFAULT, {
      title: '친구 추가',
      desc: '아래의 링크를 복사해 초대할 친구에게 전송하세요',
      options: [
        { variant: ButtonVariant.Subtle, text: '취소', onPress: onCloseInviteModal },
        { variant: ButtonVariant.Primary, text: '공유하기', onPress: shareLink },
      ],
      children: <LinkContainer />,
    });
  };

  const handleOpenFriendProfileModal = async (id: number) => {
    try {
      const res = await getFriendProfile(id);

      setFriendProfileData(res.result);
      setIsProfileVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFriend = async (id: number) => {
    try {
      await deleteMyFriend(id);
      setIsProfileVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const shareLink = async () => {
    try {
      const inviteLink = 'https://www.melog.com/invite/123';
      await Share.share({
        message: `${inviteLink} 초대 링크를 공유합니다.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {friendProfileData && (
        <FriendProfileModal
          isVisible={isProfileVisible}
          onClose={() => setIsProfileVisible(false)}
          data={friendProfileData}
          onDeleteFriend={handleDeleteFriend}
        />
      )}
      <View style={styles.page}>
        <TopBar title="친구 관리" rightButton={<IconAddFriend />} onRightPress={handleOpenInviteModal} />
        <View style={styles.viewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>친구</Text>
            <Text style={styles.count}>{numOfFriends}</Text>
          </View>
          <FriendsContainer friends={friends} onPressProfile={handleOpenFriendProfileModal} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewContainer: {
    padding: '10%',
    backgroundColor: '#fff',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    ...fontStyles.bold15,
    color: MCOLORS.grayscale.gray70,
  },
  count: {
    ...fontStyles.bold15,
    color: MCOLORS.grayscale.gray30,
  },
});
