import { getFavoritePlace } from "@/api/place";
import { FavoritePlace } from "@/api/type";
import MyPageFavoriteTemplate from "@/components/template/MyPageFavoriteTemplate";
import { useEffect, useState } from "react";

export default function FavoriteScreen(){
     const [favoritePlaces, setFavoritePlaces] = useState<FavoritePlace[]>([]);

     const getData = async() => {
        const data = await getFavoritePlace();

        if (data.isSuccess){
            const favPlace = data.result;
            setFavoritePlaces(favPlace);
        } else {
            console.log("error : " , data.message);
        }
     }

    //  관심 장소 수정 함수
    const toggleFavoritePlace = async (placeName:string) => {
    }
     
     useEffect(()=>{
        getData();
     }, []);

    return (
       <MyPageFavoriteTemplate favoritePlaceData={favoritePlaces} toggleFavoritePlace={toggleFavoritePlace}/>
    )
}
