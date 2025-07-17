import { MCOLORS } from '@/constants/Colors';
import { ChallengeLocation, Coord } from '@/types/challenge';
import { NaverMapMarkerOverlay, NaverMapPolygonOverlay, NaverMapView } from '@mj-studio/react-native-naver-map';
import { StyleSheet, View } from 'react-native';

interface MapTemplateProps {
  // 맵의 폴리곤을 띄우기 위해 필요한 지역별 챌린지 데이터 배열
  challengeLocationData: ChallengeLocation[];
  // 폴리곤 클릭시 -> place 이름을 전달하며 바텀시트 open trigger
  handleClickPolygon: (place: string) => void;
  // 현재 유저의 위치
  userLocation: Coord | null;
}

export default function MapTemplate({ challengeLocationData, handleClickPolygon, userLocation }: MapTemplateProps) {
  return (
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
        // userLocation !== null ? { ...userLocation, zoom: 14 } :
        { latitude: 37.5665, longitude: 126.978, zoom: 10 }
      }
      isExtentBoundedInKorea={true}
    >
      {challengeLocationData.map(item => {
        return (
          <View key={item.place}>
            {/* Polygon 그리기*/}
            <NaverMapPolygonOverlay
              key={`${item.place}-polygon`}
              coords={item.location} // 위도, 경도값 전달
              onTap={() => {
                handleClickPolygon(item.place);
              }}
              outlineWidth={3}
              outlineColor={MCOLORS.brand.secondary}
              color={'#FFF9F9'}
              globalZIndex={100000} // 숫자 높게 설정
              zIndex={100000} // 마커(텍스트)보다 값 작게 설정
            />
            {/* 캡션 렌더링 */}
            <NaverMapMarkerOverlay
              key={`${item.place}-marker`}
              latitude={item.center.latitude}
              longitude={item.center.longitude}
              image={require('../../assets/images/map/transparent.png')}
              caption={{
                text: item.place,
                color: MCOLORS.brand.secondary,
                textSize: 13,
                align: 'Center',
                minZoom: 11, // 최소 줌 레벨 이하일 때는 글씨 안 보이게
              }}
            />
          </View>
        );
      })}
    </NaverMapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
