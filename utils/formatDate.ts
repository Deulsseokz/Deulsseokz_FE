/**
 * 날짜 포맷팅 유틸 함수
 * YYYY년 MM월 DD일 형태로 변환
 */ 
export function formatDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}
