import { MCOLORS } from '@/constants/Colors';
import { NaverMapMarkerOverlay, NaverMapPolygonOverlay, NaverMapView } from '@mj-studio/react-native-naver-map';
import { SafeAreaView, StyleSheet, View } from 'react-native';

// 위도 경도 데이터
interface Coord {
  latitude: number;
  longitude: number;
}

// 위치 객체 데이터
interface PlaceProps {
  name: string;
  center: Coord;
  location: Coord[];
}

interface MapTemplateProps {
  challengeLocationData: PlaceProps[];
  handleClickPolygon: () => void;
  userLocation: Coord | null;
}

export default function MapTemplate({ challengeLocationData, handleClickPolygon, userLocation }: MapTemplateProps) {
  return (
    <SafeAreaView style={styles.container}>
      <NaverMapView
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
          userLocation !== null ? { ...userLocation, zoom: 14 } : { latitude: 37.5665, longitude: 126.978, zoom: 10 }
        }
        isExtentBoundedInKorea={true}
      >
        {challengeLocationData.map(item => (
          <View key={item.name}>
            {/* Polygon 그리기*/}
            <NaverMapPolygonOverlay
              key={`${item.name}-polygon`}
              coords={item.location} // 위도, 경도값 전달
              onTap={handleClickPolygon}
              outlineWidth={3}
              outlineColor={MCOLORS.brand.secondary}
              color={'#FFF9F9'}
              globalZIndex={100000} // 숫자 높게 설정
              zIndex={100000} // 마커(텍스트)보다 값 작게 설정
            />
            {/* 캡션 렌더링 */}
            <NaverMapMarkerOverlay
              key={`${item.name}-marker`}
              latitude={item.center.latitude}
              longitude={item.center.longitude}
              image={require('../../assets/images/map/transparent.png')}
              caption={{
                text: item.name,
                color: MCOLORS.brand.secondary,
                textSize: 13,
                align: 'Center',
                minZoom: 11, // 최소 줌 레벨 이하일 때는 글씨 안 보이게
              }}
            />
          </View>
        ))}
      </NaverMapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
