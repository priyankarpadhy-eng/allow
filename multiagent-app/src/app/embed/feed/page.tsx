"use client"

import { RoomFeed } from "@/components/RoomFeed"

export default function EmbedFeedPage() {
    return (
        <div className="h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col border-l-0">
            {/* Override RoomFeed styles if needed to fit sidebar */}
            <RoomFeed />
        </div>
    )
}
