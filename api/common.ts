/** @file api/common.ts
 * @module api/common
 * @description Axios를 사용한 API 요청 및 응답에 사용되는 공통 함수와 타입을 정의합니다.
 * @see {@link api/type} API 응답에 사용되는 타입들
 * @see {@link api/client} API 요청에 사용되는 axios 인스턴스
 */

/**************************************************************/

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import api from './client';


export interface CommonResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

/**
 * 공통 에러를 표시하기 위한 상태
 */
export interface CommonErrorState {
  code?: string;
  message: string;
  status?: number;
}

/** 공통 GET 요청 함수
 * @template T - 응답 데이터 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {AxiosRequestConfig} [config] - 추가적인 Axios 요청 설정 (e.g., params)
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function getRequest<T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> {
  try {
    const response: AxiosResponse<CommonResponse<T>> = await api.get(endpoint, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.response?.data?.message || `HTTP ${error.response?.status}`);
    }
    console.error('Unexpected error:', error);
    throw error;
  }
}

/** 공통 POST 요청 함수
 * @template T - 응답 데이터 타입
 * @template B - 요청 바디 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {B} body - 요청 바디 데이터
 * @param {AxiosRequestConfig} [config] - 추가적인 Axios 요청 설정
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function postRequest<T, B = unknown>(
  endpoint: string,
  body: B,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> {
  try {
    const response: AxiosResponse<CommonResponse<T>> = await api.post(endpoint, body, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.response?.data?.message || `HTTP ${error.response?.status}`);
    }
    console.error('Unexpected error:', error);
    throw error;
  }
}

/** 공통 PATCH 요청 함수
 * @template T - 응답 데이터 타입
 * @template B - 요청 바디 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {B} body - 요청 바디 데이터
 * @param {AxiosRequestConfig} [config] - 추가적인 Axios 요청 설정
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function patchRequest<T, B = unknown>(
  endpoint: string,
  body: B,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> {
  try {
    const response: AxiosResponse<CommonResponse<T>> = await api.patch(endpoint, body, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.response?.data?.message || `HTTP ${error.response?.status}`);
    }
    console.error('Unexpected error:', error);
    throw error;
  }
}

/** 공통 DELETE 요청 함수
 * @template T - 응답 데이터 타입
 * @param {string} endpoint - API 엔드포인트 경로
 * @param {AxiosRequestConfig} [config] - 추가적인 Axios 요청 설정 (e.g., data for body)
 * @returns {Promise<CommonResponse<T>>} API 응답을 포함하는 프로미스
 */
export async function deleteRequest<T>(
  endpoint: string,
  config?: AxiosRequestConfig,
): Promise<CommonResponse<T>> {
  try {
    const response: AxiosResponse<CommonResponse<T>> = await api.delete(endpoint, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      throw new Error(error.response?.data?.message || `HTTP ${error.response?.status}`);
    }
    console.error('Unexpected error:', error);
    throw error;
  }
}
