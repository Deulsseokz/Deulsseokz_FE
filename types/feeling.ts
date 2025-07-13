export const FEELINGS = {
  HAPPY: "😁",
  CRY: "😭",
  SURPRISE: "🫢",
  LOVE: "🥰",
  FUN: "😛",
  CELEBRATE: "🥳",
  COOL: "😎",
} as const;

export type FeelingType = (typeof FEELINGS)[keyof typeof FEELINGS];

export const FEELING_HAPPY = FEELINGS.HAPPY;
export const FEELING_CRY = FEELINGS.CRY;
export const FEELING_SURPRISE = FEELINGS.SURPRISE;
export const FEELING_LOVE = FEELINGS.LOVE;
export const FEELING_FUN = FEELINGS.FUN;
export const FEELING_CELEBRATE = FEELINGS.CELEBRATE;
export const FEELING_COOL = FEELINGS.COOL;
