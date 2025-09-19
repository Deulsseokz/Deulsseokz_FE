import { getChallengeCompletion, getChallengeLocal } from "@/api/mypage";
import { RegionConquerStatusResponse } from "@/api/type";
import { ChallengeCompletionStatus, RegionConquerRateList } from "@/components/mypage/_type";
import MyPageMissionTemplate from "@/components/template/MyPageMissionTemplate";
import { RegionName } from "@/constants/map/regionMap";
import { useCallback, useEffect, useState } from "react";

export default function MissionScreen() {
  const [localConquerStatus, setLocalConquerStatus] = useState<RegionConquerRateList>(
    {} as RegionConquerRateList
  );
  const [challengeCompletionStatus, setChallengeCompletionStatus] = useState<ChallengeCompletionStatus>(
    {} as ChallengeCompletionStatus
  );

  /** utils */
  // API 응답을 ChallengeCompletionStatus 타입으로 변환
  function toChallengeCompletionStatus(data: RegionConquerStatusResponse): ChallengeCompletionStatus {
    const regionName = {} as ChallengeCompletionStatus["regionName"];

    Object.values(data).forEach((item: any) => {
      regionName[item.regionName as RegionName] = item.challenges;
    });

    return { regionName };
  }

  /** api */
  const fetchLocalConquerStatus = useCallback(async () => {
    try {
      const res = await getChallengeLocal();
      if (res.isSuccess) {
        setLocalConquerStatus(res.result as RegionConquerRateList);
      }
    } catch (error) {
      console.error("Error fetching local conquer status:", error);
    }
  }, []);

  const fetchChallengeCompletionStatus = useCallback(async () => {
    try {
      const res = await getChallengeCompletion();
      if (res.isSuccess) {
        const normalized = toChallengeCompletionStatus(res.result as RegionConquerStatusResponse);
        setChallengeCompletionStatus(normalized);
      }
    } catch (error) {
      console.error("Error fetching challenge completion status:", error);
    }
  }, []);

  /** life cycle */
  useEffect(() => {
    (async () => {
      await fetchLocalConquerStatus();
      await fetchChallengeCompletionStatus();
    })();
  }, []);

  return (
    <MyPageMissionTemplate
      localConquerStatus={localConquerStatus}
      challengeCompletionStatus={challengeCompletionStatus}
    />
  );
}
