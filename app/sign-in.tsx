import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { View } from 'react-native';

export default function SignIn() {
  // const { signIn } = useAuthenticationStore();

  const signIn = async () => {
    try {
      await GoogleSignin.signIn();
      console.log('google sign in succeed');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GoogleSigninButton onPress={signIn} />
    </View>
  );
}
