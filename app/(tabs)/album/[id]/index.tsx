import { dummyPhotos } from "@/components/album/_type";
import AlbumIdTemplate from "@/components/template/AlbumIdTemplate";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AlbumIdScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedPhoto = dummyPhotos[activeIndex];

  const handleEdit = () => {
    router.push(`/album/${selectedPhoto.id}/edit`);
  };

  const handleDownload = () => {
    router.push(`/album/${selectedPhoto.id}/download`);
  };

  return (
    <AlbumIdTemplate
      photos={dummyPhotos}
      activeIndex={activeIndex}
      setActiveIndex={setActiveIndex}
      onEdit={handleEdit}
      onDownload={handleDownload}
      albumTitle="남산서울타워"
    />
  );
}
