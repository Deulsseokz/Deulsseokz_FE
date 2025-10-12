import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface LoadingSpinnerProps {
  /** 스피너가 표시될지 여부 */
  isVisible: boolean;
  /** 스피너의 색상 (기본값: 멜로그 브랜드 컬러 #F76F8E) */
  color?: string;
  /** 오버레이가 표시될지 여부 (기본값: true) */
  isOverlayVisible?: boolean;
}

/**
 * 전체 화면을 덮는 오버레이와 함께 로딩 스피너를 표시하는 컴포넌트
 */
export default function LoadingSpinner({ isVisible, color = '#F76F8E', isOverlayVisible = true }: LoadingSpinnerProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={{...styles.container, ...(isOverlayVisible ? styles.overlay : {})}}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
