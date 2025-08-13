import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { BadgeType } from "@/types/shareType";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { badgeIconsMypage } from "../mypage/_util";

/**
 * 
 * @returns 마이페이지에서 관리되는 뱃지 컴포넌트
 */

interface BadgeProps {
    /** 선택 가능한 뱃지 타입 */
    type: BadgeType;
    /** active 여부: 이미지 (컬러/흑백) 결정*/
    active: boolean;
    /** 여러 개 중 선택되는 경우 선택됐는지 여부를 받음 (opt) / 선택 불가능한 경우 전달 필요 없음*/
    selected?: boolean;
    /** 레이블이 필요한 경우 레이블을 전달 (opt) */
    label?: string;
    /** 클릭 가능한 경우, 클릭 핸들러*/
    onPress?: ()=>void;
    /** 대표 배지 여부를 받아 editable 아이콘을 표시 */
    isRepresent?: boolean;
}

/**
 * 뱃지 컴포넌트
 */
export default function Badge({type, active, selected, label, onPress, isRepresent}:BadgeProps){
    // imageSource: active 여부에 따라 조건부로 뱃지 이미지를 받아옴
    const imageSource = active ? badgeIconsMypage[type].active : badgeIconsMypage[type].inactive;

    // editableSrc: 대표 배지이고 수정 아이콘이 필요할 때에만 아이콘을 받아옴
    const editableSrc = isRepresent && require("@/assets/images/editable.png");

    // textColor
    // 1. 선택 가능한 상태가 아닐 때: 검정색 
    // 2-1. 선택 가능하며 선택됐을 때: 핑크색 
    // 2-2. 선택 가능하며 선택된 상태가 아닐 때: 회색
    const textColor= selected===undefined ? MCOLORS.grayscale.gray70 : selected ? MCOLORS.brand.secondary : MCOLORS.grayscale.gray30;

    return (
    <Pressable style={styles.container} disabled={!onPress} onPress={onPress ? onPress : undefined}>
        <View>
            <Image source={imageSource} style={styles.image} resizeMode="contain"/>
            {isRepresent && <Image source={editableSrc} style={styles.editable}/>}
        </View>
        {label && <Text style={{...styles.text, color: textColor}}>{label}</Text>}
    </Pressable>);
}

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: 'auto',
    },
    image :{
        position: 'relative',
        height: 55,
        width: 55,
    },
    editable:{
        position: 'absolute',
        height: 55,
        width: 55,
        right: 0,
    },
    text: {
        color: '#acacac',
        ...fontStyles.medium13,
    }
})