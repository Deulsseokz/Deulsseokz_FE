import Svg, { ClipPath, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

type Props = { style?: any };

export default function RadialBackground({style}: Props) {
   return (
    <Svg width="100%" height={91} style={style}>
      <Defs>
        <ClipPath id="clip">
          <Rect width="100%" height={91} rx={20} ry={20} />
        </ClipPath>

        <RadialGradient
          id="grad"
          cx="103.67%" cy="34.62%"
          rx="143.93%" ry="109.18%"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="1.11%" stopColor="#F9557A" />
          <Stop offset="33.49%" stopColor="#F76F8E" />
          <Stop offset="66.72%" stopColor="#FF7B99" />
          <Stop offset="100%" stopColor="#FFB8C8" />
        </RadialGradient>
      </Defs>

      <Rect
        width="100%"
        height="100%"
        fill="url(#grad)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
