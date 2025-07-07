"use client";
import { useEffect } from "react";
import { addUser, UserState } from "../../lib/store/userSlice/userSlice";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import { getServices } from "../../utils/Services/ApiServices";
import { handleApiError } from "@/app/utils/handleApiError";
import { useRouter } from "next/navigation";

export default function UserPreview() {
  const userData = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const fetchUser = async () => {
    if (userData?._id) return;
    try {
      const res = await getServices<UserState>("profile/view", router);
      
      if (res?.data !== undefined) {
        dispatch(addUser(res?.data));
        return;
      }
    } catch (error) {
      handleApiError(error, router);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userData?._id, fetchUser]);

  return null;
}
