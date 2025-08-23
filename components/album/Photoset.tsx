import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

interface PhotoSetProps {
  /** 레이어할 이미지 리스트 */
  images: ImageSourcePropType[];
  /** 포토셋 하단 레이블 */
  label: string;
  /** 포토셋 클릭 시 실행될 함수 */
  onPress: (id: number) => void;
}

/**
 * 이미지 3장이 레이어되는 포토셋 컴포넌트
 */
export default function PhotoSet({ images, label, onPress }: PhotoSetProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {Array.from({ length: 3 })
          .map((_, idx) => idx)
          .reverse()
          .map(idx => {
            const offset = idx * 5;
            const img = images[idx];

            let overlayColor = 'transparent';
            if (idx === 1) overlayColor = '#00000066';
            if (idx === 2) overlayColor = '#000000B2';

            return (
              <Pressable key={idx} onPress={() => onPress?.(idx)}>
                <View
                  style={[
                    styles.image,
                    {
                      top: offset,
                      left: offset,
                      zIndex: idx,
                    },
                  ]}
                >
                  {img ? (
                    <Image source={img} style={styles.image} />
                  ) : (
                    <View style={[styles.image, { backgroundColor: '#fff' }]} />
                  )}
                  {overlayColor !== 'transparent' && (
                    <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
                  )}
                </View>
              </Pressable>
            );
          })}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 133;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    width: IMAGE_WIDTH + 12,
    height: IMAGE_HEIGHT + 12,
  },
  image: {
    position: 'absolute',
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  label: {
    marginTop: 15,
    fontSize: 13,
    lineHeight: 15,
    fontWeight: '500',
    color: '#313131',
    textAlign: 'center',
  },
});
