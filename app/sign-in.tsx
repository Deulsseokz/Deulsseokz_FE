import SignInTemplate from '@/components/template/SignInTemplate';
import { useAuthenticationStore } from '@/store/useAuthenticationStore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import * as AppleAuthentication from 'expo-apple-authentication';

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
      console.error(error);
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

  return <SignInTemplate googleSignIn={googleSignIn} appleSignIn={appleSignIn} />;
}
