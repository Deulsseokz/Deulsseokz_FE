import AppleLoginButton from '@/assets/images/auth/Apple-login button.svg';
import GoogleLoginButton from '@/assets/images/auth/Google-login button.svg';
import RadialGradientBg from '@/components/auth/RadialGradientBg';
import { Image, Pressable, View } from 'react-native';

export default function SignInTemplate({
  googleSignIn,
  appleSignIn,
}: {
  googleSignIn: () => void;
  appleSignIn: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <RadialGradientBg />
      <View style={{ flex: 1, alignItems: 'center', paddingTop: '60%' }}>
        <Image source={require('@/assets/images/auth/login-image.png')} style={{ width: 200, height: 220 }} />
        <View style={{ gap: 10, marginTop: 180 }}>
          <Pressable onPress={googleSignIn}>
            <GoogleLoginButton />
          </Pressable>
          <Pressable onPress={appleSignIn}>
            <AppleLoginButton />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
