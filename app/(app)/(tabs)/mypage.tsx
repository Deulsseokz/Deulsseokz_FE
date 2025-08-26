import MyPageTemplate from "@/components/template/MyPageTemplate";
import { useBadge } from "@/store/useBadgeStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { ActivityIndicator } from "react-native";

export default function MyPageScreen() {
  // 프로필 정보 스토어 데이터
  const data =useProfileStore(s => s.data);
  // 초기 프로필 정보 불러오기 함수
  const fetchMyPageInfo = useProfileStore(s => s.fetchMyPageInfo);
  const error = useProfileStore(s => s.error);
  // 로딩 상태
  const loading =useProfileStore(s => s.loading);

  // 배지 스토어 초기화 및 상태
  const { init } = useBadge();
  const badgeLoading = useBadge(s => s.loading);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        // 최초 진입 혹은 TTL 만료 시에만 프로필 데이터 get
        const profile = await fetchMyPageInfo({ ttlMs: 3000 })
        // 배지 스토어는 여기서 init 1회만
        if (profile?.badgeId) {
          await init(profile.badgeId)
        }
        else if (error) alert(error);
      })()
    }, [fetchMyPageInfo, init])
)

  if ((loading || badgeLoading) && !data) return <ActivityIndicator />;

  return (
    <MyPageTemplate/>
  )
}