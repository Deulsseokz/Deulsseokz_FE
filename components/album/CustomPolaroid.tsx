import { BadgeType, FrameType } from '@/types/shareType';
import { formatDate } from '@/utils/formatDate';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { PolaroidProps } from './_type';
import {
  badgeImageMap,
  feelingImageMap,
  feelingImageMapWhite,
  frameImageMap,
  weatherImageMap,
  weatherImageMapWhite,
} from './_utli';

interface CustomPolaroidProps {
  /** 폴라로이드에 표시할 사진 정보 */
  photo: PolaroidProps['photo'];
  /** 선택된 프레임 타입 */
  frame: FrameType;
  /** 선택된 뱃지 타입 */
  badge?: BadgeType | null;
}

/**
 * 폴라로이드 사진에 프레임을 입힐 수 있는 커스텀 폴라로이드 컴포넌트
 * - FrameType에 따라 오버레이 적용함
 */
export default function CustomPolaroid({ photo, frame, badge }: PolaroidProps & CustomPolaroidProps) {
  const { image, additional, date } = photo;

  const isBlack = frame === FrameType.BLACK || FrameType.LINE;
  const textColor = { color: isBlack ? '#E9E9E9' : '#4A4A4A' };

  const currentFeelingMap = isBlack ? feelingImageMapWhite : feelingImageMap;
  const currentWeatherMap = isBlack ? weatherImageMapWhite : weatherImageMap;

  const feelingIcon = currentFeelingMap[additional.feeling];
  const weatherIcon = currentWeatherMap[additional.weather];

  return (
    <View style={styles.stage}>
      <Shadow distance={5} offset={[1, 2]} startColor="#0000001A">
        <View style={[styles.polaroid, isBlack ? styles.blackFrame : styles.whiteFrame]}>
          <Image source={image} style={styles.image} />
          {frameImageMap[frame] && <Image source={frameImageMap[frame]} style={styles.overlay} />}

          <View>
            <View style={styles.metaRow}>
              {feelingIcon && <Image source={feelingIcon} style={styles.metaIcon} />}
              {weatherIcon && <Image source={weatherIcon} style={styles.metaIcon} />}
            </View>

            <Text style={[styles.desc, textColor]}>{additional.desc}</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.date}>{formatDate(date)}</Text>
            <Text style={styles.loc}>{photo.loc}</Text>
          </View>
        </View>
      </Shadow>

      {badge && badgeImageMap[badge] && <Image source={badgeImageMap[badge]} style={styles.badge} />}
    </View>
  );
}

const CARD_WIDTH = 146;

const styles = StyleSheet.create({
  stage: {
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  polaroid: {
    width: CARD_WIDTH,
    paddingTop: 31,
    paddingRight: 9,
    paddingBottom: 10,
    paddingLeft: 9,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  blackFrame: { backgroundColor: '#000' },
  whiteFrame: { backgroundColor: '#fff' },

  image: { width: 128, height: 159, resizeMode: 'cover' },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CARD_WIDTH,
    height: 300,
    resizeMode: 'stretch',
  },

  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 70,
    height: 70,
    resizeMode: 'contain',
    zIndex: 10,
    ...Platform.select({ android: { elevation: 20 } }),
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 7,
    paddingBottom: 7,
  },
  metaIcon: { width: 14, height: 14, resizeMode: 'contain' },
  metaFallback: { fontSize: 10 },

  desc: { fontSize: 7.8, lineHeight: 10, minHeight: 54 },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  date: { fontSize: 8, color: '#ACACAC' },
  loc: { fontSize: 8, color: '#7A7A7A' },
});
