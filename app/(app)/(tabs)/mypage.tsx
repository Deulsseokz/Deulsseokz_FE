import { getMyPageInfo } from "@/api/mypage";
import MyPageTemplate from "@/components/template/MyPageTemplate";
import { useBadge } from "@/store/useBadgeStore";
import { useEffect } from "react";

export default function MyPageScreen() {
  const {init} = useBadge();

 /** API fetch */
 const fetchMyPageInfo = async () => {


    // 마이페이지 정보 조회
    const { result } = await getMyPageInfo();

    // 배지 아이디 추출
    // TODO : 첫 회원가입시 배지 1을 기본값으로 주는 로직 추가 필요
    const badgeId = result.badgeId!==null ? result.badgeId : "1";

    // 유저 배지 리스트 초기화
    init(badgeId as string);
 }

 /** lifecycle */
 useEffect(()=>{
  fetchMyPageInfo();
 }, []);

  return <MyPageTemplate/>;
}
