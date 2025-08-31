import IconClose from "@/assets/icons/icon-close-black.svg";
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface CustomModalProps {
  visible: boolean;
  onClose?: () => void;
  onDismiss?: () => void;
  children: React.ReactNode;
}

export default function CustomModal({ visible, onClose, children , onDismiss}: CustomModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      onDismiss={onDismiss}
    >
      <View style={styles.bg}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <IconClose width={28} height={28} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 19,
    minWidth: 200,
    alignItems: "center",
    display:"flex",
  },
  closeBtn: {
    alignSelf: 'flex-end',
  },
});