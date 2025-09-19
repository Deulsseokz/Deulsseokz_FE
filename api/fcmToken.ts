/** @file api/fcmToken.ts
 * @module api/fcmToken
 * @description FCM 토큰 관련 API 요청 함수들을 정의합니다.
 * @see {@link api/common} 공통 요청 함수
 * @see {@link api/type} FcmTokenRequest : 서버가 주는 토큰 타입
 */

/**************************************************************/
import { CommonResponse, postRequest } from './common';
import { FcmTokenRequest } from './type';

/**
 * @function sendFcmToken
 * @description FCM 토큰 전송
 */
export async function sendFcmToken(body: FcmTokenRequest): Promise<CommonResponse<FcmTokenRequest>> {
  return await postRequest<FcmTokenRequest>('/user/fcm-token', body);
}
