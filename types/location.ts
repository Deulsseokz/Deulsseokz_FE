import { Coord } from './challenge';

export type Location = {
  area: string;
  center: Coord; // 해당 지역의 중심 좌표
  places: string[]; // 해당 지역에 속하는 챌린지 장소 배열
};
