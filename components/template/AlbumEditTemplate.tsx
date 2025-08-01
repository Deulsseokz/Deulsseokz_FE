import EmojiSelector from '@/components/album/EmojiSelector';
import { PrimaryButton } from '@/components/common/Button/PrimaryButton';
import { TopBar } from '@/components/common/TopBar';
import { ButtonVariant } from "@/constants/buttonTypes";
import { FeelingType } from '@/types/feeling';
import { WeatherType } from '@/types/weather';
import React from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

interface AlbumEditTemplateProps {
  isSaveEnabled?: boolean;
  imageSource: any;
  feelings: FeelingType[];
  weathers: WeatherType[];
  selectedFeeling: FeelingType;
  selectedWeather: WeatherType;
  desc: string;
  onChangeFeeling: (val: FeelingType) => void;
  onChangeWeather: (val: WeatherType) => void;
  onChangeDesc: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

/** 앨범 편집 템플릿
 * @param isSaveEnabled - 저장 버튼 활성화 여부
 * @param isSaveEnabled - 저장 버튼 활성화 여부
 * @param imageSource - 편집할 이미지 소스
 * @param feelings - 기분 이모지 리스트
 * @param weathers - 날씨 이모지 리스트
 * @param selectedFeeling - 선택된 기분
 * @param selectedWeather - 선택된 날씨
 * @param desc - 작성한 인풋 텍스트
 * @param onChangeFeeling - 기분 변경 핸들러
 * @param onChangeWeather - 날씨 변경 핸들러
 * @param onChangeDesc - 인풋 텍스트 변경 핸들러
 * @param onSave - 저장 버튼 핸들러
 * @param onCancel - 취소 버튼 핸들러
 * 
 * 
 */
export default function AlbumEditTemplate({
  isSaveEnabled,
  imageSource,
  feelings,
  weathers,
  selectedFeeling,
  selectedWeather,
  desc,
  onChangeFeeling,
  onChangeWeather,
  onChangeDesc,
  onSave,
  onCancel,
}: AlbumEditTemplateProps) {
  return (
    <View style={styles.page}>
      <TopBar title="" />
      <View style={styles.container}>
        <Image source={imageSource} style={styles.mainImage} />
        <View style={styles.input_container}>
          <EmojiSelector<FeelingType>
            label="기분"
            options={feelings}
            selected={selectedFeeling}
            onSelect={onChangeFeeling}
          />
          <EmojiSelector<WeatherType>
            label="날씨"
            options={weathers}
            selected={selectedWeather}
            onSelect={onChangeWeather}
          />
          <TextInput
            style={styles.input}
            multiline
            placeholder="오늘은 무슨 일이 있었나요?"
            value={desc}
            onChangeText={onChangeDesc}
          />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton variant={ButtonVariant.Subtle} text="취소" onPress={onCancel} />
          <PrimaryButton variant={ isSaveEnabled ? ButtonVariant.Primary : ButtonVariant.Disable} text="저장" onPress={onSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input_container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    gap: 15,
  },
  mainImage: {
    width: 118,
    height: 147,
  },
  input: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    height: 200,
    padding: 20,
    fontSize: 15,
    lineHeight: 20,
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 18,
  },
});
