export enum ModalType {
  /** 기본 모달 */
  DEFAULT = "DEFAULT",
  /** 삭제 경고 */
  DELETE_WARNING = "DELETE_WARNING",

  /** 코인 부족 */
  PURCHASE_COIN = "PURCHASE_COIN",

  /** 재도전 요청 */
  RETRY_ACTION = "RETRY_ACTION",

  /** 대표 사진 변경 완료 */
  CHANGE_REP_PHOTO = "CHANGE_REP_PHOTO",

  /** 대표 뱃지 변경 완료 */
  CHANGE_REP_FRAME = "CHANGE_REP_FRAME",

  /** 포인트 획득 축하 */
  POINTS_RECEIVED = "POINTS_RECEIVED",

  /** 사진 저장 완료 */
  SAVE_PHOTO = "SAVE_PHOTO",

  /** 친구 추가 - 전화번호 입력 */
  FRIEND_ADD_PHONE = "FRIEND_ADD_PHONE",

  /** 친구 추가 - 입력값 확인 단계 */
  FRIEND_ADD_VERIFY = "FRIEND_ADD_VERIFY",

  /** 친구 추가 - 확인 후 최종 추가 */
  FRIEND_ADD_CONFIRM = "FRIEND_ADD_CONFIRM",
}
