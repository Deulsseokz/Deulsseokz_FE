import { FrameType } from "@/types/shareType";
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