/**
 *
 * @returns 챌린지를 함께하는 친구를 명시하는 컴포넌트
 */

import { MyFriendListResponse } from "@/api/type";
import { MCOLORS } from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';
import FriendProfile from "../common/FriendProfile";

interface ChallengeFriendsProps {
  // 챌린지 실패/성공 여부
  friends: MyFriendListResponse[];
}

function ChallengeFriends({ friends }: ChallengeFriendsProps) {
  const alone = friends.length === 0;

  const text = alone ? '혼자서' : '함께하는 친구';

  return (
    <View style={style.container}>
      <Text style={style.text}>{text}</Text>
      <View style={style.friendsContainer}>
        {!alone &&
          friends.map((item, index) => {
            return (
              <View style={{...style.relativeImg, left: index * -1, zIndex: friends.length - index}} key={index}>
                <FriendProfile friend={item} isSelected={false} />
              </View>
            );
          })}
      </View>
    </View>
  );
}

export default ChallengeFriends;

const style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  friendsContainer: {
    flexDirection: 'row',
  },
  text: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
  },
  relativeImg: {
    position: 'relative',
    zIndex: 1,
  },
});
