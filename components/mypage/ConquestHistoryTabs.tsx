// src/components/mypage/mission/ConquestHistoryTabs.tsx
import fontStyles from '@/constants/fonts';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Tab = 'list' | 'map';

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function ConquestHistoryTabs({ activeTab, onTabChange }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onTabChange('list')}>
        <Text style={[styles.tab, activeTab === 'list' && styles.activeTab]}>
          리스트로 보기
        </Text>
      </TouchableOpacity>
      <Text style={styles.separator}>|</Text>
      <TouchableOpacity onPress={() => onTabChange('map')}>
        <Text style={[styles.tab, activeTab === 'map' && styles.activeTab]}>
          장소로 보기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tab: {
    ...fontStyles.medium13,
    color: '#8e8e8e',
  },
  activeTab: {
    ...fontStyles.bold15,
    color: '#4a4a4a',
  },
  separator: {
    color: '#dcdcdc',
  },
});