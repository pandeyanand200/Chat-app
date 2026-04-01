import React, { useState } from 'react';
import { useChatStore } from '../lib/useChatStore';
import { useAuthStore } from '../lib/useAuthStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users, Search, MoreVertical, LogOut, Settings } from 'lucide-react';
import assets from '../assets/assets';

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, selectedUser, isUsersLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onlineUsers = []; // Example: ['680f50aaf10f3cd28382ecf2', '680f50e4f10f3cd28382ecf9']

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOnline = showOnlineOnly ? onlineUsers.includes(user._id) : true;
    return matchesSearch && matchesOnline;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full flex flex-col border-r border-gray-700/50 bg-black/20 backdrop-blur-md">
      {/* Header */}
      <div className="p-5 border-b border-gray-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={authUser?.profilePic || assets.avatar_icon} alt="profile" className="size-10 rounded-full object-cover border border-gray-600" />
            <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-black"></div>
          </div>
          <div>
            <h1 className="font-semibold text-gray-100 text-sm">{authUser?.fullName}</h1>
            <p className="text-xs text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
           <Settings className="size-5 cursor-pointer hover:text-white transition-colors" />
           <MoreVertical className="size-5 cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-4 space-y-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full bg-gray-800/40 border border-gray-700/50 rounded-xl py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary border-gray-600"
            />
            <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Show online only</span>
          </label>
          <span className="text-xs text-gray-500">{filteredUsers.length} users</span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 space-y-1">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 rounded-xl transition-all duration-200 group
                ${selectedUser?._id === user._id ? "bg-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/5" : "hover:bg-gray-700/30 border border-transparent"}
              `}
            >
              <div className="relative shrink-0">
                <img
                  src={user.profilePic || assets.avatar_icon}
                  alt={user.fullName}
                  className="size-12 rounded-full object-cover border border-gray-700 group-hover:border-gray-500 transition-colors"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                )}
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-200 truncate group-hover:text-white transition-colors">{user.fullName}</h3>
                  <span className="text-[10px] text-gray-500 mt-1 shrink-0">12:45 PM</span>
                </div>
                <p className="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors">
                  {user.bio || "No status available"}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-10">
            <Users className="size-10 text-gray-600 mx-auto mb-3 opacity-20" />
            <p className="text-sm text-gray-500">No users found</p>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-700/50 mt-auto">
         <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-red-500/20 text-sm font-medium">
             <LogOut className="size-4" />
             Log out
         </button>
      </div>
    </aside>
  );
};

export default Sidebar;
