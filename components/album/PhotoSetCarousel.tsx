import { formatDate } from '@/utils/formatDate';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { PolaroidPhoto } from './_type';
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

export default function PhotoSetCarousel({
  photos,
  activeIndex,
  setActiveIndex,
}: PhotoSetCarouselProps) {
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
                  {(item.additional?.feeling || item.additional?.weather) && (
                    <Text style={styles.emoji}>
                      {item.additional?.feeling ?? ''} {item.additional?.weather ?? ''}
                    </Text>
                  )}
                  {item.additional?.desc && (
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
    padding: 10,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
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
  emoji: { fontSize: 20, marginBottom: 5 },
  additional: { minHeight: 70 },
  desc: { fontSize: 13, lineHeight: 20, color: '#4A4A4A' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 },
  date: { fontSize: 12, color: '#ACACAC' },
  loc: { fontSize: 12, color: '#7A7A7A' },
});
