import api from '@/api/client';
import ChallengeDetailTemplate from '@/components/template/ChallengeDetailTemplate';
import dayjs from 'dayjs';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export default function ChallengeDetail() {
  const { id, image, place, content, point, condition1, condition2, condition3, friends } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const uriParts = image as string;
  const fileType = uriParts.split('.')[uriParts.split('.').length - 1];
  const formData = new FormData();

  formData.append('place', place as string);
  if (typeof friends === 'string') {
    formData.append('friends', JSON.stringify(friends.split(',').map(Number)));
  }
  formData.append('attemptDate', dayjs().tz('Asia/Seoul').format('YYYY-MM-DD'));

  formData.append('attemptImage', {
    uri: image,
    name: `photo.${fileType}`,
    type: `image/jpeg`,
  } as any); // 또는 as unknown as Blob

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await api.post(`${BASE_URL}/challenge/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        router.replace({
          pathname: '/map/[id]/result',
          params: {
            id: Number(id),
            image: image,
            condition1: condition1,
            condition2: condition2,
            condition3: condition3,
            point: point,
            isSuccess: String(res.data.result.attemptResult),
            isSuccessCondition1: String(res.data.result.condition1),
            isSuccessCondition2: String(res.data.result.condition2),
            isSuccessCondition3: String(res.data.result.condition3),
          },
        });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ChallengeDetailTemplate
      id={Number(id)}
      image={image as string}
      place={place as string}
      content={content as string}
      point={point as string}
      condition1={condition1 as string}
      condition2={condition2 as string}
      condition3={condition3 as string}
      friends={friends as string}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}
