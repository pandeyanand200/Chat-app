import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-full flex flex-col border-r border-gray-700/50 bg-black/20 backdrop-blur-md">
      {/* Header */}
      <div className="p-5 border-b border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-gray-700/50 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
            <div className="h-3 w-12 bg-gray-700/50 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* User List Skeleton */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3 rounded-xl">
            {/* Avatar skeleton */}
            <div className="relative shrink-0">
              <div className="size-12 rounded-full bg-gray-700/50 animate-pulse" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="flex-1 text-left min-w-0 space-y-2">
               <div className="flex justify-between">
                  <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse" />
                  <div className="h-3 w-10 bg-gray-700/50 rounded animate-pulse" />
               </div>
               <div className="h-3 w-48 bg-gray-700/50 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
