import { getUserBadgeList } from "@/api/badge";
import { getMyPageInfo } from "@/api/mypage";
import MyPageTemplate from "@/components/template/MyPageTemplate";
import { useBadge } from "@/store/useBadgeStore";
import { useEffect } from "react";

export default function MyPageScreen() {
  const {init, setRepresentative} = useBadge();

 /** API fetch */
 const fetchMyPageInfo = async () => {
  const {result} = await getMyPageInfo();

  // 사용자 배지 초기화
  init();
  // GET 해 온 마이페이지 정보를 통해 대표 배지 설정
  // setRepresentative()
 }

 /** lifecycle */
 useEffect(()=>{
  fetchMyPageInfo();
  getUserBadgeList();
 }, []);

  return <MyPageTemplate/>;
}
