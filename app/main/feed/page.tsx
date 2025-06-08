"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";
import React, { useCallback } from "react";
import useFeedData from "./useFeedData";
import SwipeCard from "@/app/components/Card/SwipeCard";
import { postService } from "@/app/utils/Services/ApiServices";
import {
  FeedItem,
  notNowUser,
  removeUserFromFeed,
} from "@/app/lib/store/feedSlice/feedSlice";
import { handleApiError } from "@/app/utils/handleApiError";

export default function Feed() {
  const feed = useAppSelector((state) => state.feed.items);
  const dispatch = useAppDispatch();
  useFeedData(feed.length === 0);

  const handleSwipe = useCallback(async (status: string, userId: string) => {
    try {
      if (status === "maybe") {
        dispatch(notNowUser());
      } else {
        const response = await postService(`send/${status}/${userId}`, {});
        if (response?.data !== undefined) {
          dispatch(removeUserFromFeed(userId as any));
        }
      }
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  return (
    feed.length !== 0 && (
      <div className="relative w-full flex justify-center items-center h-[500px]">
        {feed.map((feedItem) => {
          return (
            <SwipeCard
              key={feedItem?._id}
              userData={feedItem}
              onSwipe={(status) => handleSwipe(status, feedItem?._id)}
            />
          );
        })}
      </div>
    )
  );
}
