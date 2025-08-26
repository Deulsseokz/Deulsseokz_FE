import MyPageProfileChangeTemplate from "@/components/template/MyPageProfileChangeTemplate";
import { useProfileStore } from "@/store/useProfileStore";
import { router } from "expo-router";
import { useState } from "react";

export default function ChangeNameScreen(){
    const [text, setText]= useState('');

    const updateProfile = useProfileStore(s => s.updateProfile);
    const error = useProfileStore(s => s.error);

    /** 이름 변경 핸들러 함수 */
    const onChangeNameConfirm = () => {
        updateProfile({ userName: text , profileImage: null});
        if (!error) router.back();
        else alert("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
    };

    return (
        <MyPageProfileChangeTemplate text={text} setText={setText} onChangeNameConfirm={onChangeNameConfirm}/>
    )
}