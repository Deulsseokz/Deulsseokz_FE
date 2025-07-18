import LocationTemplate from '@/components/template/map/LocationTemplate';
import { LOCATION_DATA } from '@/constants/map/locationData';

export default function Location() {
  // TODO: 모든 지역을 조회하는 api 도입

  return <LocationTemplate locationList={LOCATION_DATA} />;
}
