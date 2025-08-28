import { BadgeType } from "@/types/shareType";

/**
 * 마이페이지에서 관리되는 뱃지 아이콘 매핑 객체
 * BadgeType: {active, inactive} 이미지 리소스
 */
export const badgeIconsMypage = {
    [BadgeType.FIRST]: {
        active: require("@/assets/images/badge/first-active.png"),
        inactive: require("@/assets/images/badge/first-inactive.png"),
    },
    [BadgeType.GENGHI]:{
        active: require("@/assets/images/badge/genghi-active.png"),
        inactive: require("@/assets/images/badge/genghi-inactive.png"),
    },
    [BadgeType.HANYANG]: {
        active: require("@/assets/images/badge/hanyang-active.png"),
        inactive: require("@/assets/images/badge/hanyang-inactive.png"),
    },
    [BadgeType.OZI]: {
        active: require("@/assets/images/badge/ozi-active.png"),
        inactive: require("@/assets/images/badge/ozi-inactive.png"),
    }
}