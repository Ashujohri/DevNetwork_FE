"use client";
import React, { useCallback, useState } from "react";
import { authService } from "../../utils/Services/ApiServices";
import { useAppDispatch } from "../../lib/store/hooks";
import { addUser, UserState } from "@/app/lib/store/userSlice/userSlice";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { handleApiError } from "../../utils/handleApiError";

type FormData = {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
};

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [formData, setformData] = useState<FormData>({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [isLoggedInForm, setIsLoggedInForm] = useState(true);

  const handleSubmit = useCallback(async () => {
    const body = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await authService<UserState>("login", body);
      if (response?.data !== undefined) {
        dispatch(addUser(response?.data));
        router.replace("/main/feed");
        return;
      } else {
        console.error("User data is undefined");
        return;
      }
    } catch (err) {
      console.log("login catch error", err);
      handleApiError(err, router, dispatch);
    }
  }, [formData.email, formData.password, formData, dispatch, addUser]);

  const handleSignUp = useCallback(async () => {
    const body = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await authService<UserState>("signup", body);
      if (response?.data !== undefined) {
        dispatch(addUser(response?.data));
        router.replace("/main/profile");
        setIsLoggedInForm(!isLoggedInForm);
        return;
      } else {
        console.error("User data is undefined");
        return;
      }
    } catch (err) {
      console.log("login catch error", err);
      handleApiError(err, router, dispatch);
    }
  }, [
    formData.email,
    formData.password,
    formData.firstname,
    formData.lastname,
    formData,
    dispatch,
    addUser,
  ]);

  const updateFormData = useCallback(
    async (newData: Partial<FormData>) => {
      setformData((prev) => ({ ...prev, ...newData }));
    },
    [setformData]
  );

  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-10">
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoggedInForm ? "Login" : "Sign up"}
            </h2>
            {!isLoggedInForm && (
              <>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="firstname"
                    className="input"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={(event) =>
                      updateFormData({ firstname: event.target.value })
                    }
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="lastname"
                    className="input"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={(event) =>
                      updateFormData({ lastname: event.target.value })
                    }
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                className="input"
                placeholder="Email ID"
                value={formData.email}
                onChange={(event) =>
                  updateFormData({ email: event.target.value })
                }
              />
            </fieldset>
            <fieldset className="fieldset my-1">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={formData.password}
                onChange={(event) =>
                  updateFormData({ password: event.target.value })
                }
              />
            </fieldset>
            <div className="card-actions justify-end py-4">
              <button
                className="btn btn-primary"
                onClick={isLoggedInForm ? handleSubmit : handleSignUp}
              >
                {isLoggedInForm ? "Login" : "Sign-In"}
              </button>
            </div>
            <p
              className="m-auto cursor-pointer"
              onClick={() => setIsLoggedInForm(!isLoggedInForm)}
            >
              {isLoggedInForm
                ? "Existing User? Login Here !"
                : "New User? Sign-in Here !"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
