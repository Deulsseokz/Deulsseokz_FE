import fontStyles from "@/constants/fonts";
import { useRepresentativeBadge } from "@/store/useBadgeStore";
import { Badge } from "@/types/badge";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BadgeComponent from "../common/Badge";
import { TopBar } from "../common/TopBar";

interface MyPageBadgeTemplateProps{
    // 모든 배지 데이터를 props로 받음
    badges: Badge[];
    // 대표 배지 변경 페이지로 이동 함수
    onEditRepresent: ()=>void;
    // 배지에 대한 모달 오픈 함수
    onModalOpen: (badgeId:string)=>void;
}

export default function MyPageBadgeTemplate({ badges, onEditRepresent, onModalOpen}:MyPageBadgeTemplateProps){
    const repBadge= useRepresentativeBadge();

    return (
    <View style={styles.page}>
        <TopBar title="배지"/>
        <View style={styles.contentsContainer}>
            <View style={styles.contentWrapper}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>
                        대표 배지
                    </Text>
                    <Pressable onPress={onEditRepresent}>
                        <Text style={styles.edit}>
                        변경
                        </Text>
                    </Pressable>
                </View>
               <View style={{...styles.content, ...styles.colorBackGround, ...styles.repBadgeContainer}}>
                {repBadge ? <BadgeComponent type={repBadge.name} selected={true} active={true} label={repBadge.name} onPress={onEditRepresent} isRepresent={true}/> :<Text>아직 대표배지가 없어요!</Text> }
                <Text style={styles.badgeDescription}>
                    {repBadge ? repBadge.description : "대표 배지를 설정해보세요!"}
                </Text>
            </View>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>
                    배지 지갑
                </Text>
                <View style={{...styles.content, ...styles.badgesContainer}}>
                    {badges.map((item, key)=><BadgeComponent key={key} type={item.name} active={true} label={item.name} onPress={()=>onModalOpen(item.badgeId)} />)}
                </View>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    page: {
        flex:1,
        gap: 50,
        backgroundColor: '#FFF',
    },
    contentsContainer: {
        display:'flex',
        gap: 50,
        paddingHorizontal: 20,
    },
    colorBackGround: {
        backgroundColor: '#fbfbfb',
        borderRadius: 20,
    },
    contentWrapper : {
        display:'flex',
        gap: 10,
    },
    headerContainer : {
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: '#4a4a4a',
        ...fontStyles.bold15,
    },
    edit: {
        color: '#acacac',
        ...fontStyles.medium13,
    }, 
    content: {
        width: '100%',
        paddingVertical: 20,
    },
    repBadgeContainer : {
        display:'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        gap: 30,
        paddingHorizontal: 30,
    },
    badgesContainer : {
        display:'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 25,
        rowGap: 30,
        paddingHorizontal: 20,
    },
    badgeDescription: {
        flex: 1,
        color: '#4a4a4a',
        ...fontStyles.medium13,
        textAlignVertical: 'center',
    }
})