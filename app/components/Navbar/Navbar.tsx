"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";
import { removeUser } from "@/app/lib/store/userSlice/userSlice";
import { authService } from "@/app/utils/Services/ApiServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import Sidebar from "../Sidebar/Sidebar";

export default function Navbar() {
  const userData = useAppSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogOut = useCallback(async () => {
    const response = await authService("logout", {});
    if (response?.status) {
      dispatch(removeUser());
      return router.replace("/auth/login");
    }
  }, [authService, dispatch, removeUser]);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link href={"/main/feed"} className="btn btn-ghost text-xl">
          🧑‍💻 DevTinder
        </Link>
      </div>
      {!!userData?._id && (
        <div className="flex gap-2">
          <Sidebar />
          <div className="form-control text-center mt-2">
            Welcome, {userData?.firstname}
          </div>
          <div className="dropdown dropdown-end mx-3">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/main/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <a onClick={handleLogOut}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
