export const WEATHERS = {
  SUNNY: "☀️",
  CLOUDY: "☁️",
  RAINY: "☔️",
  PARTLY_SUNNY: "🌦️",
  WINDY: "💨",
  THUNDER: "⛈️",
} as const;

export type WeatherType = (typeof WEATHERS)[keyof typeof WEATHERS];

export const WEATHER_SUNNY = WEATHERS.SUNNY;
export const WEATHER_CLOUDY = WEATHERS.CLOUDY;
export const WEATHER_RAINY = WEATHERS.RAINY;
export const WEATHER_PARTLY_SUNNY = WEATHERS.PARTLY_SUNNY;
export const WEATHER_WINDY = WEATHERS.WINDY;
export const WEATHER_THUNDER = WEATHERS.THUNDER;
