import { MyFriendListResponse } from '@/api/type';
import { MCOLORS } from '@/constants/colors';
import { fontStyles } from '@/constants/fonts';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NoFriendsWrapper from './NoFriendsWrapper';

export default function FriendsContainer({
  friends,
  onPressProfile,
}: {
  friends: MyFriendListResponse[];
  onPressProfile: (userId: number) => void;
}) {
  const windowWidth = Dimensions.get('window').width;
  const itemGapWidth = (windowWidth * 0.8 - 200) / 3;

  return (
    <FlatList
      data={friends}
      keyExtractor={item => item.userId.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => onPressProfile(item.userId)}>
          <Image style={styles.image} source={{ uri: item.profileImage! }} />
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
            {item.friendsName}
          </Text>
        </TouchableOpacity>
      )}
      numColumns={4}
      scrollEnabled={friends.length > 28}
      contentContainerStyle={styles.contentContainer}
      // null ui 처리해야함
      ListEmptyComponent={<NoFriendsWrapper />}
      columnWrapperStyle={{ gap: itemGapWidth }}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => <View style={styles.footer} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
  },
  item: {
    gap: 10,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    ...fontStyles.bold15,
    color: MCOLORS.grayscale.gray70,
    maxWidth: 50,
  },
  separator: {
    height: 25,
  },
  footer: {
    height: 100,
  },
});
