import MyPageProfileChangeTemplate from "@/components/template/MyPageProfileChangeTemplate";
import { router } from "expo-router";
import { useState } from "react";

export default function ChangeNameScreen(){
    const [text, setText]= useState('');

    /** 이름 변경 핸들러 함수 */
    const onChangeNameConfirm = () => {
        // API 호출
        router.back();
    }

    return (
        <MyPageProfileChangeTemplate text={text} setText={setText} onChangeNameConfirm={onChangeNameConfirm}/>
    )
}