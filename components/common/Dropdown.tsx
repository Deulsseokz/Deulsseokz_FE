import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";


export interface DropdownOption {
  label: string;
  onPress: () => void;
}

interface DropdownProps {
  /** 메뉴 표시 여부 */
  visible: boolean;
  /** 메뉴 닫기 핸들러 */
  onClose: () => void;
  /** 메뉴 옵션들 (label, onPress) */
  options: DropdownOption[];
}

/**
 * 드롭다운 메뉴 컴포넌트
 */
export default function Dropdown({ visible, onClose, options }: DropdownProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuWrapper}>
          {options.map((option, idx) => (
            <Pressable key={idx} onPress={() => { option.onPress(); onClose(); }} style={styles.option}>
              <Text style={styles.optionText}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 70,
    paddingRight: 20,
  },
  menuWrapper: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 21,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    zIndex: 10,
  },
  option: {
    paddingVertical: 12,
    width: 200,
  },
  optionText: {
    fontSize: 15,
    color: '#4A4A4A',
    fontWeight: '500',
  },
});
