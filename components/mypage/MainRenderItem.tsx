import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { myPageBtn, myPageMenu } from "@/constants/myPageData";
import { useAuthenticationStore } from "@/store/useAuthenticationStore";
import { router } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { BtnItem } from "./_type";

export default function MainRenderItem() {
  const {signOut} = useAuthenticationStore();

  // 단순 클릭용 아이템
    const renderButtonItem = ({ item }:any) => (
    <Pressable
    // 임시로 로그아웃 추가
     onPress={signOut}
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
      <View style={styles.menusContainer}>
        {myPageMenu.map((item) => (
          <Pressable
            key={item.route}
            onPress={() => router.push(`mypage/${item.route}` as never)}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && styles.itemPressed,
            ]}
          >
            <Image source={item.icon} style={styles.icnImg} />
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

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
  container: { 
    display: 'flex',
    gap: 10,
   },
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
  } ,
  label : {
    color: MCOLORS.grayscale.gray70,
    ...fontStyles.medium15,
  },
  icnImg: {
    width: 40,
    height: 40,
  },
  menusContainer : {
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItem : {
    paddingVertical: 12,
    paddingHorizontal: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  }
})