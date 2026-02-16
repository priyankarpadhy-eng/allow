"use client"

import { ChevronRight, Home, Folder, FileCode } from "lucide-react"

interface BreadcrumbsProps {
    path: string[]
}

export function Breadcrumbs({ path }: BreadcrumbsProps) {
    return (
        <nav className="h-9 border-b border-zinc-900 bg-[#0a0a0a] flex items-center px-6 gap-2 text-[11px] font-medium text-zinc-500 tracking-tight select-none overflow-x-auto no-scrollbar">
            <Home className="w-3 h-3 hover:text-blue-400 cursor-pointer transition-colors shrink-0" />

            {path.map((item, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                    <ChevronRight className="w-3 h-3 text-zinc-700" />
                    <div className="flex items-center gap-1.5 hover:text-zinc-200 cursor-pointer transition-colors px-1 rounded hover:bg-zinc-800/50">
                        {i === path.length - 1 ? (
                            <FileCode className="w-3 h-3 text-blue-400" />
                        ) : (
                            <Folder className="w-3 h-3 text-zinc-600" />
                        )}
                        <span className={i === path.length - 1 ? "text-zinc-300 font-bold" : ""}>{item}</span>
                    </div>
                </div>
            ))}
        </nav>
    )
}
