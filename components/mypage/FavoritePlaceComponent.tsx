import { FavoritePlace } from "@/api/type";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { StyleSheet, Text, View } from "react-native";
import FavoritePlaceBtn from "../common/FavoritePlaceBtn";
import Profile from "../common/Profile";

export default function FavoritePlaceComponent({place, placeImage, content, friends, friendsProfileImage}:FavoritePlace){
    return (
    <View style={styles.container}>
        <View style={styles.aboluteBtnContainer}>
            <FavoritePlaceBtn placeName={place} isFavorite={true}/>
        </View>
        {/* <Image source={require('./imgEx.png')} style={styles.image} resizeMode="cover"/> */}
        {/* 이미지 컴포넌트 */}
        <View style={styles.contentContainer}>
            <Text style={styles.place}>{place}</Text>
            <Text style={styles.challenge}>{content}</Text>
            {/* 함께한 친구 프로필 */}
            <View style={styles.profileContainer}>
                <Profile/>
            </View>
        </View>
    </View>)
}

const styles= StyleSheet.create({
    container : {
        height: 241,
        width: '100%',
        borderRadius: 20,
        borderColor: '#f0f0f0',
        borderWidth: 1,
        position:'relative',
        display: 'flex',
        overflow: 'hidden', 
    },
    contentContainer : {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 25,
        backgroundColor: 'transparent',
    },
    aboluteBtnContainer : {
        position:'absolute',
        right: 27,
        top: 20,
        zIndex: 1,
    },
    profileContainer : {
        width: '100%',
        display:'flex',
        alignItems:'flex-end',
    },  
    image: {
        height: '60%',
        width: 'auto',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    place: {
        color: '7a7a7a',
        ...fontStyles.medium15,
    },
    challenge: {
        color: MCOLORS.brand.primary,
        ...fontStyles.bold15,
    }
})