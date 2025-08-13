import fontStyles from "@/constants/fonts";
import { useBadges, useRepresentativeBadge } from "@/hooks/useBadge";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BadgeComponent from "../common/Badge";
import { TopBar } from "../common/TopBar";

interface MyPageBadgeTemplateProps{
    onEditRepresent: ()=>void;
    // 배지에 대한 모달 오픈 함수
    onModalOpen: (badgeId:string)=>void;
    // 배지 데이터
}

export default function MyPageBadgeTemplate({ onEditRepresent, onModalOpen}:MyPageBadgeTemplateProps){
    const badges = useBadges();
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
               <View style={{...styles.content, ...styles.colorBackGround}}>
                {repBadge ? <BadgeComponent type={repBadge.name} active={true} label={repBadge.name} onPress={onEditRepresent} isRepresent={true}/> :<Text>아직 대표배지가 없어요!</Text> }
            </View>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.title}>
                    배지 지갑
                </Text>
                <View style={styles.content}>
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
        paddingHorizontal: 20,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection:'row',
        columnGap: 25,
        rowGap: 30,
    }
})