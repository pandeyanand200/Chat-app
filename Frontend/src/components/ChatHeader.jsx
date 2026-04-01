import { X, Phone, Video, Info } from "lucide-react";
import { useAuthStore } from "../lib/useAuthStore";
import { useChatStore } from "../lib/useChatStore";
import assets from "../assets/assets";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-gray-700/50 bg-black/5 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
           <img src={selectedUser.profilePic || assets.avatar_icon} alt={selectedUser.fullName} className="size-11 rounded-full object-cover border border-gray-700" />
           {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-black" />
           )}
        </div>

        {/* User info */}
        <div>
          <h3 className="font-semibold text-gray-100">{selectedUser.fullName}</h3>
          <p className="text-xs text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-gray-400">
         <Phone className="size-5 cursor-pointer hover:text-white transition-colors" />
         <Video className="size-5 cursor-pointer hover:text-white transition-colors" />
         <Info className="size-5 cursor-pointer hover:text-white transition-colors" />
         <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X className="size-5" />
         </button>
      </div>
    </div>
  );
};
export default ChatHeader;
