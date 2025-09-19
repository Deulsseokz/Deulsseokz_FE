import { REGION_MAP_ENG_TO_KOR, RegionNameKor } from "@/constants/map/regionMap";
import { getConquestColor } from "@/utils/colorRegionMapUtils";
import React from 'react';
import { StyleSheet, View } from 'react-native';

import BusanUlsanGyeongnamSvg from '@/assets/images/map/places/Busan-Ulsan-Gyeongnam.svg';
import ChungbukSvg from '@/assets/images/map/places/Chungbuk.svg';
import ChungnamSvg from '@/assets/images/map/places/Chungnam.svg';
import DaeguGyeongbukSvg from '@/assets/images/map/places/Daegu-Gyeongbuk.svg';
import GangwonSvg from '@/assets/images/map/places/Gangwon.svg';
import GwangjuJeonnamSvg from '@/assets/images/map/places/Gwangju-Jeonnam.svg';
import GyeonggiEastSvg from '@/assets/images/map/places/Gyeonggi-East.svg';
import GyeonggiNorthSvg from '@/assets/images/map/places/Gyeonggi-North.svg';
import GyeonggiSouthSvg from '@/assets/images/map/places/Gyeonggi-South.svg';
import GyeonggiWestSvg from '@/assets/images/map/places/Gyeonggi-West.svg';
import IncheonSvg from '@/assets/images/map/places/Incheon.svg';
import JejudoSvg from '@/assets/images/map/places/Jejudo.svg';
import JeonbukSvg from '@/assets/images/map/places/Jeonbuk.svg';
import SeoulSvg from '@/assets/images/map/places/Seoul.svg';
import UlleungdoSvg from '@/assets/images/map/places/Ulleungdo.svg';
import { RegionConquerRateList } from "./_type";

// SVG 컴포넌트를 한글 지역 이름과 매핑하는 객체
const RegionSvgComponents: { [key in RegionNameKor]: React.FC<{ fill: string }> } = {
  '서울': SeoulSvg,
  '인천': IncheonSvg,
  '경기 서부': GyeonggiWestSvg,
  '경기 동부': GyeonggiEastSvg,
  '경기 북부': GyeonggiNorthSvg,
  '경기 남부': GyeonggiSouthSvg,
  '강원': GangwonSvg,
  '충북': ChungbukSvg,
  '충남': ChungnamSvg,
  '전북': JeonbukSvg,
  '광주/전남': GwangjuJeonnamSvg,
  '대구/경북': DaeguGyeongbukSvg,
  '부산/울산/경남': BusanUlsanGyeongnamSvg,
  '울릉도': UlleungdoSvg,
  '제주도': JejudoSvg,
};

// 지도를 완성하기 위한 각 svg별 위치 좌표 (top, left)
const regionPositions: Record<string, { top: number; left: number }> = {
    '서울': { top: 119, left: 100 },
    '인천': { top: 125, left: 70 },
    '경기 북부': { top: 73, left: 85 },
    '경기 동부': { top: 120, left: 120 },
    '경기 서부': { top: 115, left: 83 },
    '경기 남부': { top: 132, left: 90 },
    '강원': { top: 71, left: 126 },
    '충북': { top: 160, left: 123 },
    '충남': { top: 162, left: 54 },
    '전북': { top: 242, left: 68 },
    '광주/전남': { top: 280, left: 54 },
    '대구/경북': { top: 165, left: 155 },
    '부산/울산/경남': { top: 250, left: 130 },
    '제주도': { top: 380, left: 120 },
    '울릉도': { top: 150, left: 270 },
};

interface ConquestMapViewProps {
  localConquerStatus: RegionConquerRateList
}

export default function ConquestMapView({ localConquerStatus }: ConquestMapViewProps) {

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {Object.entries(localConquerStatus).map(([englishName]) => {
          const koreanName = REGION_MAP_ENG_TO_KOR[englishName];
          const SvgComponent = RegionSvgComponents[koreanName];
          const fillColor = getConquestColor(localConquerStatus[englishName] || 0);
          const positionStyle = regionPositions[koreanName];

                    if (SvgComponent && positionStyle) {
                        return (
                            <View key={koreanName} style={[styles.regionWrapper, positionStyle]}>
                                <SvgComponent color={fillColor}/>
                            </View>
                        );
                    }
                    return null;
                })}
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    mapContainer: {
        position: 'relative',
        width: 320, 
        height: 480, 
        backgroundColor: '#f4f4f4', // 지도 영역 확인용 배경색
        borderRadius: 10,
    },
    regionWrapper: {
        position: 'absolute', 
    },
});