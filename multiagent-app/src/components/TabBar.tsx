"use client"

import { X, FileCode } from "lucide-react"
import { cn } from "@/lib/utils"

interface Tab {
    id: string
    name: string
    active?: boolean
    modified?: boolean
}

interface TabBarProps {
    tabs: Tab[]
    onTabClick: (id: string) => void
    onTabClose: (id: string) => void
}

export function TabBar({ tabs, onTabClick, onTabClose }: TabBarProps) {
    return (
        <div className="h-[35px] bg-[#050505] flex items-center overflow-x-auto no-scrollbar border-b border-black">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    onClick={() => onTabClick(tab.id)}
                    className={cn(
                        "h-full flex items-center px-3 gap-2 border-r border-zinc-900 cursor-pointer transition-colors relative min-w-[120px] max-w-[200px] group",
                        tab.active
                            ? "bg-[#0a0a0a] text-zinc-100 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-blue-500"
                            : "bg-[#050505] text-zinc-500 hover:bg-[#070707] hover:text-zinc-300"
                    )}
                >
                    <FileCode className={cn("w-3.5 h-3.5", tab.active ? "text-blue-400" : "text-zinc-600")} />
                    <span className={cn(
                        "text-[11px] font-medium tracking-tight truncate",
                        tab.active && "text-zinc-200"
                    )}>
                        {tab.name}
                    </span>
                    <div className="flex-1" />
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onTabClose(tab.id)
                        }}
                        className={cn(
                            "p-0.5 rounded transition-colors group-hover:bg-zinc-800",
                            tab.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        {tab.modified ? (
                            <div className="w-2 h-2 rounded-full bg-white mx-0.5"></div>
                        ) : (
                            <X className="w-3 h-3" />
                        )}
                    </button>
                </div>
            ))}
        </div>
    )
}
