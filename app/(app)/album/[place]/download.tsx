import { PolaroidPhoto } from "@/components/album/_type";
import AlbumDownloadTemplate from "@/components/template/AlbumDownloadTemplate";
import { useLocalSearchParams } from "expo-router";

export default function AlbumDownloadScreen() {
  /** router */
  const { photo, place } = useLocalSearchParams();
  /** variable */
  let parsedPhoto: PolaroidPhoto | null = null;

  try {
    parsedPhoto =
      photo && typeof photo === "string"
        ? JSON.parse(decodeURIComponent(photo))
        : null;
  } catch (e) {
    console.error("error", e);
  }

  if (!parsedPhoto) return null;

  return (
    <AlbumDownloadTemplate
      photo={parsedPhoto}
      albumTitle={place as string}
      cnt={{ curr: "3", tot: "5" }}
    />
  );
}
