import { images } from "@/components/album/_type";
import AlbumShareTemplate from "@/components/template/AlbumShareTemplate";
import { useRouter } from "expo-router";
import React, { useState } from "react";

const MAX_SELECT_IMAGE = 3;

export default function AlbumShareScreen() {
  const router = useRouter();
  const [selectedPhotos, setSelectedPhotos] = useState<any[]>([]);

  const handleShare = () => {
    router.push(`/album/share/1`);
  };

  const handleSelect = (photo: any) => {
    const isSelected = selectedPhotos.includes(photo);
    if (isSelected) {
      setSelectedPhotos(selectedPhotos.filter((p) => p !== photo));
    } else if (selectedPhotos.length < MAX_SELECT_IMAGE) {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

  return (
    <AlbumShareTemplate
      maxSelectCount={MAX_SELECT_IMAGE}
      selectedPhotos={selectedPhotos}
      photos={images}
      onSelectPhoto={handleSelect}
      onPressNext={handleShare}
    />
  );
}
