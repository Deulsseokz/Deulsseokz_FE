import AppleLoginButton from '@/assets/images/auth/Apple-login button.svg';
import GoogleLoginButton from '@/assets/images/auth/Google-login button.svg';
import RadialGradientBg from '@/components/auth/RadialGradientBg';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

export default function SignInTemplate({
  googleSignIn,
  appleSignIn,
}: {
  googleSignIn: () => void;
  appleSignIn: () => void;
}) {
  const { height } = Dimensions.get('window');

  const paddingTop = height < 700 ? '30%' : '50%';
  return (
    <View style={{ flex: 1 }}>
      <RadialGradientBg />
      <View style={[styles.container, { paddingTop }]}>
        <Image source={require('@/assets/images/auth/login-image.png')} style={styles.image} />
        <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: '30%',
    justifyContent: 'space-between',
  },
  image: {
    width: 200,
    height: 220,
  },
  buttonContainer: {
    gap: 15,
  },
});
