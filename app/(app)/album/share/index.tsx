import { PolaroidPhoto } from '@/components/album/_type';
import AlbumShareTemplate from '@/components/template/AlbumShareTemplate';
import { useInstagramShare } from '@/hooks/useInstagramShare';
import { BadgeType, FrameType } from '@/types/shareType';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useRef, useState } from 'react';
import ViewShot from 'react-native-view-shot';

/** config */
const frameOptions = [
  { type: FrameType.WHITE, label: '흰색' },
  { type: FrameType.BLACK, label: '검정색' },
  { type: FrameType.CHRISTMAS, label: '크리스마스', price: 80 },
  { type: FrameType.TREE, label: '트리', price: 80 },
  { type: FrameType.RIBBON, label: '리본', price: 80 },
  { type: FrameType.LINE, label: '줄무늬', price: 80 },
  { type: FrameType.RAINBOW, label: '레인보우', price: 20 },
  { type: FrameType.HANDWRITING, label: '손글씨', price: 80 },
  { type: FrameType.SHAPE, label: '손글씨', price: 80 },
];

const badgeOptions = [
  { type: BadgeType.FIRST, label: '첫만남' },
  { type: BadgeType.HANYANG, label: '한양의 품격' },
  { type: BadgeType.GENGHI, label: '징기즈칸' },
  { type: BadgeType.OZI, label: '오지 탐험대' },
];

export default function AlbumShareScreen() {
  /** router */
  const { place, photo } = useLocalSearchParams<{ place?: string; photo: string }>();

  /** state */
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedFrame, setSelectedFrame] = useState<FrameType>(FrameType.WHITE);
  const [selectedBadge, setSelectedBadge] = useState<BadgeType | null>(null);

  /** ref */
  const viewShotRef = useRef<ViewShot>(null);

  /** hooks */
  const { share: handleShare } = useInstagramShare(viewShotRef);

  /** variable */
  const selectedPhoto = useMemo<PolaroidPhoto | null>(() => {
    if (!photo) return null;
    try {
      return JSON.parse(decodeURIComponent(photo));
    } catch (e) {
      console.error('사진 파싱 실패:', e);
      return null;
    }
  }, [photo]);

  /** handler function (related router) */
  const handleNext = () => setStep(2);

  // selectedPhoto가 없으면 렌더링하지 않음 (오류 방지)
  if (!selectedPhoto) {
    return null;
  }

  return (
    <AlbumShareTemplate
      ref={viewShotRef}
      step={step}
      photo={selectedPhoto}
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
