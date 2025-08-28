import CloseIcn from '@/assets/icons/icon-close-black.svg';
import { MCOLORS } from '@/constants/colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackBtn from '../../components/common/BackBtn';
import FavoritePlaceBtn from '../common/FavoritePlaceBtn';
import { SheetStep } from './_type';
import { StepHeaderMap } from './_util';

/**
 * @returns 바텀 시트를 이루는 헤더
 */

interface SheetHeaderProps {
  placeName: string;
  isFavorite: boolean;
  backStep: () => void;
  exitSheet: () => void;
  step: SheetStep;
}

export default function SheetHeader({ placeName, isFavorite, backStep, exitSheet, step }: SheetHeaderProps) {
  const headerMap = StepHeaderMap[step];

  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        {headerMap.showFavorite && <FavoritePlaceBtn placeName={placeName} isFavorite={isFavorite} />}
        {headerMap.showBackButton && <BackBtn onBack={backStep} />}
      </View>
      {headerMap.showPlace && <Text style={style.place}>{placeName}</Text>}
      <TouchableOpacity onPress={exitSheet}>
        <CloseIcn width={28} height={30} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 28,
    paddingRight: 31,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    width: 'auto',
  },
  place: {
    fontFamily: 'Pretendard-Medium',
    color: MCOLORS.grayscale.gray70,
    fontSize: 15,
    fontWeight: '500',
  },
});
