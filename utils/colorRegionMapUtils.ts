export const getConquestColor = (percentage: number): string => {
  if (percentage === 0) return '#e7e7e7ff';
  if (percentage > 0 && percentage <= 30) return '#FDD4DD';
  if (percentage > 30 && percentage <= 60) return '#FAA9BB';
  if (percentage > 60 && percentage <= 90) return '#F98CA5';
  if (percentage > 90 && percentage <= 100) return '#F76F8E';
  return '#F4F4F4'; // 기본값
};