import { PolaroidPhoto } from "@/components/album/_type";
import AlbumShareIdTemplate from "@/components/template/AlbumShareIdTemplate";
import { BadgeType, FrameType } from "@/types/shareType";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";

const frameOptions = [
  { type: FrameType.WHITE, label: "흰색" },
  { type: FrameType.BLACK, label: "검정색" },
  { type: FrameType.RAINBOW, label: "레인보우", price: 20 },
  { type: FrameType.HANDWRITING, label: "손글씨", price: 80 },
];

const badgeOptions = [
  { type: BadgeType.FIRST, label: "첫만남" },
  { type: BadgeType.HANYANG, label: "한양의 품격" },
  { type: BadgeType.GENGHI, label: "징기즈칸" },
  { type: BadgeType.OZI, label: "오지 탐험대" },
];

export default function AlbumShareIdScreen() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFrame, setSelectedFrame] = useState<FrameType>(FrameType.WHITE);
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);

  const { photo } = useLocalSearchParams<{ photo: string }>();

  const selectedPhoto = useMemo<PolaroidPhoto | null>(() => {
    try {
      return JSON.parse(decodeURIComponent(photo));
    } catch (e) {
      console.error("사진 파싱 실패:", e);
      return null;
    }
  }, [photo]);

  const handleNext = () => setStep(2);
  const handleShare = () => {
    console.log("공유 완료");
  };

  return (
    <AlbumShareIdTemplate
      step={step}
      photo={selectedPhoto as PolaroidPhoto}
      selectedFrame={selectedFrame}
      selectedBadge={selectedBadge}
      frameOptions={frameOptions}
      badgeOptions={badgeOptions}
      onChangeFrame={setSelectedFrame}
      onChangeBadge={setSelectedBadge}
      onNext={handleNext}
      onShare={handleShare}
    />
  );
}
