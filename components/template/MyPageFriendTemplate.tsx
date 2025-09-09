import IconMore from '@/assets/icons/icon-more.svg';
import Dropdown from '@/components/common/Dropdown';
import { TopBar } from '@/components/common/TopBar';
import FriendsContainer from '@/components/mypage/FriendsContainer';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import { FriendDropdownOptions } from '@/constants/mypage/const';
import { FriendsList } from '@/types/friend';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyPageFriendTemplate({ friends, numOfFriends }: FriendsList) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownClose = () => {
    setIsDropdownVisible(false);
  };

  const handleRightButtonPress = () => {
    setIsDropdownVisible(true);
  };

  return (
    <>
      {isDropdownVisible && <Dropdown visible={true} onClose={handleDropdownClose} options={FriendDropdownOptions} />}
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
