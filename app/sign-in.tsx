import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Image, Pressable, View } from 'react-native';
import AppleLoginButton from '../assets/images/auth/Apple-login button.svg';
import GoogleLoginButton from '../assets/images/auth/Google-login button.svg';
import RadialGradientBg from '../components/auth/RadialGradientBg';

export default function SignIn() {
  const { signIn } = useAuthenticationStore();

  const googleSignIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/auth/google`, {
        idToken: userInfo.data!.idToken,
      });

      await signIn(res.data.access, res.data.refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const appleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/auth/apple`, {
        identityToken: credential.identityToken,
      });

      await signIn(res.data.access, res.data.refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <RadialGradientBg />
      <View style={{ flex: 1, alignItems: 'center', paddingTop: '60%' }}>
        <Image source={require('../assets/images/auth/login-image.png')} style={{ width: 200, height: 220 }} />
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
