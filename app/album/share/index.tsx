import { getAlbumByPlace } from "@/api/album";
import { PhotoItem } from "@/api/type";
import { PolaroidPhoto } from "@/components/album/_type";
import AlbumShareTemplate from "@/components/template/AlbumShareTemplate";
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";

const MAX_SELECT_IMAGE = 1;

export default function AlbumShareScreen() {
  const router = useRouter();
  const { place } = useLocalSearchParams<{ place: string }>();

  const placeParam = useMemo(() => decodeURIComponent(Array.isArray(place) ? place[0] : place), [place]);

  const [photos, setPhotos] = useState<PolaroidPhoto[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<PolaroidPhoto[]>([]);

  /** API 응답 가공 */
  const transformPhoto = (photo: PhotoItem): PolaroidPhoto => ({
    id: photo.id,
    image: { uri: photo.url },
    additional: {
      weather: (photo.weather ?? "") as WeatherType,
      feeling: (photo.feelings ?? "") as FeelingType,
      desc: photo.photoContent ?? "",
    },
    date: photo.date ?? "",
  });

  /** API 요청 */
  const fetchPhotos = async () => {
    if (!placeParam) return;

    try {
      const res = await getAlbumByPlace(placeParam);
      if (res.isSuccess) {
        const transformed = res.result.map(transformPhoto);
        setPhotos(transformed);
      } else {
        console.error("API 실패:", res.message);
      }
    } catch (e) {
      console.error("API 호출 중 오류:", e);
    }
  };
  
  useEffect(() => {
    fetchPhotos();
  }, [placeParam]);

  /** 사진 선택 */
  const handleSelect = (photo: PolaroidPhoto) => {
    const isSelected = selectedPhotos.includes(photo);
    if (isSelected) {
      setSelectedPhotos(selectedPhotos.filter((p) => p !== photo));
    } else if (selectedPhotos.length < MAX_SELECT_IMAGE) {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  
  const handleShare = () => {
    const selectedPhoto = selectedPhotos[0];
    if (!selectedPhoto) return;

    const photoString = encodeURIComponent(JSON.stringify(selectedPhoto)); 
    router.push({
      pathname: "/album/share/[id]",
      params: {
        id: selectedPhoto.id,
        place: placeParam,
        photo: photoString,
      },
    });
  };


  return (
    <AlbumShareTemplate
      maxSelectCount={MAX_SELECT_IMAGE}
      selectedPhotos={selectedPhotos}
      photos={photos}
      onSelectPhoto={handleSelect}
      onPressNext={handleShare}
    />
  );
}
