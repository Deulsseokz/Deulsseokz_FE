import { dummyPhoto } from "@/components/album/_type";
import AlbumDownloadTemplate from "@/components/template/AlbumDownloadTemplate";

export default function AlbumDownloadScreen() {
  const cnt = { curr: "3", tot: "5" };
  return <AlbumDownloadTemplate photo={dummyPhoto} albumTitle="N서울타워" cnt={cnt}  />;
}
