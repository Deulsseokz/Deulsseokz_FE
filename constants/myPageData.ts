import { MenuItem } from "@/components/mypage/_type";

// 페이지 이동용 리스트
export const myPageMenu = [
  { label: '포인트', route: 'point', icon : require('@/assets/images/mypage/icon-point.png')},
  { label: '배지', route: 'badge', icon : require('@/assets/images/mypage/icon-badge.png')},
  { label: '관심 장소', route: 'favorite', icon : require('@/assets/images/mypage/icon-favorite.png')},
  { label: '친구 관리', route: 'friend', icon : require('@/assets/images/mypage/icon-friend.png')},
] as MenuItem[];

// 단순 액션 버튼
export const myPageBtn = [
  {label: '로그아웃'},
   {label: '탈퇴하기'},
]