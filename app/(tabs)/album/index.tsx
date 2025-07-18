import { getAlbumList } from "@/api/album";
import { AlbumItem } from "@/api/type";
import AlbumHomeTemplate from "@/components/template/AlbumHomeTemplate";
import { useEffect, useState } from "react";

export default function AlbumHomeScreen() {
  const [albums, setAlbums] = useState<AlbumItem[]>([]);

  const fetchAlbums = async () => {
      try {
        const res = await getAlbumList();
        if (res.isSuccess) {
          setAlbums(res.result);
        } else {
          console.error("API 오류:", res.message);
        }
      } catch (e) {
        console.error("API 호출 실패:", e);
      }
    };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return <AlbumHomeTemplate title="앨범" albums={albums} />;
}
