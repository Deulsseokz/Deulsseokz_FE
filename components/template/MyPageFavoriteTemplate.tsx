import { FavoritePlace } from "@/api/type";
import { BASE_URL } from "@env";
import axios from "axios";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { TopBar } from "../common/TopBar";
import FavoritePlaceComponent from "../mypage/FavoritePlaceComponent";

export default function MyPageFavoriteTemplate(){
    useEffect(()=>{
        async function getData(){
            const {data} = await axios.get(`${BASE_URL}/place/favorite`);
            console.log(data.result);
        }

        getData();
    } , []);

    const dummyFavoritePlace = [
        {
      "place": "N서울타워",
      "placeImage": "image.heic",
      "content": "남산에서 사진찍기",
      "friends": [13, 15],
      "friendsProfileImage": ["image1.heic", "image2.heic"]
    },
    {
      "place": "N서울타워2",
      "placeImage": "image.heic",
      "content": "남산에서 사진찍기",
      "friends": [13, 15],
      "friendsProfileImage": ["image1.heic", "image2.heic"]
    }
]

    return (
    <View style={styles.page}>
        <TopBar title={"관심 장소"}/>
        <FlatList<FavoritePlace>
            data={dummyFavoritePlace}
            keyExtractor={(item)=>item.place}
            renderItem={({item,index})=>(<FavoritePlaceComponent key={index} place={item.place} placeImage={item.placeImage} content={item.content} friends={item.friends} friendsProfileImage={item.friendsProfileImage}/>)}
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
            />
    </View>)
}

const styles = StyleSheet.create({
    page: {
        flex:1,
        gap: 28,
        paddingHorizontal: 20,
        backgroundColor: '#FFF',
    },
    separator: {
        height: 30,
    }
})