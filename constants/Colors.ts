/**
 * 멜로그 컬러 시스템
 */
export const MCOLORS = {
  brand: {
    primary: '#F76F8E',
    secondary: '#F5B1C1',
  },
  grayscale: {
    gray5: '#E9E9E9',
    gray10: '#DDDDDD',
    gray30: '#ACACAC',
    gray50: '#7A7A7A',
    gray70: '#4A4A4A',
    gray80: '#313131',
    gray100: '#000000',
  },
};

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
