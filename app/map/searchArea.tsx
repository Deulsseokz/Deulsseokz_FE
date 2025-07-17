import { fetchSearchArea } from '@/api/fetchSearchArea';
import MapSearchAreaTemplate from '@/components/template/map/MapSearchAreaTemplate';
import { router } from 'expo-router';

export default function SearchArea() {
  // 검색 버튼이 눌렸을 때 핸들러
  // params를 구성하여 result 화면으로 연결
  const handleSearch = async (input: string) => {
    const { success, data, error } = await fetchSearchArea(input);

    // TODO : 검색 실패 / 서버 에러를 구분
    // 상황: 검색 실패와 서버 에러를 구분할 수 없음.

    // if (error) {
    //   Alert.alert('검색 실패');
    //   console.log(error);
    //   return;
    // }
    // else {
    router.push({
      pathname: '/map/searchAreaResult',
      params: {
        input: input,
        success: success ? 'true' : 'false', // 문자열을 전달
        result: JSON.stringify({
          area: input,
          places: data,
        }), // 직렬화하여 전달
      },
    });
    // }
    // 검색이 성공적으로 이루어졌을 때 (통신이) 데이터를 얻어서 알맞게 데이터를 구성한후, params로 searcharearesult screen을 push
  };

  return <MapSearchAreaTemplate onSearchBtn={handleSearch} />;
}
