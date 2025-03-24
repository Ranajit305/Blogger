import React, { useRef, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";

const Account = () => {
  const { user, updateprofile } = useAuthStore();

  const fileInputRef = useRef(null);

  const [image, setImage] = useState(user?.profilePic || "avatar.png");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
    };
  };

  const handleProfileUpdate = () => {
    updateprofile(image);
  }
  
  return (
    <div className="h-[calc(100vh-4.9rem)] w-full md:w-[75%] m-auto">
      <div className="bg-white m-5 p-5 rounded-lg">
        <h1 className="text-lg p-2">Account Details</h1>
        <hr className="" />
        <div className="flex items-center gap-5 p-5">
          <div className="flex items-center justify-center">
            {/* Profile Image */}
            <img
              className="h-12 w-12 sm:h-16 sm:w-16 cursor-pointer rounded-full border border-gray-300 object-cover"
              src={image}
              alt="Profile"
              onClick={handleImageClick}
            />

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <p className="text-gray-500 text-sm sm:text-base">
              Name: {user?.name}
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Email: {user?.email}
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Followers: {user?.followers?.length || 0}
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm sm:text-base">
          Members Since:{" "}
          {new Date(user?.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <button
          onClick={() => handleProfileUpdate()}
          className="font-light p-2 mt-3 cursor-pointer bg-green-500 hover:bg-green-600 rounded-lg text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Account;
