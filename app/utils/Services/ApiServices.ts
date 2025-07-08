import { CommonApiResponse } from "@/app/common/CommonApiResponseType";
import axios, { AxiosRequestConfig } from "axios";
import { handleApiError } from "../handleApiError";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// const SERVER_URL = "http://localhost:3001";
const SERVER_URL = "/api";

async function getServices<T>(
  url: string,
  router?: AppRouterInstance
): Promise<CommonApiResponse<T> | null> {
  try {
    const config: AxiosRequestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      withCredentials: true,
    };

    const { data } = await axios.get<CommonApiResponse<T>>(
      `${SERVER_URL}/${url}`,
      config
    );
    return data;
  } catch (error) {
    console.error("Something went wrong", error);
    handleApiError(error, router);
    return null;
  }
}

async function authService<T>(
  url: string,
  //@ts-nocheck
  body: any, //@ts-nocheck
  router?: AppRouterInstance
): Promise<CommonApiResponse<T> | null> {
  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      withCredentials: true,
    };

    const { data } = await axios.post<CommonApiResponse<T>>(
      `${SERVER_URL}/${url}`,
      body,
      config
    );
    return data;
  } catch (error) {
    console.error("Something went wrong", error);
    handleApiError(error, router);
    return null;
  }
}

async function patchService(
  url: string,
  //@ts-nocheck
  body: any
): Promise<CommonApiResponse | null> {
  try {
    const config: AxiosRequestConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      withCredentials: true,
    };

    const { data } = await axios.patch<CommonApiResponse>(
      `${SERVER_URL}/${url}`,
      body,
      config
    );
    return data;
  } catch (error) {
    console.error("Something went wrong", error);
    return null;
  }
}

async function postService(
  url: string,
  //@ts-nocheck
  body: any,
  router?: AppRouterInstance
): Promise<CommonApiResponse | null> {
  try {
    const config: AxiosRequestConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      withCredentials: true,
    };

    const { data } = await axios.post<CommonApiResponse>(
      `${SERVER_URL}/${url}`,
      body,
      config
    );
    return data;
  } catch (error) {
    console.error("Something went wrong", error);
    handleApiError(error, router);
    return null;
  }
}

export { getServices, authService, patchService, postService };
