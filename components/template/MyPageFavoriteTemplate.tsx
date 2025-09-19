import { FavoritePlace } from "@/api/type";
import IconEmpty from "@/assets/icons/icon-empty.svg";
import { MCOLORS } from "@/constants/colors";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
       {favoritePlaceData.length!==0 ? <FlatList<FavoritePlace>
            style={styles.flatList}
            data={favoritePlaceData}
            keyExtractor={(item)=>item.place}
            renderItem={({item,index})=>(<FavoritePlaceComponent key={index} place={item.place} placeImage={item.placeImage} content={item.content} friends={item.friends} friendsProfileImage={item.friendsProfileImage}/>)}
            ItemSeparatorComponent={()=><View style={styles.separator}/>}
            /> : 
        <View style={styles.emptyContainer}>
            <IconEmpty width={100} height={100} />
            <Text style={styles.emptyText}>관심 장소가 없습니다</Text>
        </View>}
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
    emptyContainer : {
        marginTop: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: MCOLORS.grayscale.gray30,
        fontSize: 13,
        fontWeight: 500,
    }
})