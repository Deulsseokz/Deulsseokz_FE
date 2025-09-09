import { getMyPointHistory } from "@/api/mypage";
import { MyPointHistoryResponse } from "@/api/type";
import MyPagePointTemplate from "@/components/template/MyPagePointTemplate";
import { useEffect, useState } from "react";

export default function PointScreen() {
  const [result, setResult] = useState<MyPointHistoryResponse | null>(null);

  useEffect(() => {
    const getPointHistory = async () => {
      const { result } = await getMyPointHistory();
      setResult(result);
    };
    getPointHistory();
  }, []);

  if (!result) return null;

  return (
    <MyPagePointTemplate holdingPoint={result.holdingPoint} pointLogs={result.pointLogs} />
  );
}