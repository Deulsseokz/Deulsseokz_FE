import AlbumEditTemplate from "@/components/template/AlbumEditTemplate";
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import React, { useState } from "react";

const feelings: FeelingType[] = ["😁", "😭", "😎", "🥰", "😛", "🥳"];
const weathers: WeatherType[] = ["☀️", "☁️", "☔️", "🌦️", "💨", "⛈️"];

export default function AlbumEditScreen() {
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingType>("😁");
  const [selectedWeather, setSelectedWeather] = useState<WeatherType>("☀️");
  const [desc, setDesc] = useState("");

  const handleSave = () => {};
  const handleCancel = () => {};

  return (
    <AlbumEditTemplate
      imageSource={require("@/assets/images/album/photo1.jpeg")}
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
