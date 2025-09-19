// 지역명과 한글명을 매핑하는 상수 및 타입 정의
export const REGIONS = [
  { eng: 'Seoul', kor: '서울' },
  { eng: 'Incheon', kor: '인천' },
  { eng: 'Gyeonggi-West', kor: '경기 서부' },
  { eng: 'Gyeonggi-East', kor: '경기 동부' },
  { eng: 'Gyeonggi-North', kor: '경기 북부' },
  { eng: 'Gyeonggi-South', kor: '경기 남부' },
  { eng: 'Gangwon', kor: '강원' },
  { eng: 'Chungbuk', kor: '충북' },
  { eng: 'Chungnam', kor: '충남' },
  { eng: 'Jeonbuk', kor: '전북' },
  { eng: 'Gwangju-Jeonnam', kor: '광주/전남' },
  { eng: 'Daegu-Gyeongbuk', kor: '대구/경북' },
  { eng: 'Busan-Ulsan-Gyeongnam', kor: '부산/울산/경남' },
  { eng: 'Ulleungdo', kor: '울릉도' },
  { eng: 'Jejudo', kor: '제주도' },
] as const;

// 각 언어별 이름 배열 생성
export const REGION_NAME = REGIONS.map(region => region.eng);
export const REGION_NAME_KOR = REGIONS.map(region => region.kor);

// 타입 정의
export type RegionName = typeof REGION_NAME[number];
export type RegionNameKor = typeof REGION_NAME_KOR[number];

export const REGION_MAP_ENG_TO_KOR = REGIONS.reduce((acc, region) => {
  acc[region.eng] = region.kor;
  return acc;
}, {} as Record<RegionName, RegionNameKor>);

export const REGION_MAP_KOR_TO_ENG = REGIONS.reduce((acc, region) => {
  acc[region.kor] = region.eng;
  return acc;
}, {} as Record<RegionNameKor, RegionName>);