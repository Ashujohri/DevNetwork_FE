"use client";
import { useAppDispatch, useAppSelector } from "@/app/lib/store/hooks";
import { addUser } from "@/app/lib/store/userSlice/userSlice";
import { patchService } from "@/app/utils/Services/ApiServices";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type EditProfileData = {
  firstname?: string;
  lastname?: string;
  email?: string;
  gender?: string;
  age?: string | number;
  photoUrl?: string;
  skills?: string[];
  about?: string;
};

export default function Profile() {
  const user = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState<EditProfileData>({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    age: "",
    photoUrl: "",
    skills: [],
    about: "",
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?._id) {
      setFormData({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        gender: user?.gender || "",
        age: user?.age || "",
        photoUrl: user?.photoUrl || "",
        skills: user?.skills || [],
        about: user?.about || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProfile = useCallback(async () => {
    try {
      //@ts-nocheck
      const { email, ...data } = formData;
      const response = await patchService("profile/edit", data);
      if (response?.data != undefined && response != null) {
        dispatch(addUser(response?.data));
        setIsEdit(!isEdit);
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          gender: "",
          age: "",
          photoUrl: "",
          skills: [],
          about: "",
        });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }, [formData, setIsEdit, isEdit, dispatch]);

  return (
    !!user?._id && (
      <div>
        <div className="card-actions justify-end mr-8 my-2">
          <button
            className="btn btn-primary"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        <div className="divider" />
        <div className="flex justify-around">
          {user?.photoUrl != undefined && (
            <div className="w-62 h-62 rounded-full relative overflow-hidden my-10">
              <Image
                src={user?.photoUrl ?? ""}
                alt="image"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <div className="card card-dash bg-base-300 my-10 w-1/2">
            <h2 className="card-title justify-center">
              {user?.firstname} Information
            </h2>
            <div className="card-body">
              <div className="grid grid-cols-3 gap-4">
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    name="firstname"
                    className="input"
                    placeholder="First Name"
                    readOnly={isEdit ? false : true}
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    name="lastname"
                    className="input"
                    placeholder="Last Name"
                    readOnly={isEdit ? false : true}
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">EmailId</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Email"
                    readOnly
                    value={formData.email}
                  />
                </fieldset>

                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    name="age"
                    className="input"
                    placeholder="Age"
                    readOnly={isEdit ? false : true}
                    value={formData.age}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    name="gender"
                    className="input"
                    placeholder="Gender"
                    readOnly={isEdit ? false : true}
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </fieldset>
                <fieldset className="fieldset my-1">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    name="about"
                    className="input"
                    placeholder="About"
                    readOnly={isEdit ? false : true}
                    value={formData.about}
                    onChange={handleChange}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <div className="flex gap-3">
                    {formData?.skills?.map((item, index) => (
                      <div
                        className="badge badge-success"
                        key={`${item}-${index}`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              {isEdit && (
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleEditProfile}
                  >
                    Save Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
