import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SidebarItemProps {
    icon: LucideIcon
    label: string
    active?: boolean
    onClick: () => void
    collapsed?: boolean
}

export function SidebarItem({ icon: Icon, label, active, onClick, collapsed }: SidebarItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 w-full p-3 rounded-xl transition-all group relative",
                active ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
            )}
        >
            <Icon className={cn("w-5 h-5 shrink-0", active ? "text-white" : "group-hover:scale-110 transition-transform")} />
            {!collapsed && <span className="text-sm font-bold tracking-tight">{label}</span>}
            {collapsed && (
                <div className="absolute left-14 px-2 py-1 bg-zinc-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {label}
                </div>
            )}
        </button>
    )
}
