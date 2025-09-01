import { ChallengeListItem } from "@/api/type";
import { ChallengeLocation } from '@/types/challenge';
import { convertRawChallengeData } from '@/utils/convertRawChallengeData';
import { create } from 'zustand';

/**
 * @description 챌린지 정보를 불러와 저장합니다
 */

interface ChallengeStore {
  data: ChallengeLocation[] | null; // 데이터
  loading: boolean; // 로딩 여부
  fetchData: () => Promise<void>; // fetch 함수
}

export const useChallengeListStore = create<ChallengeStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    const { data } = get();

    set({ loading: true });

    // const {result} = await fetchChallengeList(); // CommonResponse<ServerChallengeListItem[]>
    const result = [
  {
    "challengeId": 1,
    "placeName": "광화문광장",
    "isChallenged": false,
    "center": { "lat": 37.5759, "lng": 126.9768 }
  },
  {
    "challengeId": 2,
    "placeName": "경복궁",
    "isChallenged": true,
    "center": { "lat": 37.5796, "lng": 126.9770 }
  },
  {
    "challengeId": 3,
    "placeName": "덕수궁",
    "isChallenged": false,
    "center": { "lat": 37.5663, "lng": 126.9751 }
  },
  {
    "challengeId": 4,
    "placeName": "청계천",
    "isChallenged": true,
    "center": { "lat": 37.5695, "lng": 126.9778 }
  },
  {
    "challengeId": 5,
    "placeName": "세종문화회관",
    "isChallenged": false,
    "center": { "lat": 37.5724, "lng": 126.9757 }
  },
  {
    "challengeId": 6,
    "placeName": "서울시청",
    "isChallenged": true,
    "center": { "lat": 37.5660, "lng": 126.9784 }
  },
  {
    "challengeId": 7,
    "placeName": "남대문시장",
    "isChallenged": false,
    "center": { "lat": 37.5596, "lng": 126.9770 }
  },
  {
    "challengeId": 8,
    "placeName": "종묘",
    "isChallenged": true,
    "center": { "lat": 37.5740, "lng": 126.9946 }
  },
  {
    "challengeId": 9,
    "placeName": "창덕궁",
    "isChallenged": false,
    "center": { "lat": 37.5794, "lng": 126.9910 }
  },
  {
    "challengeId": 10,
    "placeName": "창경궁",
    "isChallenged": true,
    "center": { "lat": 37.5789, "lng": 126.9955 }
  },
  {
    "challengeId": 11,
    "placeName": "북촌한옥마을",
    "isChallenged": false,
    "center": { "lat": 37.5826, "lng": 126.9830 }
  },
  {
    "challengeId": 12,
    "placeName": "인사동",
    "isChallenged": true,
    "center": { "lat": 37.5740, "lng": 126.9857 }
  },
  {
    "challengeId": 13,
    "placeName": "광장시장",
    "isChallenged": false,
    "center": { "lat": 37.5702, "lng": 127.0010 }
  },
  {
    "challengeId": 14,
    "placeName": "동대문",
    "isChallenged": true,
    "center": { "lat": 37.5715, "lng": 127.0090 }
  },
  {
    "challengeId": 15,
    "placeName": "흥인지문",
    "isChallenged": false,
    "center": { "lat": 37.5714, "lng": 127.0099 }
  },
  {
    "challengeId": 16,
    "placeName": "종각",
    "isChallenged": true,
    "center": { "lat": 37.5699, "lng": 126.9828 }
  },
  {
    "challengeId": 17,
    "placeName": "명동성당",
    "isChallenged": false,
    "center": { "lat": 37.5630, "lng": 126.9870 }
  },
  {
    "challengeId": 18,
    "placeName": "명동거리",
    "isChallenged": true,
    "center": { "lat": 37.5635, "lng": 126.9825 }
  },
  {
    "challengeId": 19,
    "placeName": "남산서울타워",
    "isChallenged": false,
    "center": { "lat": 37.5512, "lng": 126.9882 }
  },
  {
    "challengeId": 20,
    "placeName": "남산공원",
    "isChallenged": true,
    "center": { "lat": 37.5508, "lng": 126.9905 }
  }
] as ChallengeListItem[];


    const converted: ChallengeLocation[] = result.map((item: ChallengeListItem

    ) =>
      convertRawChallengeData(item)
    );
    set({ data: converted, loading: false });
  },
}));
