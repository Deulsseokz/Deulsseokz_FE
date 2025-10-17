import SignInTemplate from '@/components/template/SignInTemplate';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Alert, Platform } from 'react-native';

export default function SignIn() {
  const { signIn, setIsNew } = useAuthenticationStore();

  const googleSignIn = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();

      const res = await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/auth/google`, {
        idToken: userInfo.data!.idToken,
      });
      if (res.data.isNew) {
        setIsNew(true);
      }

      await signIn(res.data.access, res.data.refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const appleSignIn = async () => {
    if (Platform.OS === 'ios') {
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

        if (res.data.isNew) {
          setIsNew(true);
        }

        await signIn(res.data.access, res.data.refresh);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('애플 로그인은 안드로이드에서만 가능합니다.');
    }
  };

  return <SignInTemplate googleSignIn={googleSignIn} appleSignIn={appleSignIn} />;
}
