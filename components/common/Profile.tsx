import { Image } from "react-native";


interface ProfileProps {
  size: number;
  imageUrl: string | null;
  style?: object;
}

export default function Profile({size, imageUrl, style}: ProfileProps) {
  return (
  <Image
    source={ imageUrl ? {uri: imageUrl} : require('@/assets/images/default_profile.png')}
    style={{width: size, height: size, borderRadius: size / 2, resizeMode: 'cover',  ...style}}>
  </Image>)
}   