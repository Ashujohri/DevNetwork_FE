import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { removeUser } from "../lib/store/userSlice/userSlice";
import type { NextRequest } from "next/server";

export function handleApiError(
  error: unknown,
  router?: AppRouterInstance,
  dispatch?: any,
  request?: NextRequest
) {
  if (
    (typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as any).response?.data?.message === "Unauthorized token") ||
    "Error: jwt expired"
  ) {
    console.log("middleware", error);

    alert("Session expired, please login again");
    request?.cookies.clear();
    dispatch?.(removeUser());
    document.cookie = "token=; path=/;";
    return router?.replace("/auth/login");
  } else {
    console.error("Something went wrong", error);
  }
}
