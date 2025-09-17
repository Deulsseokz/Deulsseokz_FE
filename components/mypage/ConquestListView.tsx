// src/components/mypage/mission/ConquestListView.tsx
import { MCOLORS } from "@/constants/colors";
import fontStyles from '@/constants/fonts';
import { REGION_MAP_KOR_TO_ENG, REGION_NAME, REGION_NAME_KOR, RegionName } from "@/constants/map/regionMap";
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChallengeCompletionStatus } from "./_type";

interface ConquestListViewProps {
  challengeCompletionStatus: ChallengeCompletionStatus;
}

export default function ConquestListView({ challengeCompletionStatus }: ConquestListViewProps) {
  const [selectedRegion, setSelectedRegion] = useState<RegionName>(REGION_NAME[0]);

  return (
    <View style={styles.container}>
      {/* 지역 리스트 */}
      <ScrollView style={styles.regionList} showsVerticalScrollIndicator={false}>
        {REGION_NAME_KOR.map((regionKor) => {
          const regionEng = REGION_MAP_KOR_TO_ENG[regionKor];
          return (
            <TouchableOpacity
              key={regionKor}
              style={[
                styles.regionButton,
                selectedRegion === regionEng && styles.activeRegionButton,
              ]}
              onPress={() => setSelectedRegion(regionEng)}
            >
              <Text
                style={[
                  styles.regionText,
                  selectedRegion === regionEng && styles.activeRegionText,
                ]}
              >
                {regionKor}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* 선택된 지역의 랜드마크 */}
      <ScrollView style={styles.landmarkList} showsVerticalScrollIndicator={false}>
        <View style={styles.landmarkContainer}>
          {challengeCompletionStatus.regionName?.[selectedRegion] &&
            Object.entries(challengeCompletionStatus.regionName[selectedRegion]).map(
              ([placeName, conquered]) => (
                <View
                  key={placeName}
                  style={[
                    styles.landmarkChip,
                    conquered && styles.conqueredLandmark,
                  ]}
                >
                  <Text
                    style={[
                      styles.landmarkText,
                      conquered && styles.conqueredLandmarkText,
                    ]}
                  >
                    {placeName}
                  </Text>
                </View>
              )
            )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '85%', 
  },
  regionList: {
    borderRightWidth: 1,
    borderRightColor: MCOLORS.grayscale.gray5,
    width: '40%'
  },
  regionButton: {
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
  activeRegionButton: {
    backgroundColor: MCOLORS.brand.secondary,
  },
  regionText: {
    ...fontStyles.medium13,
    color: MCOLORS.grayscale.gray30,
  },
  activeRegionText: {
    ...fontStyles.medium13,
    color: '#FFF',
  },
  landmarkList: {
    paddingLeft: 8,
  },
  landmarkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  landmarkChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#f8f8f8',
    borderRadius:30,
  },
  conqueredLandmark: {
    backgroundColor: 'rgba(247, 111, 142, 0.1)', // #F76F8E의 10%
    borderWidth: 1,
    borderColor: '#FFF3F6',
  },
  landmarkText: {
    ...fontStyles.medium13,
    color: MCOLORS.grayscale.gray30,
  },
  conqueredLandmarkText: {
    color: MCOLORS.brand.secondary,
    ...fontStyles.bold15,
  },
});
