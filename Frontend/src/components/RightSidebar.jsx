import { useChatStore } from "../lib/useChatStore";
import { User, Image as ImageIcon, Search, Phone, MoreHorizontal, MapPin, Mail, FolderHeart } from "lucide-react";
import assets, { imagesDummyData } from "../assets/assets";

const RightSidebar = () => {
  const { selectedUser } = useChatStore();

  if (!selectedUser) return <div className="hidden lg:flex flex-col border-l border-gray-700/50 bg-black/20 backdrop-blur-md items-center justify-center text-gray-500 font-medium">Select a user</div>;

  return (
    <aside className="hidden lg:flex flex-col h-full w-full border-l border-gray-700/50 bg-black/20 backdrop-blur-md overflow-y-auto custom-scrollbar">
      {/* Profile Header */}
      <div className="flex flex-col items-center p-8 border-b border-gray-700/50 relative">
        <div className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer transition-colors">
          <MoreHorizontal className="size-5" />
        </div>
        <div className="relative group">
          <img
            src={selectedUser.profilePic || assets.avatar_icon}
            alt={selectedUser.fullName}
            className="size-24 rounded-full object-cover border-4 border-blue-500/10 shadow-xl shadow-blue-500/5 transition-transform group-hover:scale-105 duration-300"
          />
          <div className="absolute bottom-1 right-1 size-5 bg-green-500 rounded-full border-4 border-[#1a1a1a]" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-100">{selectedUser.fullName}</h2>
        <p className="text-sm text-gray-400 mt-1">{selectedUser.email}</p>
        
        <div className="flex gap-4 mt-6 w-full px-4">
           <button className="flex-1 flex flex-col items-center gap-2 p-3 bg-blue-600/10 hover:bg-blue-600/20 rounded-2xl border border-blue-500/20 text-blue-400 text-xs font-semibold ring-blue-500/10 ring-4 transition-all">
              <Phone className="size-5" />
              Call
           </button>
            <button className="flex-1 flex flex-col items-center gap-2 p-3 bg-gray-800/40 hover:bg-gray-800/60 rounded-2xl border border-gray-700/50 text-gray-200 text-xs font-semibold transition-all">
              <User className="size-5" />
              Profile
           </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* About Section */}
        <div className="space-y-4">
           <div className="flex items-center justify-between text-gray-400 group cursor-pointer hover:text-white transition-colors">
              <h3 className="text-xs font-bold uppercase tracking-wider">About User</h3>
              <MoreHorizontal className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
           </div>
           <p className="text-sm text-gray-300 leading-relaxed bg-gray-800/30 p-3 rounded-xl border border-gray-700/30">
             {selectedUser.bio || "Passionate about coding, coffee, and connecting with people around the world."}
           </p>
           <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-gray-200 transition-colors cursor-pointer group">
                 <div className="size-8 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                    <MapPin className="size-4 text-blue-400" />
                 </div>
                 <span>New York, USA</span>
              </div>
               <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-gray-200 transition-colors cursor-pointer group">
                 <div className="size-8 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-800 transition-colors">
                    <Mail className="size-4 text-blue-400" />
                 </div>
                 <span className="truncate">{selectedUser.email}</span>
              </div>
           </div>
        </div>

        {/* Shared Media */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-2 text-gray-400 group cursor-pointer hover:text-white transition-colors">
               <ImageIcon className="size-4" />
               <h3 className="text-xs font-bold uppercase tracking-wider">Shared Media</h3>
             </div>
             <span className="text-[10px] text-blue-400 font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {imagesDummyData.slice(0, 6).map((img, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-gray-700/50 cursor-pointer group hover:border-blue-500/50 transition-all shadow-lg hover:shadow-blue-500/10">
                <img
                  src={img}
                  alt="shared media"
                  className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Customization Actions */}
        <div className="space-y-3 border-t border-gray-700/50 pt-8">
           <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/40 text-gray-300 text-sm font-medium transition-all group">
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded-lg bg-red-400/10 flex items-center justify-center group-hover:bg-red-400/20 transition-colors">
                    <FolderHeart className="size-4 text-red-400" />
                 </div>
                 <span>Saved Messages</span>
              </div>
           </button>
           <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-800/40 text-gray-300 text-sm font-medium transition-all group">
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded-lg bg-blue-400/10 flex items-center justify-center group-hover:bg-blue-400/20 transition-colors">
                    <Search className="size-4 text-blue-400" />
                 </div>
                 <span>Search Chat</span>
              </div>
           </button>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
