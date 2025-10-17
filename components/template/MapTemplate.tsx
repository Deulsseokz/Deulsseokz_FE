import type { ChallengeLocation, Coord } from '@/types/challenge';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';

type ChallengeItem = ChallengeLocation & {
  center: { latitude?: number; longitude?: number; lat?: number; lng?: number };
};

interface MapTemplateProps {
  challengeLocationData: ChallengeItem[];
  handleClickPolygon: (challengeId: number, isChallenged: boolean) => void;
  initialCoord?: Coord;
  modalOpen: boolean;
}

// 아이콘
const IMG_TODO = require('../../assets/images/map/icon_todo.png');
const IMG_DONE = require('../../assets/images/map/icon_done.png');

export default function MapTemplate({
  challengeLocationData,
  handleClickPolygon,
  initialCoord,
  modalOpen,
}: MapTemplateProps) {
  const mapRef = useRef<NaverMapView>(null);
  const [isMoveCameraHappened, setIsMoveCameraHappened] = useState(false);

  // 초기 이동
  useEffect(() => {
    if (initialCoord && !isMoveCameraHappened) {
      // 초기 1번만 이동하도록
      mapRef.current?.animateCameraTo({
        ...initialCoord,
        zoom: 11,
        animation: 'easeIn',
      });
      setIsMoveCameraHappened(true);
    }
  }, [initialCoord]);

  // 좌표 헬퍼(사용자 데이터가 lat/lng 또는 latitude/longitude 모두 올 수 있어서 통일)
  const toCoord = (c: ChallengeItem['center']): Coord => ({
    latitude: c.latitude ?? c.lat ?? 0,
    longitude: c.longitude ?? c.lng ?? 0,
  });

  // done / todo 분리
  const { doneMarkers, todoMarkers } = useMemo(() => {
    const done = [];
    const todo = [];
    for (const item of challengeLocationData) {
      const coord = toCoord(item.center);
      const base = {
        identifier: String(item.challengeId),
        latitude: coord.latitude,
        longitude: coord.longitude,
      };

      if (item.isChallenged) {
        done.push({
          ...base,
          image: IMG_DONE,
          width: 50,
          height: 50,
        });
      } else {
        todo.push({
          ...base,
          image: IMG_TODO,
          width: 50,
          height: 50,
        });
      }
    }
    return { doneMarkers: done, todoMarkers: todo };
  }, [challengeLocationData]);

  return (
    <NaverMapView
      pointerEvents={modalOpen ? 'none' : 'auto'}
      ref={mapRef}
      style={styles.container}
      layerGroups={{
        BUILDING: true,
        BICYCLE: false,
        CADASTRAL: false,
        MOUNTAIN: false,
        TRAFFIC: false,
        TRANSIT: false,
      }}
      camera={
        initialCoord
          ? undefined
          : { latitude: 37.5665, longitude: 126.978, zoom: 12 }
      }
      isExtentBoundedInKorea
    >
      <>
        {todoMarkers.map(m => (
          <NaverMapMarkerOverlay
            key={`todo-${m.identifier}`}
            latitude={m.latitude}
            longitude={m.longitude}
            image={m.image}
            width={50}
            height={50}
            onTap={() => {
              const id = Number(m.identifier);
              handleClickPolygon(id, false);
            }}
            zIndex={1000}
          />
        ))}

        {doneMarkers.map(m => (
          <NaverMapMarkerOverlay
            key={`done-${m.identifier}`}
            latitude={m.latitude}
            longitude={m.longitude}
            image={m.image}
            width={50}
            height={50}
            onTap={() => {
              const id = Number(m.identifier);
              handleClickPolygon(id, true);
            }}
            zIndex={2000}
          />
        ))}
      </>
    </NaverMapView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});