import { getAlbumByPlace } from "@/api/album";
import { PhotoItem } from "@/api/type";
import { PolaroidPhoto } from "@/components/album/_type";
import AlbumIdTemplate from "@/components/template/AlbumIdTemplate";
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";

export default function AlbumIdScreen() {
  /** router */
  const router = useRouter();
  const { place } = useLocalSearchParams();
  const placeParam = useMemo(() => Array.isArray(place) ? place[0] : place, [place]);
  /** state */
  const [photos, setPhotos] = useState<PolaroidPhoto[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  /** variable */
  const selectedPhoto = photos[activeIndex];
  /** API utill */
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
        console.error("API 오류:", res.message);
      }
    } catch (e) {
      console.error("API 호출 실패", e);
    }
  };
  
  /** handler function (related router) */
  const handleEdit = () => {
    if (!selectedPhoto) return;

    const photoString = encodeURIComponent(JSON.stringify(selectedPhoto));
    router.push({
      pathname: "/album/[place]/edit",
      params: {
        place: placeParam,
        photo: photoString,
      },
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

  const handleShare = () => {
    if (!selectedPhoto) return;

    router.push({
      pathname: "/album/share",
      params: {
        place: placeParam,
      },
    });
  };

  const menu = [
    { label: "사진 추가", onPress: () => ()=>{} },
    { label: "사진 삭제", onPress: ()=>{} },
    { label: "모아보기", onPress: ()=>{} },
    { label: "공유하기", onPress: handleShare },
    { label: "대표 사진 변경", onPress: ()=>{} },
  ];

  /** lifecycle */
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
      menu={menu}
    />
  );
}
