import Badge from "@/components/common/Badge";
import CustomModal from "@/components/common/Modal/CustomModal";
import MyPageBadgeTemplate from "@/components/template/MyPageBadgeTemplate";
import { MCOLORS } from "@/constants/colors";
import fontStyles from "@/constants/fonts";
import { useBadges } from "@/store/useBadgeStore";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// 배지 메인 스크린
export default function BadgeScreen(){
  const badges= useBadges();

  // 모달 상태 관리
  const [modal, setModal] = useState(false);
  
  // 모달에서 보여줄 선택된 배지 ID 상태 관리
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);

  const onEditRepresent =() => router.push('/mypage/badge/change');
  
  const onModalOpen = (badgeId: string) => {
    setModal(true);
    setSelectedBadgeId(badgeId);
  }

  const onModalClose = () => {
    setModal(false);
  }

  const onModalDismiss= () => {
    setSelectedBadgeId(null);
  }
  
  const selectedBadge = badges.find(b => b.badgeId === selectedBadgeId);

    return (
    <View style={styles.container}>
      <MyPageBadgeTemplate badges={badges} onEditRepresent={onEditRepresent} onModalOpen={onModalOpen}/>
      <CustomModal visible={modal} onClose={onModalClose} >
        {selectedBadge && 
        <View style={modalStyles.contentContainer}>
          <View style={modalStyles.textContainer}>
              <Text style={modalStyles.name}>{selectedBadge.name}</Text>
              <Text style={modalStyles.date}>{selectedBadge.earnedAt}</Text>
          </View>
          <Badge type={selectedBadge.name} active={true}/>
          <View style={modalStyles.descriptionContainer}>
             <Text style={modalStyles.description}>
            {selectedBadge.description}
            </Text>
          </View>
        </View>}
        </CustomModal>
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

const modalStyles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    gap: 25,
  },
  textContainer: {
    alignItems: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  name: {
    color: MCOLORS.brand.secondary,
    ...fontStyles.bold17,
  },
  date: {
    color: MCOLORS.grayscale.gray30,
    ...fontStyles.medium13,
  },
  description: {
    color: MCOLORS.grayscale.gray50,
    ...fontStyles.medium13,
  }
})