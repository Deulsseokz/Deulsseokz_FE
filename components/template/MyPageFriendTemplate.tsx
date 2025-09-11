import IconMore from '@/assets/icons/icon-more.svg';
import Dropdown from '@/components/common/Dropdown';
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

export default function MyPageFriendTemplate({
  friends,
  numOfFriends,
  onOpenInviteModal,
  onCloseInviteModal,
}: FriendsList) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownClose = () => {
    setIsDropdownVisible(false);
  };

  const handleRightButtonPress = () => {
    setIsDropdownVisible(true);
  };

  const handleOpenInviteModal = () => {
    onOpenInviteModal(ModalType.DEFAULT, {
      title: '친구 추가',
      desc: '아래의 링크를 복사해 초대할 친구에게 보내주세요',
      options: [
        { variant: ButtonVariant.Subtle, text: '취소', onPress: onCloseInviteModal },
        { variant: ButtonVariant.Primary, text: '공유하기', onPress: shareLink },
      ],
      children: <LinkContainer />,
    });
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
      <Dropdown
        visible={isDropdownVisible}
        onClose={handleDropdownClose}
        options={[
          {
            label: '추가하기',
            onPress: handleOpenInviteModal,
          },
          { label: '삭제하기', onPress: () => {} },
        ]}
      />

      <View style={styles.page}>
        <TopBar title="친구 관리" rightButton={<IconMore />} onRightPress={handleRightButtonPress} />
        <View style={styles.viewContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>친구</Text>
            <Text style={styles.count}>{numOfFriends}</Text>
          </View>
          <FriendsContainer friends={friends} />
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
