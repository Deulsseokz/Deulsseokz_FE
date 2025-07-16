import CustomPolaroid from "@/components/album/CustomPolaroid";
import OptionSelectionEl from "@/components/album/OptionSelectionEl";
import PriceTag from "@/components/common/PriceTag";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { TopBar } from "@/components/common/TopBar";
import { BadgeType, FrameType } from "@/types/shareType";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AlbumShareIdTemplateProps {
  step: 1 | 2;
  photo: any;
  selectedFrame: FrameType;
  selectedBadge: BadgeType | null;
  frameOptions?: {
    type: FrameType;
    label: string;
    price?: number;
  }[];
  badgeOptions?: {
    type: BadgeType;
    label: string;
    price?: number;
  }[];
  onChangeFrame: (frame: FrameType) => void;
  onChangeBadge: (badge: BadgeType) => void;
  onNext: () => void;
  onShare: () => void;
}

/** 
 * 앨범 공유 템플릿 - 사진 편집(프레임/뱃지 선택)
 * @param step - 현재 단계 (1: 프레임 선택, 2: 뱃지 선택)
 * @param photo - 공유할 폴라로이드 사진
 * @param selectedFrame - 선택된 프레임 타입
 * @param selectedBadge - 선택된 뱃지 타입
 * @param frameOptions - 프레임 선택 옵션들 (opt)
 * @param badgeOptions - 뱃지 선택 옵션들 (opt)
 * @param onChangeFrame - 프레임 변경 핸들러
 * @param onChangeBadge - 뱃지 변경 핸들러
 * @param onNext - 다음 단계로 넘어가는 핸들러
 * @param onShare - 공유하기 핸들러
 */
export default function AlbumShareIdTemplate({
  step,
  photo,
  selectedFrame,
  selectedBadge,
  frameOptions,
  badgeOptions,
  onChangeFrame,
  onChangeBadge,
  onNext,
  onShare,
}: AlbumShareIdTemplateProps) {
  return (
    <View style={styles.page}>
      <TopBar rightButton={<PriceTag price={800} />} />
      <View style={styles.container}>
        <CustomPolaroid photo={photo} frame={selectedFrame} badge={selectedBadge} />

        {step === 1 && (
          <View style={styles.optionBox}>
            <Text style={styles.label}>프레임</Text>
            <View style={styles.optionList}>
              {frameOptions && frameOptions.map((f) => (
                <OptionSelectionEl
                  key={f.type}
                  label={f.label}
                  frameType={f.type}
                  selected={selectedFrame === f.type}
                  price={f.price}
                  onPress={(type) => onChangeFrame(type as FrameType)}
                />
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.optionBox}>
            <Text style={styles.label}>뱃지</Text>
            <View style={styles.optionList}>
              {badgeOptions&& badgeOptions.map((b) => (
                <OptionSelectionEl
                  key={b.type}
                  label={b.label}
                  badgeType={b.type}
                  selected={selectedBadge === b.type}
                  onPress={(type) => onChangeBadge(type as BadgeType)}
                />
              ))}
            </View>
          </View>
        )}

        <PrimaryButton
          text={step === 1 ? "다음" : "공유하기"}
          kind="status-enabled"
          onPress={step === 1 ? onNext : onShare}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  optionBox: {
    flexDirection: "column",
    gap: 23,
    paddingVertical: 38,
  },
  optionList: {
    flexDirection: "row",
    gap: 30,
  },
  label: {
    width: "100%",
    textAlign: "left",
    fontWeight: "500",
    fontSize: 13,
    lineHeight: 20,
    color: "#4A4A4A",
  },
});
