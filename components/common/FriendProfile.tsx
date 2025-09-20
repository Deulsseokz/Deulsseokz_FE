import { MyFriendListResponse } from "@/api/type";
import IconPersonSelected from '@/assets/icons/icon-person-selected.svg';
import IconPerson from '@/assets/icons/icon-person.svg';
import StarIcn from "@/assets/icons/icon-star-lined.svg";
import { MCOLORS } from '@/constants/colors';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// FriendProfile의 재사용성을 위해 도입한 프로필 사진+이름 컴포넌트
interface FriendProfileProps {
  friend: MyFriendListResponse;
  isSelected: boolean;
  onSelect?: (id: number) => void;
}

function FriendProfile({ friend, isSelected, onSelect }: FriendProfileProps) {
  const containerStyle = [
    style.profileImgContainer,
    isSelected && style.selected,
  ]
  const textStyle = [
    style.name,
    isSelected && { color: MCOLORS.brand.secondary }
  ]

  const Icon = isSelected ? IconPersonSelected : IconPerson;
  const onPress = onSelect ? onSelect : () => {};

  return (
    <TouchableOpacity style={style.container} onPress={() => onPress(friend.userId)}>
      <View style={containerStyle}>
        {friend.profileImage ? (
          <Image source={{ uri: friend.profileImage }} style={style.profileImg} />
        ) : (
          <Icon width={40} height={40} />
        )}
          <StarIcn style={style.starIcon} width={18} height={18} />
      </View>
      <Text style={textStyle}>{friend.friendsName}</Text>
    </TouchableOpacity>
  );
}

export default React.memo(FriendProfile);

const style = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,
    width: 50,
  },
  name: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 13,
    textAlign: 'center',
  },
   profileImgContainer: {
    width: 44,
    borderRadius: 22, 
    justifyContent: 'center',
    alignItems: 'center',
     borderWidth: 2,
    borderColor: MCOLORS.grayscale.gray5,
    position: 'relative',
  },
  profileImg: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  selected : {
    borderColor: MCOLORS.brand.secondary,
  },
  starIcon: {
    position: 'absolute',
    top: 0,
    left: -10,
    zIndex: 1,
  },
});
