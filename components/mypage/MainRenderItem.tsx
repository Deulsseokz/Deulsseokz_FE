import fontStyles from "@/constants/fonts";
import { myPageBtn, myPageMenu } from "@/constants/myPageData";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { BtnItem, MenuItem } from "./_type";

export default function MainRenderItem() {

  // route용 아이템
    const renderMenuItem = ({ item }: any) => (
    <Pressable
      onPress={() => router.push(`mypage/${item.route}` as never)}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
    >
      <Text style={[styles.itemText, styles.routeItem]}>{item.label}</Text>
    </Pressable>
  );

  // 단순 클릭용 아이템
    const renderButtonItem = ({ item }:any) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
    >
      <Text style={[styles.itemText, styles.clickItem]}>{item.label}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList<MenuItem>
        data={myPageMenu}
        keyExtractor={(item) => item.route}
        renderItem={renderMenuItem}
        scrollEnabled={false}
      />

      <FlatList<BtnItem>
        data={myPageBtn}
        keyExtractor={(item) => item.label}
        renderItem={renderButtonItem}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles= StyleSheet.create({
  container: { marginTop: 20 },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  itemPressed: { backgroundColor: '#f0f0f0' },
  itemText: fontStyles.medium15,
  clickItem: {
    color: '#acacac',
  },
  routeItem:{
  color: '#4a4a4a',
  } 
})