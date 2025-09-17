import { Alert, Platform } from 'react-native';
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

      if (uri) {
        const stickerImageUri = Platform.OS === 'ios' ? `file://${uri}` : uri;

        const shareOptions = {
          social: Share.Social.INSTAGRAM_STORIES,
          appId: META_APP_ID,
          stickerImage: stickerImageUri,
          backgroundTopColor: STORY_BACKGROUND_COLOR,
          backgroundBottomColor: STORY_BACKGROUND_COLOR,
        };

        await Share.shareSingle(shareOptions as any);
      } else {
        Alert.alert('오류', '이미지를 캡처하는 데 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error: any) {
      if (error.message.includes('User did not share')) {
        console.log('사용자가 공유를 취소했습니다.');
      } else {
        console.error('스토리 공유 중 오류 발생:', error);
        Alert.alert('오류', '스토리를 공유하는 중 문제가 발생했습니다. 인스타그램 앱이 설치되어 있는지 확인해주세요.');
      }
    }
  };

  return { share };
};
