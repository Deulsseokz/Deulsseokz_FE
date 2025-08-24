import MyPageBadgeChangeTemplate from "@/components/template/MyPageBadgeChangeTemplate";
import { useBadge } from "@/store/useBadgeStore";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function BadgeChangeScreen(){
    const setRepresentative = useBadge(s=>s.setRepresentative);
    const representativeId= useBadge(s=>s.representativeId);

    /** 배지 선택 state */
    const [selectedBadge, setSelectedBadge] = useState<string | undefined>(representativeId);

    /** 대표 배지 저장 */
    const handleBadgeChange = () => {
        // API 호출
        if (selectedBadge) setRepresentative(selectedBadge);
        router.back();
    }

    return (
    <View style={styles.container}>
        <MyPageBadgeChangeTemplate selectedBadgeId={selectedBadge} setSelectedBadge={setSelectedBadge} handleBadgeChange={handleBadgeChange}/>
    </View>)
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
  },
});