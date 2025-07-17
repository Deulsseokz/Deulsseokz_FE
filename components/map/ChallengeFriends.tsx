/**
 *
 * @returns 챌린지를 함께하는 친구를 명시하는 컴포넌트
 */

import IcnFriend from '@/assets/icons/icon-person.svg';
import { MCOLORS } from '@/constants/Colors';
import { Friend } from '@/types/friend';
import { StyleSheet, Text, View } from 'react-native';

interface ChallengeFriendsProps {
  // 챌린지 실패/성공 여부
  friends: Friend[];
}

function ChallengeFriends({ friends }: ChallengeFriendsProps) {
  const alone = friends.length == 0;

  const text = alone ? '혼자서' : '함께하는 친구';

  return (
    <View style={style.container}>
      <Text style={style.text}>{text}</Text>
      <View style={style.friendsContainer}>
        {!alone &&
          friends.map((item, index) => {
            return <IcnFriend key={index} style={{ ...style.relativeImg, left: index * -10 }} />;
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
    paddingVertical: 22,
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
    width: 40,
    height: 40,
    position: 'relative',
    zIndex: 1,
  },
});
