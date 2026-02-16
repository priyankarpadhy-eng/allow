"use client"

import { GitBranch, Wifi, Users, Check, Bell, Code2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusBarProps {
    usersInRoom: number
    connectionStatus: 'connected' | 'reconnecting' | 'offline'
}

interface StatusBarProps {
    usersInRoom: number
    connectionStatus: 'connected' | 'reconnecting' | 'offline'
    roomId?: string
    containerState?: 'Active' | 'Idle' | 'Starting'
    agentMode?: 'Fast' | 'Planning'
}

export function StatusBar({
    usersInRoom,
    connectionStatus,
    roomId = 'UNKNOWN',
    containerState = 'Active',
    agentMode = 'Fast'
}: StatusBarProps) {
    return (
        <footer
            className="h-[24px] border-t text-zinc-400 flex items-center justify-between px-3 text-[10px] font-bold select-none z-50 transition-all duration-500"
            style={{ backgroundColor: 'var(--alloy-sidebar)', borderColor: 'var(--alloy-border)' }}
        >
            <div className="flex items-center h-full gap-1">
                <div className="h-full flex items-center px-2 hover:bg-zinc-800/50 cursor-pointer gap-2 group">
                    <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        connectionStatus === 'connected' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-zinc-600"
                    )}></div>
                    <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-tight">Room: <span className="text-zinc-200">{roomId}</span></span>
                </div>

                <div className="w-[1px] h-3 bg-zinc-800 mx-1"></div>

                <div className="h-full flex items-center px-2 hover:bg-zinc-800/50 cursor-pointer gap-2 group">
                    <span className="text-zinc-500 group-hover:text-zinc-300 uppercase tracking-tight">Container: <span className="text-[#6366f1]">{containerState}</span></span>
                </div>

                <div className="w-[1px] h-3 bg-zinc-800 mx-1"></div>

                <div className="h-full flex items-center px-2 hover:bg-zinc-800/50 cursor-pointer gap-2 group">
                    <Users className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-500 group-hover:text-zinc-300 uppercase tracking-tight">Admins: <span className="text-zinc-200">{usersInRoom}</span></span>
                </div>
            </div>

            <div className="flex items-center h-full gap-2">
                <div className="h-full flex items-center px-2 hover:bg-zinc-800/50 cursor-pointer gap-2 group">
                    <Sparkles className="w-3 h-3 text-[#6366f1]" />
                    <span className="text-zinc-500 group-hover:text-zinc-300 uppercase tracking-tight">Agent Mode: <span className="text-[#6366f1]">{agentMode}</span></span>
                </div>

                <div className="w-[1px] h-3 bg-zinc-800 mx-1"></div>

                <div className="h-full flex items-center px-2 hover:bg-zinc-800/50 cursor-pointer gap-2 group">
                    <Check className="w-3 h-3 text-green-500" />
                    <span className="text-zinc-500 group-hover:text-zinc-300 uppercase tracking-tight">VFS: Synced</span>
                </div>

                <div className="h-full flex items-center px-2 hover:bg-zinc-800/50 cursor-pointer ml-1">
                    <Bell className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                </div>
            </div>
        </footer>
    )
}
