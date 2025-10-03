import { Alert, Linking, Platform } from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

const META_APP_ID = process.env.EXPO_PUBLIC_META_APP_ID;
const STORY_BACKGROUND_COLOR = '#FFFFFF';

/**
 * ViewShot ref를 받아 인스타그램 스토리에 공유하는 기능을 제공하는 커스텀 훅
 * @param ref - 캡처할 ViewShot 컴포넌트의 ref
 */
export const useInstagramShare = (ref: React.RefObject<ViewShot | null>) => {
  const share = async () => {
    try {
      const uri = await ref.current?.capture?.();
      if (!uri) {
        Alert.alert('오류', '이미지를 캡처하는 데 실패했습니다. 다시 시도해주세요.');
        return;
      }

      const stickerImageUri = `file://${uri}`;

      // 공유를 시도하기 전에 먼저 인스타그램 설치 여부를 확인
      let isInstagramInstalled = false;
      if (Platform.OS === 'android') {
        const result = await Share.isPackageInstalled('com.instagram.android');
        isInstagramInstalled = result.isInstalled;
      } else if (Platform.OS === 'ios') {
        isInstagramInstalled = await Linking.canOpenURL('instagram-stories://share');
      }

      // 인스타그램이 설치되어 있지 않다면, 스토어로 안내
      if (!isInstagramInstalled) {
        Alert.alert('Instagram이 필요해요', '스토리에 공유하려면 Instagram 앱이 설치되어야 합니다.', [
          { text: '취소', style: 'cancel' },
          {
            text: '스토어로 이동',
            onPress: () => {
              const storeUrl =
                Platform.OS === 'ios'
                  ? 'itms-apps://itunes.apple.com/app/id389801252'
                  : 'https://play.google.com/store/apps/details?id=com.instagram.android';

              Linking.openURL(storeUrl).catch(err => {
                console.error('스토어 이동 실패:', err);
                Alert.alert('오류', '스토어를 여는 데 실패했습니다.');
              });
            },
          },
        ]);
        return;
      }

      const shareOptions = {
        social: Share.Social.INSTAGRAM_STORIES,
        appId: META_APP_ID,
        stickerImage: stickerImageUri,
        backgroundTopColor: STORY_BACKGROUND_COLOR,
        backgroundBottomColor: STORY_BACKGROUND_COLOR,
      };

      await Share.shareSingle(shareOptions as any);
    } catch (error: any) {
      console.error('스토리 공유 중 오류 발생:', error);
      const errorMessage = String(error.message).toLowerCase();

      if (errorMessage.includes('user did not share')) {
        console.log('사용자가 공유를 취소했습니다.');
      } else {
        Alert.alert('오류', '스토리를 공유하는 중 문제가 발생했습니다.');
      }
    }
  };

  return { share };
};
