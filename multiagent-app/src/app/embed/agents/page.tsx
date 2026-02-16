"use client"

import { ManagerView } from "@/components/ManagerView"
import { useParams } from "next/navigation"

export default function EmbedAgentsPage() {
    // In embed mode, we might need to pass a default roomId or get it from query params
    // For now, let's hardcode a demo room or allow it to be passed via URL
    // Since this is for the extension, we can pass ?roomId=... in the webview URL
    const roomId = "vscode-session"

    return (
        <div className="h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col">
            <ManagerView roomId={roomId} />
        </div>
    )
}
