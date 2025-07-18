import { postPhotoToAlbum } from "@/api/album";
import ModalManager from "@/components/common/Modal/ModalManager";
import AlbumEditTemplate from "@/components/template/AlbumEditTemplate";
import { ModalType } from "@/enums/modalTypes";
import useModal from "@/hooks/useModal";
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ImageSourcePropType } from "react-native";

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

  const isSaveEnabled = desc.trim().length > 0;

  const {
    isShowing: isSaveModalVisible,
    modalType: saveModalType,
    modalProps: saveModalProps,
    show: showSaveModal,
    hide: hideSaveModal,
  } = useModal();

  const {
    isShowing: isCancelModalVisible,
    modalType: cancelModalType,
    modalProps: cancelModalProps,
    show: showCancelModal,
    hide: hideCancelModal,
  } = useModal();

  const handleSave = async () => {
    const requestBody = {
      photo: url,
      place: place,
      feelings: selectedFeeling,
      weather: selectedWeather,
      photoContent: desc,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await postPhotoToAlbum(requestBody);
      if (res.isSuccess) {
        showSaveModal(ModalType.DEFAULT, {
          title: "오늘의 일기를 저장했어요",
          desc: "오늘도 행복한 추억을 만들었네요",
          children: (
            <Image
              source={require("@/assets/images/modal/icon-save-diary.png")}
              style={{ width: 80, height: 82 }}
            />
          ),
          buttons: {
            text: "확인",
            onPress: () => {
              hideSaveModal();
              router.push({
                pathname: "/album/[place]",
                params: { place },
              });
            },
          },
        });
      } else {
        Alert.alert("에러", res.message);
      }
    } catch (e) {
      console.error("API 호출 실패", e);
    }
  };

  const handleCancel = () => {
    showCancelModal(ModalType.DEFAULT, {
      title: "저장하지 않고 나갈까요?",
      desc: "작성한 내용이 모두 사라져요",
      children: (
        <Image
          source={require("@/assets/images/modal/icon-warning.png")}
          style={{ width: 80, height: 82 }}
        />
      ),
      options: [
        {
          text: "취소",
          type: "normal-dismiss" as const,
          onPress: hideCancelModal,
        },
        {
          text: "나가기",
          type: "status-enabled" as const,
          onPress: () => {
            hideCancelModal();
            router.push("/album/");
          },
        },
      ],
    });
  };

  return (
    <>
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
        isSaveEnabled={isSaveEnabled} 
      />
      <ModalManager
        isShowing={isSaveModalVisible}
        modalType={saveModalType}
        modalProps={saveModalProps}
        onClose={hideSaveModal}
      />
      <ModalManager
        isShowing={isCancelModalVisible}
        modalType={cancelModalType}
        modalProps={cancelModalProps}
        onClose={hideCancelModal}
      />
    </>
  );
}
