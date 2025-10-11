import { StyleSheet } from 'react-native';
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg';

export default function OnboardingBg() {
  return (
    <Svg style={StyleSheet.absoluteFillObject}>
      <Defs>
        <RadialGradient id="gradient" cx="50%" cy="50%" rx="150%" ry="50%">
          <Stop offset="0%" stopColor="#FEE4EA" />
          <Stop offset="24%" stopColor="#FFF8F9" />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
    </Svg>
  );
}
