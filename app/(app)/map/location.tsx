import { getAllPlaceArea } from "@/api/placeDTO";
import LocationTemplate from '@/components/template/map/LocationTemplate';
import { Location as LocationType } from "@/types/location";
import { useEffect, useState } from "react";

export default function Location() {
  const [data, setData] = useState<LocationType[]>([]);

  const fetchPlaceArea = async () => {
    try {
      const response = await getAllPlaceArea();
      setData(response.result);
    } catch (error) {
      console.error('Error fetching place areas:', error);
    }
  }

  useEffect(()=>{
    fetchPlaceArea();
  }, [])

  return <LocationTemplate locationList={data} />;
}
