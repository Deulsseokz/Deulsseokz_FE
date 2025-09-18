import fontStyles from '@/constants/fonts';
import { formatDate } from '@/utils/formatDate';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { PolaroidPhoto } from './_type';
import { feelingImageMap, weatherImageMap } from './_utli';
import PeopleOverlay from './PeopleOverlay';
const { width: windowWidth } = Dimensions.get('window');
const CARD_WIDTH = windowWidth * 0.7;
const CARD_HEIGHT = 514;

interface PhotoSetCarouselProps {
  /** 폴라로이드 사진 리스트 */
  photos: PolaroidPhoto[];
  /** 현재 활성화된 인덱스 */
  activeIndex: number;
  /** 활성화된 인덱스를 설정하는 함수 */
  setActiveIndex: (index: number) => void;
}

/**
 * 사진 세트를 가로로 스크롤 가능한 캐러셀 형태로 보여주는 컴포넌트
 * - 각 사진은 폴라로이드 스타일로 표시됨
 */

export default function PhotoSetCarousel({ photos, activeIndex, setActiveIndex }: PhotoSetCarouselProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // 슬라이드 바뀌면 오버레이 닫기
  useEffect(() => setExpandedIndex(null), [activeIndex]);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={{ width: windowWidth, justifyContent: 'center' }}
        data={photos}
        loop={false}
        scrollAnimationDuration={500}
        onSnapToItem={setActiveIndex}
        mode="parallax"
        modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 50 }}
        renderItem={({ item, index }) => {
          const expanded = expandedIndex === index;

          const feelingIcon = feelingImageMap[item.additional.feeling];
          const weatherIcon = weatherImageMap[item.additional.weather];

          return (
            <View style={styles.card}>
              <View style={styles.polaroid}>
                {/* 이미지 + 오버레이 */}
                <View style={styles.imageBox}>
                  <Image source={item.image} style={styles.image} />
                  <PeopleOverlay
                    people={item.additional.people ?? []}
                    expanded={expanded}
                    onToggle={() => setExpandedIndex(expanded ? null : index)}
                  />
                </View>

                {/* 추가 정보 */}
                <View style={styles.additional}>
                  {(feelingIcon || weatherIcon) && (
                    <View style={styles.emojiRow}>
                      {feelingIcon && <Image source={feelingIcon} style={styles.emojiIcon} resizeMode="contain" />}
                      {weatherIcon && <Image source={weatherIcon} style={styles.emojiIcon} resizeMode="contain" />}
                    </View>
                  )}

                  {item.additional.desc?.length > 0 && (
                    <Text style={styles.desc} numberOfLines={2}>
                      {item.additional.desc}
                    </Text>
                  )}
                </View>

                <View style={styles.footer}>
                  <Text style={styles.date}>{formatDate(item.date)}</Text>
                  <Text style={styles.loc}>{item.loc}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  carouselContainer: { alignItems: 'center', justifyContent: 'center', width: '100%' },
  card: { alignItems: 'center', justifyContent: 'center' },
  polaroid: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  /** 이미지 + 오버레이 */
  imageBox: { position: 'relative', width: '100%', height: 300 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },

  /** 추가정보/푸터 */
  additional: { minHeight: 80, display: 'flex', flexDirection: 'column', gap: 5 },

  /** 이모지(아이콘) 영역 */
  emojiRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  emojiIcon: { width: 24, height: 24 },

  desc: { ...fontStyles.medium13, color: '#4A4A4A' },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  date: { fontSize: 12, color: '#ACACAC' },
  loc: { fontSize: 12, color: '#7A7A7A' },
});
