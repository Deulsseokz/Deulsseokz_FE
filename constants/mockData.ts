// src/constants/mockData.ts

export interface Landmark {
  name: string;
  conquered: boolean;
}

export const MOCK_LANDMARKS: Record<string, Landmark[]> = {
  '서울': [
    { name: '경복궁', conquered: true },
    { name: '여의도한강공원', conquered: true },
    { name: '청계천', conquered: true },
    { name: '익선동 한옥거리', conquered: true },
    { name: '커먼그라운드', conquered: false },
    { name: 'DDP', conquered: false },
  ],
  '인천': [
    { name: '송도 센트럴파크', conquered: true },
    { name: '차이나타운', conquered: false },
  ],
  '경기 서부': [
    { name: '수원 화성', conquered: true },
    { name: '광명동굴', conquered: false },
  ],
};

export const REGIONS = Object.keys(MOCK_LANDMARKS);