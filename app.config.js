import 'dotenv/config';
import withFileProvider from './plugins/with-fileprovider';
import withProviderPaths from './plugins/with-provider-paths';
import withQueries from './plugins/with-queries';

export default {
  expo: {
    name: 'Mellog',
    slug: 'mellog',
    version: '1.0.2',
    owner: 'patrickgong',
    orientation: 'portrait',
    icon: './assets/mellog/ios-light.png',
    scheme: 'mellog',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/mellog/splash-icon-light.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
      dark: {
        image: './assets/mellog/splash-icon-dark.png',
        resizeMode: 'contain',
        backgroundColor: '#000000',
      },
    },
    newArchEnabled: true,
    ios: {
      googleServicesFile: './GoogleService-Info.plist',
      bundleIdentifier: 'com.mellog.deulseokzz',
      supportsTablet: false,
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          '이 앱은 현재 위치를 기반으로 지도를 표시하기 위해 위치 권한이 필요합니다.',
        NSLocationAlwaysUsageDescription: '항상 위치 권한을 요청하는 이유를 설명합니다. (필요한 경우에만 사용)',
        NSCameraUsageDescription: '사진을 촬영하려면 카메라 접근이 필요합니다.',
        NSPhotoLibraryUsageDescription: '사진을 선택하려면 앨범 접근이 필요합니다.',
        LSApplicationQueriesSchemes: ['instagram', 'instagram-stories', 'itms-apps'],
      },
      useAppleSignIn: true,
      config: {
        usesNonExemptEncryption: false,
      },
      entitlements: {
        'aps-environment': 'production',
      },
      associatedDomains: ['applinks:mellog.vercel.app'],
    },
    android: {
      googleServicesFile: './google-services.json',
      package: 'com.mellog.deulseokzz',
      // queries: [
      //   {
      //     package: 'com.instagram.android',
      //   },
      // ],
      adaptiveIcon: {
        foregroundImage: './assets/mellog/android-adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      permissions: ['ACCESS_FINE_LOCATION', 'ACCESS_COARSE_LOCATION'],
      intentFilters: [
        {
          action: 'VIEW',
          autoVerify: true,
          data: [
            {
              scheme: 'https',
              host: 'mellog.vercel.app',
              pathPrefix: '/invite',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    updates: {
      url: 'https://u.expo.dev/0b8c439b-7629-447f-a13a-e3985fe9703f',
    },
    runtimeVersion: '1.0.2',
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-apple-authentication',
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      [
        '@mj-studio/react-native-naver-map',
        {
          client_id: process.env.EXPO_PUBLIC_NAVER_MAP_CLIENT_ID,
          android: {
            ACCESS_FINE_LOCATION: true,
            ACCESS_COARSE_LOCATION: true,
          },
          ios: {
            NSLocationWhenInUseUsageDescription: '이 앱은 지도를 표시하기 위해 위치 권한이 필요합니다.',
          },
        },
      ],
      'expo-splash-screen',
      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: [
              'https://repository.map.naver.com/archive/maven',
              '../../node_modules/@notifee/react-native/android/libs',
            ],
          },
          ios: {
            queries: ['instagram', 'instagram-stories'],
            useFrameworks: 'static',
          },
        },
      ],
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: 'com.googleusercontent.apps.711444441700-kvqpr2rvkmb0c80dfbrrer4tlto31j15',
        },
      ],
      [withQueries, { packages: ['com.instagram.android'] }],
      [withProviderPaths],
      [withFileProvider],
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
