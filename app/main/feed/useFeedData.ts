"use client";
import { FeedItem, setFeed } from "@/app/lib/store/feedSlice/feedSlice";
import { useAppDispatch } from "@/app/lib/store/hooks";
import { handleApiError } from "@/app/utils/handleApiError";
import { getServices } from "@/app/utils/Services/ApiServices";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

function useFeedData(shouldFetch: boolean) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getFeedData = useCallback(async () => {
    try {
      const response = await getServices<FeedItem[]>("feed", router);
      if (response?.data !== undefined) {
        dispatch(setFeed(response?.data));
      } else {
        console.error("Feed data is undefined");
      }
    } catch (error) {
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (shouldFetch) {
      getFeedData();
    }
  }, [getFeedData, shouldFetch]);
}
export default useFeedData;
