import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import { ImageSourcePropType } from "react-native";

/** 폴라로이드 한 장에 대한 공통 데이터 타입 */
export interface PolaroidPhoto {
  /** 식별자  */
  id: string;
  /** 이미지 소스 (require 또는 { uri }) */
  image: ImageSourcePropType;
  /** 부가 정보: 날씨, 기분, 설명 */
  additional: {
    /** 날씨 상태 (예: 맑음, 흐림) */
    weather: WeatherType;
    /** 사용자의 기분 상태 (예: 기쁨, 슬픔) */
    feeling: FeelingType;
    /** 텍스트 설명 */
    desc: string;
  };
  /** 촬영 날짜 */
  date: string;
}

/** Polaroid 컴포넌트에 전달되는 공용 props 타입 */
export interface PolaroidProps {
  /** 사진 1장의 전체 정보 객체 */
  photo: PolaroidPhoto;
}

/** Polaroid 컴포넌트 임시 더미 데이터 */
export const dummyPhoto: PolaroidPhoto = {
  id: "1",
  image: require("@/assets/images/photo1.jpg"),
  additional: {
    feeling: "😁",
    weather: "☁️",
    desc: "오늘은 흐림, 기분도 다운!",
  },
  date: "2025.07.13",
};
