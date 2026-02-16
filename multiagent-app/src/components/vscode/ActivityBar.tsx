"use client"

import { cn } from "@/lib/utils"
import { Files, Search, GitBranch, Play, Terminal, Settings, User, Sparkles } from "lucide-react"

interface ActivityBarProps {
    activeId: string
    onSelect: (id: string) => void
}

export function ActivityBar({ activeId, onSelect }: ActivityBarProps) {
    const items = [
        { id: 'explorer', icon: Files, label: 'Explorer' },
        { id: 'search', icon: Search, label: 'Search' },
        { id: 'agents', icon: Sparkles, label: 'Agent Center' },
        { id: 'git', icon: GitBranch, label: 'Source Control' },
        { id: 'run', icon: Play, label: 'Run and Debug' },
    ]

    return (
        <aside
            className="w-[48px] h-full flex flex-col items-center py-2 z-50 select-none transition-all duration-500"
            style={{ backgroundColor: 'var(--alloy-sidebar)', borderRight: '1px solid var(--alloy-border)' }}
        >
            <div className="flex-1 w-full flex flex-col items-center gap-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={cn(
                            "w-full h-12 flex items-center justify-center relative group transition-colors",
                            activeId === item.id ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                        )}
                        title={item.label}
                    >
                        {activeId === item.id && (
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"></div>
                        )}
                        <item.icon className={cn("w-6 h-6", activeId === item.id ? "opacity-100" : "opacity-60 group-hover:opacity-100")} strokeWidth={1.5} />

                        {/* Tooltip */}
                        <div className="absolute left-[48px] px-2 py-1 bg-zinc-800 text-zinc-100 text-[11px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border border-zinc-700 ml-1">
                            {item.label}
                        </div>
                    </button>
                ))}
            </div>

            <div className="w-full flex flex-col items-center gap-1 pb-2">
                <button
                    onClick={() => onSelect('account')}
                    className={cn(
                        "w-full h-12 flex items-center justify-center relative group transition-colors",
                        activeId === 'account' ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                    )}
                >
                    <User className={cn("w-6 h-6", activeId === 'account' ? "opacity-100" : "opacity-60 group-hover:opacity-100")} strokeWidth={1.5} />
                </button>
                <button
                    onClick={() => onSelect('settings')}
                    className={cn(
                        "w-full h-12 flex items-center justify-center relative group transition-colors",
                        activeId === 'settings' ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                    )}
                >
                    {activeId === 'settings' && (
                        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white"></div>
                    )}
                    <Settings className={cn("w-6 h-6", activeId === 'settings' ? "opacity-100" : "opacity-60 group-hover:opacity-100")} strokeWidth={1.5} />
                </button>
            </div>
        </aside>
    )
}
