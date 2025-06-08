"use client";
import { RequestItems } from "@/app/lib/store/RequestSlice/RequestSlice";
import Image from "next/image";
import {
  CheckCircleOutline as CheckIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import React from "react";

interface NotificationCardProps {
  requests?: RequestItems[];
  onReviewRequest?: (status: "accepeted" | "rejected", req_id: string) => void;
}

export default function NotificationCard(props: NotificationCardProps) {
  const { requests, onReviewRequest } = props;
  return (
    <div className="text-center my-2">
      {requests?.map((request) => {
        const { fromUserId, _id } = request;
        return (
          <div
            key={_id}
            className="flex justify-between text-center m-3 p-3 rounded-lg bg-base-300 w-full mx-auto"
          >
            {fromUserId?.photoUrl && (
              <div>
                <Image
                  className="rounded-full"
                  src={fromUserId?.photoUrl ?? ""}
                  alt="photo"
                  width={35}
                  height={35}
                  // fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="text-left mx-4 w-[45%]">
              <h2 className="font-bold text-xl">
                {fromUserId?.firstname + " " + fromUserId?.lastname}
              </h2>
              {fromUserId?.age && fromUserId?.gender && (
                <p>{fromUserId?.age + ", " + fromUserId?.gender}</p>
              )}
              {fromUserId?.about && (
                <p className="text-wrap">{fromUserId?.about}</p>
              )}
            </div>
            <div className="">
              <button
                className="btn btn-success mx-2 rounded-full"
                onClick={() => onReviewRequest?.("accepeted", request?._id)}
              >
                <CheckIcon />
              </button>
              <button
                className="btn btn-error mx-2 rounded-full"
                onClick={() => onReviewRequest?.("rejected", request?._id)}
              >
                <CancelIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
