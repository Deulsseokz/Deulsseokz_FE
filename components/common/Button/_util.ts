import { ButtonSize, ButtonVariant } from "@/constants/buttonTypes";
import { MCOLORS } from "@/constants/Colors";
import { ButtonStyle } from "@/types/btnStyle";

/**
 * 버튼 스타일링 매핑하는 Record
 */
export const BUTTON_STYLE_MAP: Record<ButtonVariant, ButtonStyle> = {
  [ButtonVariant.Primary]: {
    backgroundColor: MCOLORS.brand.secondary,
    textColor: MCOLORS.grayscale.gray0,
  },
  [ButtonVariant.Subtle]: {
    backgroundColor: '#f3f3f3',
    textColor: MCOLORS.grayscale.gray30,
    borderColor: MCOLORS.grayscale.gray10,
    borderWidth: 1,
  },
  [ButtonVariant.Disable]: {
    backgroundColor: MCOLORS.grayscale.gray30,
    textColor: MCOLORS.grayscale.gray0,
    borderColor: MCOLORS.grayscale.gray30,
    borderWidth: 1,
  },
};

/**
 * 버튼 사이즈 매핑
 */
export const SIZE_STYLE_MAP= {
  [ButtonSize.Default]: {
    width: 135,
    height: 44,
  },
  [ButtonSize.Small]: {
    width: 100,
    height: 44,
  },
}