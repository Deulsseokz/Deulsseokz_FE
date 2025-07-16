import { BadgeType, FrameType } from "@/types/shareType";
import { ImageSourcePropType } from "react-native";

/**
 * 프레임 오버레이 이미지 매핑 객체
 * FrameType: 이미지 리소스
 */
export const frameImageMap: Record<FrameType, ImageSourcePropType> = {
  [FrameType.WHITE]: require("@/assets/images/album/frames/white.png"),
  [FrameType.BLACK]: require("@/assets/images/album/frames/black.png"),
  [FrameType.RAINBOW]: require("@/assets/images/album/frames/rainbow.png"),
  [FrameType.HANDWRITING]: require("@/assets/images/album/frames/handwriting.png"),
};

/**
 * 프레임 아이콘 매핑 객체
 * FrameType: { active, inactive } 이미지 리소스
 */
export const frameIcons = {
  [FrameType.WHITE]: {
    active: require("@/assets/images/album/frameOptions/white-active.png"),
    inactive: require("@/assets/images/album/frameOptions/white-inactive.png"),
  },
  [FrameType.BLACK]: {
    active: require("@/assets/images/album/frameOptions/black-active.png"),
    inactive: require("@/assets/images/album/frameOptions/black-inactive.png"),
  },
  [FrameType.RAINBOW]: {
    active: require("@/assets/images/album/frameOptions/rainbow-active.png"),
    inactive: require("@/assets/images/album/frameOptions/rainbow-inactive.png"),
  },
  [FrameType.HANDWRITING]: {
    active: require("@/assets/images/album/frameOptions/handwriting-active.png"),
    inactive: require("@/assets/images/album/frameOptions/handwriting-inactive.png"),
  },
};

/**
 * 뱃지 이미지 매핑 객체
 * BadgeType: 이미지 리소스 
 */
export const badgeImageMap: Record<BadgeType, any> = {
  [BadgeType.FIRST]: require("@/assets/images/album/badge/first.png"),
  [BadgeType.HANYANG]: require("@/assets/images/album/badge/hanyang.png"),
  [BadgeType.OZI]: require("@/assets/images/album/badge/ozi.png"),
  [BadgeType.GENGHI]: require("@/assets/images/album/badge/genghi.png"),
};

/**
 * 뱃지 아이콘 매핑 객체
 * BadgeType: { active, inactive } 이미지 리소스
 */
export const badgeIcons = {
  [BadgeType.FIRST]: {
    active: require("@/assets/images/album/badgeOptions/first-active.png"),
    inactive: require("@/assets/images/album/badgeOptions/first-inactive.png"),
  },
  [BadgeType.HANYANG]: {
    active: require("@/assets/images/album/badgeOptions/hanyang-active.png"),
    inactive: require("@/assets/images/album/badgeOptions/hanyang-inactive.png"),
  },
  [BadgeType.OZI]: {
    active: require("@/assets/images/album/badgeOptions/ozi-active.png"),
    inactive: require("@/assets/images/album/badgeOptions/ozi-inactive.png"),
  },
  [BadgeType.GENGHI]: {
    active: require("@/assets/images/album/badgeOptions/genghi-active.png"),
    inactive: require("@/assets/images/album/badgeOptions/genghi-inactive.png"),
  },
};
