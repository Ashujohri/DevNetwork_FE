"use client";
import Image from "next/image";
import { Visibility as EyeIcon } from "@mui/icons-material";
import React from "react";
import { FeedItem } from "@/app/lib/store/feedSlice/feedSlice";

interface NotificationCardProps {
  friends?: FeedItem[];
  onViewProfile?: (req_id: string) => void;
}

export default function NotificationFriendsCard(props: NotificationCardProps) {
  const { friends, onViewProfile } = props;
  return (
    <div className="text-center my-2">
      {friends?.map((friend) => {
        const { _id, photoUrl, age, gender, about, firstname, lastname } =
          friend;
        return (
          <div
            key={_id}
            className="flex justify-between text-center m-4 p-4 rounded-lg bg-base-300 w-full mx-auto"
          >
            {photoUrl && (
              <div>
                <Image
                  className="rounded-md"
                  src={photoUrl}
                  alt="photo"
                  width={70}
                  height={70}
                  // fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstname + " " + lastname}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              {about && <p>{about}</p>}
            </div>
            <div className="">
              <button
                className="btn btn-success mx-2 rounded-full"
                onClick={() => onViewProfile?.(_id)}
              >
                <EyeIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
