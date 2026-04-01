import { useRef, useState } from "react";
import { useChatStore } from "../lib/useChatStore";
import { Image, Send, X, Smile, Paperclip } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-black/5 backdrop-blur-md border-t border-gray-700/50">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-2xl border border-blue-500/30 p-1 bg-blue-500/10 shadow-lg shadow-blue-500/5"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-red-500/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-black/20 shadow-md"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 bg-gray-800/40 border border-gray-700/50 rounded-2xl px-3 py-1.5 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all">
          <button
            type="button"
            className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Smile className="size-5" />
          </button>
          <input
            type="text"
            className="flex-1 bg-transparent border-none text-sm text-gray-100 focus:outline-none placeholder:text-gray-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="flex items-center gap-1">
             <button
              type="button"
              className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
               onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="size-5" />
            </button>
             <button
              type="button"
              className={`p-1 hidden sm:flex text-gray-400 hover:text-blue-400 transition-colors ${imagePreview ? "text-blue-400" : "text-gray-400"}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="size-5" />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={`size-10 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-lg ${
            text.trim() || imagePreview 
              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-500/20 active:scale-95" 
              : "bg-gray-800 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
