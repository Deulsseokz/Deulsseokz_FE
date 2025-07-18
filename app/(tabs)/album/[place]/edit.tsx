import { postPhotoToAlbum } from "@/api/album";
import AlbumEditTemplate from "@/components/template/AlbumEditTemplate";
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ImageSourcePropType } from "react-native";

const feelings: FeelingType[] = ["😁", "😭", "😎", "🥰", "😛", "🥳"];
const weathers: WeatherType[] = ["☀️", "☁️", "☔️", "🌦️", "💨", "⛈️"];

export default function AlbumEditScreen() {
  const router = useRouter();
  const { url, place } = useLocalSearchParams<{ url: string; place: string }>();
  
  const imageSource: ImageSourcePropType =
    url && typeof url === "string" ? { uri: url } : require("@/assets/images/album/photo1.jpeg");

  const [selectedFeeling, setSelectedFeeling] = useState<FeelingType>("😁");
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>("☀️");
  const [desc, setDesc] = useState("");

  /** handler function (related router) */
  const handleSave = async () => {

    const requestBody = {
      photo: url,
      place: place,
      feelings: selectedFeeling,
      weather: selectedWeather,
      photoContent: desc,
    };

    try {
      const res = await postPhotoToAlbum(requestBody);
      if (res.isSuccess) {
        Alert.alert("성공", res.message);
      } else {
        Alert.alert("에러", res.message);
      }
    } catch (e) {
      console.error("API 호출 실패", e);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <AlbumEditTemplate
      imageSource={imageSource}
      feelings={feelings}
      weathers={weathers}
      selectedFeeling={selectedFeeling}
      selectedWeather={selectedWeather}
      desc={desc}
      onChangeFeeling={setSelectedFeeling}
      onChangeWeather={setSelectedWeather}
      onChangeDesc={setDesc}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
