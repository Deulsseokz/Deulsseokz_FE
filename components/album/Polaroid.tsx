import { formatDate } from '@/utils/formatDate';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { PolaroidProps } from './_type';
import { feelingImageMap, weatherImageMap } from './_utli';

/**
 * 기본 폴라로이드 컴포넌트
 */
export default function Polaroid({ photo }: PolaroidProps) {
  const { image, additional, date, loc } = photo;

  const feelingIcon = feelingImageMap[additional.feeling];
  const weatherIcon = weatherImageMap[additional.weather];

  return (
    <View style={styles.polaroid}>
      <Image source={image} style={styles.image} />

      <View style={styles.additional}>
        <View style={styles.metaRow}>
          {feelingIcon && <Image source={feelingIcon} style={styles.metaIcon} />}
          {weatherIcon && <Image source={weatherIcon} style={styles.metaIcon} />}
        </View>

        <Text style={styles.desc}>{additional.desc}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(date)}</Text>
        <Text style={styles.loc}>{loc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  polaroid: {
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
    gap: 10,
    width: 195,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 1.35 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 225,
    resizeMode: 'cover',
  },
  additional: { minHeight: 80, display: 'flex', flexDirection: 'column', gap: 5 },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3.75,
  },
  metaIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  metaFallback: {
    fontSize: 12,
    color: '#999',
  },
  desc: {
    fontSize: 9.75,
    lineHeight: 15,
    color: '#4A4A4A',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    fontSize: 9.75,
    color: '#ACACAC',
  },
  loc: {
    fontSize: 9.75,
    color: '#7A7A7A',
  },
});
