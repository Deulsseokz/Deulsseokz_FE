import 'dotenv/config';

export default {
  expo: {
    name: 'Mellog',
    slug: 'mellog',
    version: '1.0.0',
    owner: 'patrickgong',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'mellog',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      bundleIdentifier: 'com.mellog.deulseokzz',
      supportsTablet: false,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          '이 앱은 현재 위치를 기반으로 지도를 표시하기 위해 위치 권한이 필요합니다.',
        NSLocationAlwaysUsageDescription: '항상 위치 권한을 요청하는 이유를 설명합니다. (필요한 경우에만 사용)',
        NSCameraUsageDescription: '사진을 촬영하려면 카메라 접근이 필요합니다.',
        NSPhotoLibraryUsageDescription: '사진을 선택하려면 앨범 접근이 필요합니다.',
      },
      useAppleSignIn: true,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      package: 'com.mellog.deulseokzz',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-apple-authentication',
      [
        '@mj-studio/react-native-naver-map',
        {
          client_id: process.env.NAVER_MAP_CLIENT_ID,
          android: {
            ACCESS_FINE_LOCATION: true,
            ACCESS_COARSE_LOCATION: true,
          },
          ios: {
            NSLocationWhenInUseUsageDescription: '이 앱은 지도를 표시하기 위해 위치 권한이 필요합니다.',
          },
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: ['https://repository.map.naver.com/archive/maven'],
          },
        },
      ],
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: 'com.googleusercontent.apps.711444441700-kvqpr2rvkmb0c80dfbrrer4tlto31j15',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: '0b8c439b-7629-447f-a13a-e3985fe9703f',
      },
    },
  },
};
