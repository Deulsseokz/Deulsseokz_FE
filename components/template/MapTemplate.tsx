import type { ChallengeLocation, Coord } from '@/types/challenge';
import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import AnimatedMarker from '../map/AnimatedMarker';

type ChallengeItem = ChallengeLocation & {
  center: { latitude?: number; longitude?: number; lat?: number; lng?: number };
};

interface MapTemplateProps {
  challengeLocationData: ChallengeItem[];
  handleClickPolygon: (challengeId: number, isChallenged: boolean) => void;
  userLocation: Coord | null;
  initialCoord?: Coord;
  modalOpen: boolean;
}

// 아이콘
const IMG_TODO = require('../../assets/images/map/icon_todo.png');
const IMG_DONE = require('../../assets/images/map/icon_done.png');

const CLUSTER_THRESHOLD = 12;         // 이 줌 미만: 클러스터 모드, 이상: 개별 마커 모드
const CLUSTER_DISTANCE_PX = 48;       // 클러스터 반경(px)
const MAP_MAX_ZOOM = 20;

export default function MapTemplate({
  challengeLocationData,
  handleClickPolygon,
  userLocation,
  initialCoord,
  modalOpen,
}: MapTemplateProps) {
  const mapRef = useRef<NaverMapView>(null);
  const [zoom, setZoom] = useState(12);

  // 초기 이동
  useEffect(() => {
    if (initialCoord) {
      mapRef.current?.animateCameraTo({
        ...initialCoord,
        zoom: Math.max(CLUSTER_THRESHOLD - 1, 11),
        animation: 'easeIn',
      });
    }
  }, [initialCoord]);

  // 줌 변경 추적
  const onCameraChanged = (e: any) => {
    if (typeof e.zoom === 'number') setZoom(e.zoom);
    else if (e?.camera?.zoom != null) setZoom(e.camera.zoom);
  };

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

  // 클러스터 모드에서만 전달할 clusters
  const isClusterMode = zoom < CLUSTER_THRESHOLD;
  const clusters = useMemo(() => {
    // 클러스터 모드가 아니라면 생성하지 않음
    if (!isClusterMode) return undefined;

    return [
      {
        // TODO (미완료): 클러스터
        markers: todoMarkers,
        animate: true,
        width: 50,
        height: 50,
        minZoom: 0,
        maxZoom: MAP_MAX_ZOOM,
        screenDistance: CLUSTER_DISTANCE_PX,
      },
      {
        // DONE (완료): 클러스터
        markers: doneMarkers,
        animate: true,
        width: 50,
        height: 50,
        minZoom: 0,
        maxZoom: MAP_MAX_ZOOM,
        screenDistance: CLUSTER_DISTANCE_PX,
      },
    ];
  }, [isClusterMode, todoMarkers, doneMarkers]);

  return (
    <NaverMapView
      pointerEvents={modalOpen ? 'none' : 'auto'}
      ref={mapRef}
      style={styles.container}
      onCameraChanged={onCameraChanged}
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
      // 줌이 낮을 땐 클러스터 모드, 높으면 undefined로 꺼짐
      clusters={clusters}
    >
      {/* 개별 마커 모드에서는 각각의 아이콘을 렌더함. */}
      {!isClusterMode && (
        <>
          {todoMarkers.map(m => (
            <AnimatedMarker
              key={`todo-${m.identifier}`}
              coord={{ latitude: m.latitude, longitude: m.longitude }}
              image={m.image}
              baseSize={50}
              pulse
              onTap={() => {
                const id = Number(m.identifier);
                const target = challengeLocationData.find(i => i.challengeId === id);
                if (target) handleClickPolygon(id, false);
              }}
              zIndex={1000} // 완료하지 않은 아이콘이 위에 렌더되도록
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
                const target = challengeLocationData.find(i => i.challengeId === id);
                if (target) handleClickPolygon(id, true);
              }}
              zIndex={2000}
            />
          ))}
        </>
      )}
    </NaverMapView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
