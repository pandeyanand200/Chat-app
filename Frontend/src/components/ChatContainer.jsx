import { useEffect, useRef } from "react";
import { useChatStore } from "../lib/useChatStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../lib/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import assets from "../assets/assets";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-black/10 backdrop-blur-sm">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser) {
     return (
        <div className="flex-1 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm text-gray-500">
           <div className="text-center space-y-4">
              <div className="size-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                 <img src={assets.logo_icon} alt="Logo" className="size-10 opacity-50" />
              </div>
              <h2 className="text-xl font-semibold text-gray-200">Welcome to QuickChat</h2>
              <p className="max-w-xs mx-auto text-sm">Select a conversation from the sidebar to start chatting with your friends.</p>
           </div>
        </div>
     )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-black/10 backdrop-blur-sm">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}
            ref={messageEndRef}
          >
            <div className={`max-w-[75%] flex gap-2 ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
               <div className="shrink-0 mt-1">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || assets.avatar_icon
                      : selectedUser.profilePic || assets.avatar_icon
                  }
                  alt="profile pic"
                  className="size-8 rounded-full border border-gray-700 object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                 <div
                    className={`px-4 py-2 rounded-2xl text-sm shadow-sm
                    ${message.senderId === authUser._id 
                      ? "bg-blue-600 text-white rounded-tr-none border border-blue-500/50" 
                      : "bg-gray-800/80 text-gray-100 rounded-tl-none border border-gray-700/50"}
                    `}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[250px] rounded-xl mb-2 object-cover border border-black/20"
                      />
                    )}
                    {message.text && <p className="leading-relaxed">{message.text}</p>}
                  </div>
                   <time className="text-[10px] text-gray-500 px-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
              </div>
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
