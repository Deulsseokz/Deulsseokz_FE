import { ModalType } from "@/enums/modalTypes";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import DefaultModal from "./DefaultModal";

interface ModalManagerProps {
  /** 현재 모달이 표시 중인지 여부 */
  isShowing: boolean;
  /** 표시할 모달의 타입 */
  modalType: ModalType | null;
  /** 모달에 전달할 props */
  modalProps: any;
  /** 모달을 닫을 때 호출되는 함수 */
  onClose: () => void;
}

/**
 * modalType에 따라 적절한 모달 컴포넌트를 렌더링
 */
export default function ModalManager({
  isShowing,
  modalType,
  modalProps,
  onClose,
}: ModalManagerProps) {
  if (!isShowing || !modalType) return null;

  const renderModal = () => {
    switch (modalType) {
      case ModalType.DEFAULT:
        return <DefaultModal {...modalProps} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      transparent
      visible={isShowing}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>{renderModal()}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});
