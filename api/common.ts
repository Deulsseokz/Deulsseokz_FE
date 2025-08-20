/** @file api/common.ts
 * @module api/common
 * @description API 요청 및 응답에 사용되는 공통 함수와 타입을 정의합니다.
 * @see {@link api/type} API 응답에 사용되는 타입들
 */

/**************************************************************/

import { getTokens } from '@/utils/tokenManager';
import api from './client';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export interface CommonResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/** 공통 GET 요청 함수
 * @template T - 응답 데이터 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function getRequest<T>(endpoint: string): Promise<CommonResponse<T>> {
  try {
    const { accessToken } = await getTokens();

    const response = await api.get<CommonResponse<T>>(`${endpoint}`);

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: CommonResponse<T> = response.data;
    return data;
  } catch (error) {
    console.error('fail', error);
    throw error;
  }
}

/** 공통 POST 요청 함수
 * @template T - 응답 데이터 타입
 * @template B - 요청 바디 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {B} body - 요청 바디 데이터
 * @param {string} [token] - Bearer 액세스 토큰 (opt)
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function postRequest<T, B = unknown>(
  endpoint: string,
  body: B,
  token?: string,
): Promise<CommonResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: CommonResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error('fail', error);
    throw error;
  }
}

/** 공통 PATCH 요청 함수
 * @template T - 응답 데이터 타입
 * @template B - 요청 바디 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {B} body - 요청 바디 데이터
 * @param {string} [token] - Bearer 액세스 토큰 (opt)
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function patchRequest<T, B = unknown>(
  endpoint: string,
  body: B,
  token: string | null,
): Promise<CommonResponse<T>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: CommonResponse<T> = await response.json();
    return data;
  } catch (error) {
    console.error('fail', error);
    throw error;
  }
}
