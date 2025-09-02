import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { useBadges } from "@/store/useBadgeStore";
import { StyleSheet, Text, View } from "react-native";
import Badge from "../common/Badge";
import { TopBar } from "../common/TopBar";

interface MyPageBadgeChangeTemplateProps {
    selectedBadgeId: string | undefined;
    setSelectedBadge: (badgeId: string) => void;
    handleBadgeChange: () => void;
}

export  default function MyPageBadgeChangeTemplate({selectedBadgeId, setSelectedBadge, handleBadgeChange}:MyPageBadgeChangeTemplateProps) {
    const badges = useBadges();
    
    return (
    <View style={styles.page}>
        <TopBar title="대표 배지" rightButton={<Text style={styles.saveBtnText}>저장</Text>} onRightPress={handleBadgeChange}/>
        <View style={styles.content}>
            {badges.map((item)=> 
            <Badge 
                key={item.badgeId} 
                type={item.name} 
                active={selectedBadgeId===item.badgeId} 
                selected={selectedBadgeId===item.badgeId} 
                label={item.name} 
                onPress={()=>setSelectedBadge(item.badgeId)} />
            )}
        </View>
    </View>
    )
}

const styles= StyleSheet.create({
    page: {
        flex:1,
        gap: 30,
        backgroundColor: '#FFF',
        display: 'flex',
    },
    content: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 40,
        flexWrap: 'wrap',
        display:'flex',
        flexDirection:'row',
        columnGap: 25,
        rowGap: 30,
    },
    saveBtnText : {
        color: MCOLORS.brand.secondary,
        ...fontStyles.bold15,
    },
})