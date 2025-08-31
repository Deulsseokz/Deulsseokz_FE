import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { useProfileStore } from "@/store/useProfileStore";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Profile from "../common/Profile";
import { TopBar } from "../common/TopBar";

interface ProfileTemplateProps{
    changeNameRoute: ()=>void;
    changeProfileImage: ()=>void;
}

export default function MyPageProfileTemplate({changeNameRoute, changeProfileImage}: ProfileTemplateProps){
    const myPageData = useProfileStore(s => s.data);

    return (<View style={styles.page}>
        <TopBar title="프로필"/>
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Profile imageUrl={myPageData.profileImage} size={60}/>
                <Text style={styles.name}>{myPageData.userName}</Text>
            </View>
            <View style={styles.textContainer}>
                <Pressable onPress={changeNameRoute}>
                     <Text style={styles.textBtnText}>이름 변경</Text>
                </Pressable>
                <Pressable onPress={changeProfileImage}>
                    <Text style={styles.textBtnText}>프로필 사진 변경</Text>
                </Pressable>
            </View>
        </View>
    </View>)
}

const styles= StyleSheet.create({
    page: {
        flex:1,
        backgroundColor: '#FFF',
    },
    container : {
        display:'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    profileContainer :{
        width: '100%',
        marginVertical: 40,
        display:'flex',
        alignItems:'center',
        gap: 12,    
    },
    name:{
        color: MCOLORS.grayscale.gray70,
        ...fontStyles.bold15,
    },
    textContainer:{
        width: '100%',
        display:'flex',
        alignItems:'flex-start',
    },
    textBtnText: {
        padding: 10,
        color: MCOLORS.grayscale.gray70,
        ...fontStyles.medium15,
    }
})