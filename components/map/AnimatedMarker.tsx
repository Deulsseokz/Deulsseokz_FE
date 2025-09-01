import { Coord } from "@/types/challenge";
import { NaverMapMarkerOverlay } from '@mj-studio/react-native-naver-map';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

type AnimatedMarkerProps = {
  coord: Coord;        // 마커 위치
  image: any;          // 마커 이미지
  baseSize?: number;   // 기본 크기
  onTap?: () => void;  // 클릭 콜백
  pulse?: boolean;     // true면 계속 위아래 펄스
  bounceOnMount?: boolean; // true면 마운트 시 한 번 튕김
  zIndex?: number; // zIndex 값 (기본 0)
};

export default function AnimatedMarker({
  coord,
  image,
  baseSize = 50,
  onTap,
  pulse = false,
  bounceOnMount = false,
  zIndex = 0,
}: AnimatedMarkerProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const [lat, setLat] = useState(coord.latitude);

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;

    // 바운스: 마운트 시 한번 위아래로 튀기기
    if (bounceOnMount) {
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start();
    }

    // 펄스: 무한 위아래 반복
    if (pulse) {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 700,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 700,
            easing: Easing.in(Easing.quad),
            useNativeDriver: false,
          }),
        ])
      );
      loop.start();
    }

    return () => {
      if (loop) loop.stop();
    };
  }, [anim, pulse, bounceOnMount]);

  useEffect(() => {
    const id = anim.addListener(({ value }) => {
      const offset = pulse
        ? (value - 0.5) * 0.0005 // 위아래 왕복
        : bounceOnMount
        ? value * 0.0001
        : 0;
      setLat(coord.latitude + offset);
    });
    return () => anim.removeListener(id);
  }, [anim, coord.latitude, pulse, bounceOnMount]);

  return (
    <NaverMapMarkerOverlay
      latitude={lat}
      longitude={coord.longitude}
      image={image}
      width={baseSize}
      height={baseSize}
      onTap={onTap}
      zIndex={zIndex}
    />
  );
}
