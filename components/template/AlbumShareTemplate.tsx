import CustomPolaroid from '@/components/album/CustomPolaroid';
import OptionSelectionEl from '@/components/album/OptionSelectionEl';
import { PrimaryButton } from '@/components/common/Button/PrimaryButton';
import PriceTag from '@/components/common/PriceTag';
import { TopBar } from '@/components/common/TopBar';
import { ButtonVariant } from '@/constants/buttonTypes';
import { usePointStore } from '@/store/usePointStore';
import { BadgeType, FrameType } from '@/types/shareType';
import { showCustomToast } from '@/utils/toastManager';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { PolaroidPhoto } from '../album/_type';

interface AlbumShareTemplateProps {
  step: 1 | 2;
  photo: PolaroidPhoto;
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
const AlbumShareTemplate = React.forwardRef<ViewShot, AlbumShareTemplateProps>(
  (
    {
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
    },
    ref,
  ) => {
    const { holdingPoint, fetchPointHistory, updatePoint } = usePointStore();
    const [isFinalizing, setIsFinalizing] = useState(false);

    const framePrice = frameOptions?.find(f => f.type === selectedFrame)?.price || 0;
    const badgePrice = badgeOptions?.find(b => b.type === selectedBadge)?.price || 0;
    const totalCost = step === 1 ? framePrice : framePrice + badgePrice;

    // UI에 표시될 예상 보유 포인트 (음수 가능, 적용해서 프리뷰는 되고 / 다음 핸들러 클릭 시, 사용 불가 모달 노출함)
    const projectedPoints = holdingPoint - totalCost;
    const displayPoints = isFinalizing ? holdingPoint : projectedPoints;

    const handleConfirm = async () => {
      // '다음' 버튼 - 포인트 확인만 수행
      if (step === 1) {
        if (holdingPoint < framePrice) {
          showCustomToast('포인트가 부족해요');
          return;
        }
        onNext();
        return;
      }

      // '공유하기' 버튼 - 최종 포인트 확인 및 API 호출
      if (step === 2) {
        const finalCost = framePrice + badgePrice;
        if (holdingPoint < finalCost) {
          showCustomToast('포인트가 부족해요');
          return;
        }

        if (finalCost > 0) {
          setIsFinalizing(true);
          try {
            let content = '';
            if (framePrice > 0 && badgePrice > 0) content = '프레임 및 뱃지 사용';
            else if (framePrice > 0) content = '프레임 사용';
            else if (badgePrice > 0) content = '뱃지 사용';

            await updatePoint({
              pointEarned: 0,
              pointUsed: finalCost,
              content,
            });
          } catch (error) {
            console.error('포인트 차감에 실패했습니다:', error);
            setIsFinalizing(false);
            return;
          }
        }

        onShare();
      }
    };

    useEffect(() => {
      fetchPointHistory();
    }, [fetchPointHistory]);

    return (
      <View style={styles.page}>
        <TopBar title="" rightButton={<PriceTag price={displayPoints} />} />
        <View style={styles.container}>
          <ViewShot ref={ref} options={{ fileName: 'polaroid-share', format: 'png', quality: 1.0 }}>
            <CustomPolaroid photo={photo} frame={selectedFrame} badge={selectedBadge} />
          </ViewShot>

          {step === 1 && (
            <View style={styles.optionBox}>
              <Text style={styles.label}>프레임</Text>
              <View style={styles.optionList}>
                {frameOptions &&
                  frameOptions.map(f => (
                    <OptionSelectionEl
                      key={f.type}
                      label={f.label}
                      frameType={f.type}
                      selected={selectedFrame === f.type}
                      price={f.price}
                      onPress={type => onChangeFrame(type as FrameType)}
                    />
                  ))}
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.optionBox}>
              <Text style={styles.label}>뱃지</Text>
              <View style={styles.optionList}>
                {badgeOptions &&
                  badgeOptions.map(b => (
                    <OptionSelectionEl
                      key={b.type}
                      label={b.label}
                      badgeType={b.type}
                      selected={selectedBadge === b.type}
                      price={b.price}
                      onPress={type => onChangeBadge(type as BadgeType)}
                    />
                  ))}
              </View>
            </View>
          )}

          <PrimaryButton
            text={step === 1 ? '다음' : '공유하기'}
            variant={ButtonVariant.Primary}
            onPress={handleConfirm}
          />
        </View>
      </View>
    );
  },
);

AlbumShareTemplate.displayName = 'AlbumShareTemplate';
export default AlbumShareTemplate;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30',
  },
  optionBox: {
    flexDirection: 'column',
    gap: 23,
    paddingVertical: 38,
  },
  optionList: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  label: {
    width: '100%',
    textAlign: 'left',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    color: '#4A4A4A',
  },
});
