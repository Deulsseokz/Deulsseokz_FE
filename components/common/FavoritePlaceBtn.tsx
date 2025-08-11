import { BASE_URL } from "@env";
import axios from "axios";
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface FavoritePlaceProps {
  place: string; // 장소 이름
  isFavorite: boolean; // 해당 장소가 관심장소로 등록 되어 있는지 여부 (props로 미리 받은 값)
}

// 개별 관심 장소 등록/ 삭제를 관리하는 컴포넌트
export default function FavoritePlaceBtn({ place, isFavorite }: FavoritePlaceProps) {
  const [filled, setFilled] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFill = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const data = await axios.post(`${BASE_URL}/place/favorite`, {
        "place": place,
        isFavorite: !filled,
      })

      // 2. 성공 시 상태 반영
      if (data.data.isSuccess) setFilled(!filled);
      else Alert.alert("관심 장소 등록에 실패하였습니다.")
    } catch (e) {
      console.error('토글 실패', e);
    } finally {
      setLoading(false);
    }
  };

  // 부모에서 넘겨준 상태값과 동기화
  useEffect(()=>{
    setFilled(isFavorite);
  }, [isFavorite]);

  const imageSource = filled
    ? require('@/assets/images/icon/icon-heart-filled.png')
    : require('@/assets/images/icon/icon-heart-empty.png');

  return (
    <TouchableOpacity onPress={toggleFill}>
      <Image source={imageSource} style={styles.heart} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heart: {
    height: 28,
    width: 28,
  },
});
