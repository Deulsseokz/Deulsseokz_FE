import { Location } from '@/types/location';

export const LOCATION_DATA: Location[] = [
  {
    area: '서울',
    center: { latitude: 37.5665, longitude: 126.978 },
    places: ['남산타워', '홍대', '경복궁', '인사동', '국립현대미술관', '코엑스'],
  },
  {
    area: '경기도',
    center: { latitude: 37.4138, longitude: 127.5183 },
    places: ['에버랜드', '수원화성', '서울대공원', '광명동굴', '남한산성'],
  },
  {
    area: '강원도',
    center: { latitude: 37.8228, longitude: 128.1555 },
    places: ['설악산', '강릉 경포대', '속초해수욕장', '춘천 남이섬', '대관령 양떼목장'],
  },
  {
    area: '경상도',
    center: { latitude: 35.4606, longitude: 128.2132 },
    places: ['해운대', '경주 불국사', '감천문화마을', '동성로', '문경새재'],
  },
  {
    area: '충청도',
    center: { latitude: 36.6357, longitude: 127.4917 },
    places: ['공주 공산성', '청남대', '단양 도담삼봉', '계룡산 국립공원', '보령 대천해수욕장'],
  },
  {
    area: '전라도',
    center: { latitude: 35.7175, longitude: 127.153 },
    places: ['전주한옥마을', '여수 해상케이블카', '담양 죽녹원', '순천만 습지', '광주 국립아시아문화전당'],
  },
  {
    area: '제주도',
    center: { latitude: 33.4996, longitude: 126.5312 },
    places: ['한라산', '성산일출봉', '협재해수욕장', '섭지코지', '동문시장'],
  },
  {
    area: '울릉도',
    center: { latitude: 37.4842, longitude: 130.905 },
    places: ['독도전망대', '봉래폭포', '도동항', '내수전 일출전망대', '울릉도 해중전망대'],
  },
];
