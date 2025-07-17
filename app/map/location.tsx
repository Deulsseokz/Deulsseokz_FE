import LocationTemplate from '@/components/template/map/LocationTemplate';
import { LOCATION_DATA } from '@/constants/map/locationData';

export default function Location() {
  // 모든 지역을 조회하는 api 혹은 하드코딩.

  return <LocationTemplate locationList={LOCATION_DATA} />;
}
