import React, { useCallback, useEffect, useState } from "react";
import { Notifications as BellIcon } from "@mui/icons-material";
import { getServices, postService } from "@/app/utils/Services/ApiServices";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";
import {
  addRequests,
  removeRequest,
  RequestItems,
} from "@/app/lib/store/RequestSlice/RequestSlice";
import NotificationCard from "../Card/NotificationCard";
import { handleApiError } from "@/app/utils/handleApiError";
import { addConnections } from "@/app/lib/store/connectionSlice/connectionSlice";
import { FeedItem } from "@/app/lib/store/feedSlice/feedSlice";
import NotificationFriendsCard from "../Card/NotificationFriendsCard";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.requests);
  const friendList = useAppSelector((state) => state.connection);

  useEffect(() => {
    fetchRequests();
    fetchFriendReq();
  }, []);

  const fetchRequests = useCallback(async () => {
    try {
      const response = await getServices<RequestItems[]>(
        "user/request/pending"
      );
      if (response?.data != undefined) {
        dispatch(addRequests(response?.data));
        return;
      }
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  const handleReviewReq = useCallback(async (status: string, _id: string) => {
    try {
      const response = await postService(`review/${status}/${_id}`, {});
      if (response?.data != undefined) {
        dispatch(removeRequest({ _id }));
      }
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  const fetchFriendReq = useCallback(async () => {
    try {
      const response = await getServices<FeedItem[]>("user/connection");
      if (response?.data != undefined) {
        dispatch(addConnections(response?.data));
        return;
      }
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  return (
    <div className="mt-2">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button">
            <BellIcon />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-120 p-4">
            {/* Sidebar content here */}
            <div className="flex flex-row">
              {/* name of each tab group should be unique */}
              <div className="tabs tabs-border">
                {friendList?.items?.length === 0 ? (
                  <h1 className="tab text-bold">No Friend Found</h1>
                ) : (
                  <>
                    <input
                      type="radio"
                      name="my_tabs_2"
                      className="tab text-bold text-md"
                      aria-label="Friends List"
                      defaultChecked
                    />
                    <div className="tab-content">
                      <NotificationFriendsCard friends={friendList?.items} />
                    </div>
                  </>
                )}
                {requests?.items?.length === 0 ? (
                  <h1 className="tab text-bold">No Request Found</h1>
                ) : (
                  <>
                    <input
                      type="radio"
                      name="my_tabs_2"
                      className="tab text-bold"
                      aria-label="Friend Request"
                    />
                    <div className="tab-content">
                      <NotificationCard
                        requests={requests?.items}
                        onReviewRequest={handleReviewReq}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* <li>
              <a>Sidebar Item 1</a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
