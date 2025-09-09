import { ImageSourcePropType } from "react-native";

/**
 * myPage의 라우트 아이템
 */
export type MenuItem = {
  label: string;
  route: string;
  icon : ImageSourcePropType;
};

/**
 * myPage 메인의 버튼 아이템
 */
export type BtnItem = {
  label: string;
};