import { StyleSheet } from 'react-native';
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg';

export default function RadialGradientBg() {
  return (
    <Svg style={StyleSheet.absoluteFillObject}>
      <Defs>
        <RadialGradient id="gradient" cx="50%" cy="40%" rx="150%" ry="50%">
          <Stop offset="0%" stopColor="#FFF" />
          <Stop offset="10%" stopColor="#FFF8F9" />
          <Stop offset="42%" stopColor="#FDDBE3" />
          <Stop offset="100%" stopColor="#FBB3C3" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
  );
}
