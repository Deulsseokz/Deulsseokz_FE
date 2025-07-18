import { getAlbumByPlace } from "@/api/album";
import { PhotoItem } from "@/api/type";
import { PolaroidPhoto } from "@/components/album/_type";
import AlbumIdTemplate from "@/components/template/AlbumIdTemplate";
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export default function AlbumIdScreen() {
  const router = useRouter();
  const { place } = useLocalSearchParams();
  
  const placeParam = useMemo(() => Array.isArray(place) ? place[0] : place, [place]);
  const [photos, setPhotos] = useState<PolaroidPhoto[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedPhoto = photos[activeIndex];

  /** API 응답 utill */
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

  /** API fetch */
  const fetchPhotos = async () => {
    if (!placeParam) return;

    try {
      const res = await getAlbumByPlace(placeParam);
      if (res.isSuccess) {
        const transformed = res.result.map(transformPhoto);
        setPhotos(transformed);
      } else {
        console.error("에러", res.message);
      }
    } catch (e) {
      console.error("API 호출 실패", e);
    }
  };

  /** query */
  const getSelectedPhotoParams = () => ({
    place: placeParam,
    photoId: selectedPhoto?.id,
    url: typeof selectedPhoto?.image === "object" && "uri" in selectedPhoto.image
      ? selectedPhoto.image.uri
      : "",
  });

  /** handler function (related router) */
  const handleEdit = () => {
    router.push({
      pathname: "/album/[place]/edit",
      params: getSelectedPhotoParams(),
    });
  };

  const handleDownload = () => {
    if (!selectedPhoto) return;

    const photoString = encodeURIComponent(JSON.stringify(selectedPhoto));
    router.push({
      pathname: "/album/[place]/download",
      params: {
        place: placeParam,
        photo: photoString,
      },
    });
  };

  /** useEffect */
  useEffect(() => {
    fetchPhotos();
  }, [placeParam]);

  return (
    <AlbumIdTemplate
      photos={photos}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      onEdit={handleEdit}
      onDownload={handleDownload}
      albumTitle={placeParam || ""}
    />
  );
}
