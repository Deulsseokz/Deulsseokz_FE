import { ButtonSize, ButtonVariant } from "@/constants/buttonTypes";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { BUTTON_STYLE_MAP, SIZE_STYLE_MAP } from "./_util";

interface PrimaryButtonProps {
  variant : ButtonVariant; // PRIMARY / SUBTLE / DISABLE
  size?: ButtonSize; // default: normal size
  text: string; // 버튼 텍스트
  onPress: ()=>void; // 클릭 핸들러 함수
}

/**
 * 
 * @param variant: 버튼 종류 3가지 중 택 1
 * @param size: 버튼 사이즈 2가지 (디폴트: normal size)
 * @param text: 버튼 텍스트
 * @param onPress: 버튼 클릭 핸들러
 * @returns PrimaryButton
 */
export function PrimaryButton({ variant, size=ButtonSize.Default, text, onPress }: PrimaryButtonProps) {
  const styleConfig= BUTTON_STYLE_MAP[variant];
  const sizeConfig = SIZE_STYLE_MAP[size];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      onPress={onPress}
      disabled={variant===ButtonVariant.Disable}
       style={[
        styles.baseButton,
    {
      ...styleConfig,
      ...sizeConfig,
    },
    // border 속성은 존재하면 적용
    styleConfig.borderColor && styleConfig.borderWidth
      ? {
          borderColor: styleConfig.borderColor,
          borderWidth: styleConfig.borderWidth,
        }
      : {},
  ]}
      activeOpacity={0.8}
    >
     <Text
        style={[styles.baseText,{
          color: styleConfig.textColor,
        }]}
      >{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'Pretendard-Semibold',
    fontSize: 15,
  },
});