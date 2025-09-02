import { FavoritePlace } from "@/api/type";
import { FlatList, StyleSheet, View } from "react-native";
import { TopBar } from "../common/TopBar";
import FavoritePlaceComponent from "../mypage/FavoritePlaceComponent";

interface FavoriteTemplateInterface {
    favoritePlaceData : FavoritePlace[];
    toggleFavoritePlace: (placeName: string) => void;
}

export default function MyPageFavoriteTemplate({favoritePlaceData, toggleFavoritePlace}: FavoriteTemplateInterface ){

    return (
    <View style={styles.page}>
        <TopBar title={"관심 장소"}/>
        <FlatList<FavoritePlace>
            style={styles.flatList}
            data={favoritePlaceData}
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
        backgroundColor: '#FFF',
    },
    flatList: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    separator: {
        height: 30,
    }, 
})