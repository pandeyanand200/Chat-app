import { useState } from "react";
import { useAuthStore } from "../lib/useAuthStore";
import { Camera, Mail, User, Loader } from "lucide-react";
import assets from "../assets/assets";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-black/40 backdrop-blur-3xl">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-gray-900/50 rounded-3xl border border-gray-700/50 p-6 space-y-8 shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-100">Profile</h1>
            <p className="mt-2 text-gray-400">Your personal information and settings</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img
                src={selectedImg || authUser.profilePic || assets.avatar_icon}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-blue-500/10 transition-all group-hover:brightness-75 duration-300 shadow-xl"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-blue-600 hover:bg-blue-500 
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-lg shadow-blue-500/20
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-gray-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2 px-1">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-gray-800/40 rounded-xl border border-gray-700/30 text-gray-100 font-medium">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-gray-500 flex items-center gap-2 px-1">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-gray-800/40 rounded-xl border border-gray-700/30 text-gray-100 font-medium">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-gray-800/30 rounded-2xl p-6 border border-gray-700/30">
            <h2 className="text-lg font-semibold text-gray-100 mb-4 px-1">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-gray-700/30">
                <span className="text-gray-400">Member Since</span>
                <span className="text-gray-200">2024-12-04</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
