import AlbumHomeTemplate from "@/components/template/AlbumHomeTemplate";

export interface IAlbum {
  id: string;
  label: string;
  images: number[]; 
}

const albums : IAlbum[] = [
  {
    id: "1",
    label: "N서울타워",
    images: [
      require("@/assets/images/album/photo1.jpeg"),
      require("@/assets/images/album/photo2.jpeg"),
      require("@/assets/images/album/photo3.jpeg"),
    ],
  },
  {
    id: "2",
    label: "코엑스 아쿠아리움",
    images: [
      require("@/assets/images/album/photo3.jpeg"),
      require("@/assets/images/album/photo1.jpeg"),
      require("@/assets/images/album/photo2.jpeg"),
    ],
  },
  {
    id: "3",
    label: "해운대",
    images: [
      require("@/assets/images/album/photo2.jpeg"),
      require("@/assets/images/album/photo3.jpeg"),
      require("@/assets/images/album/photo1.jpeg"),
    ],
  },
];

export default function AlbumHomeScreen() {
  return <AlbumHomeTemplate title="앨범" albums={albums} />;
}
