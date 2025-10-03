import { PolaroidPhoto } from '@/components/album/_type';
import { useMemo } from 'react';

/**
 * PolaroidPhoto 배열을 받아 대표 사진(isFavorite)이 항상 맨 앞에 오도록 정렬하는 훅
 * @param photos - 원본 사진 배열
 * @returns 정렬된 사진 배열
 */
const useSortedPhotos = (photos: PolaroidPhoto[]): PolaroidPhoto[] => {
  const sortedPhotos = useMemo(() => {
    const photosCopy = [...photos];

    photosCopy.sort((a, b) => {
      // a가 대표 사진이고 b는 아닐 경우, a를 앞으로 보냄
      if (a.isFavorite && !b.isFavorite) {
        return -1;
      }
      // b가 대표 사진이고 a는 아닐 경우, b를 앞으로 보냄
      if (!b.isFavorite && a.isFavorite) {
        return 1;
      }
      // 둘 다 대표 사진이거나 둘 다 아닐 경우, 순서를 바꾸지 않음
      return 0;
    });

    return photosCopy;
  }, [photos]);

  return sortedPhotos;
};

export default useSortedPhotos;
