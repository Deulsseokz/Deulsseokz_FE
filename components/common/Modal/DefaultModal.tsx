import { BtnKind } from "@/types/btnAttributes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../PrimaryButton";

interface DefaultModalProps {
  /** 모달 제목 */
  title: string;
  /** 설명 */
  desc?: string;
  /** 자식 요소 (아이콘, 인풋 등) */
  children: React.ReactNode;
  /** 주요 액션 버튼 (enabled 고정) */
  buttons?: {
    /** 버튼 텍스트 */
    text: string;
    /** 버튼 클릭 시 실행 함수 */
    onPress: () => void;
  };
  /** 서브 옵션 버튼들 (btnKind 필요) */
  options?: {
    /** 버튼 스타일 종류 */
    types: BtnKind;
    /** 버튼 텍스트 */
    text: string;
    /** 버튼 클릭 시 실행 함수 */
    onPress: () => void;
  }[];
}

/**
 * 하단 버튼, 옵션을 제공하는 기본 모달 컴포넌트
 */
export default function DefaultModal({
  title,
  desc,
  children,
  buttons,
  options,
}: DefaultModalProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {desc && <Text style={styles.desc}>{desc}</Text>}
      </View>
      {children}

      {buttons && (
        <PrimaryButton
          kind="status-enabled"
          text={buttons.text}
          onPress={buttons.onPress}
        />
      )}

      {options && (
        <View style={styles.optionsWrapper}>
          {options.map((option, idx) => (
            <PrimaryButton
              key={idx}
              kind={option.types}
              size="small"
              text={option.text}
              onPress={option.onPress}
            />
          ))}
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 310,
    minHeight: 320,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 55,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 24,
    textAlign: "center",
  },
  desc: {
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 20,
    color: "#313131",
    textAlign: "center",
    paddingTop: 6,
    paddingBottom: 18,
  },
  optionsWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 27,
   justifyContent: "space-around",
  },

});
