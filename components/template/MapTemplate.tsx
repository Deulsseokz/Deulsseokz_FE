import type { ChallengeLocation, Coord } from '@/types/challenge';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const isFocused = useIsFocused();
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
  }, [initialCoord, isMoveCameraHappened]);

  const toCoord = useCallback((c: ChallengeItem['center']): Coord => ({
    latitude: c.latitude ?? c.lat ?? 0,
    longitude: c.longitude ?? c.lng ?? 0,
  }), []);

  const allMarkers = useMemo(() => {
    return challengeLocationData.map(item => {
      const coord = toCoord(item.center);
      const isDone = item.isChallenged;

      return {
        identifier: String(item.challengeId),
        latitude: coord.latitude,
        longitude: coord.longitude,
        isChallenged: isDone,
        image: isDone ? IMG_DONE : IMG_TODO,
        zIndex: isDone ? 2000 : 1000, 
        width: 50,
        height: 50,
      };
    });
  }, [challengeLocationData, toCoord]);

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
      isShowLocationButton={false}
    >
      {isFocused && allMarkers.map(m => (
        <NaverMapMarkerOverlay
          key={m.identifier}
          latitude={m.latitude}
          longitude={m.longitude}
          image={m.image}
          width={m.width}
          height={m.height}
          onTap={() => {
            const id = Number(m.identifier);
            handleClickPolygon(id, m.isChallenged);
          }}
          zIndex={m.zIndex}
        />
      ))}
    </NaverMapView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});