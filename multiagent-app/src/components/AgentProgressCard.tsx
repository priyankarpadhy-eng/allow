"use client"

import { motion } from "framer-motion"
import { Sparkles, FileCode, CheckCircle2, ChevronRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressItem {
    id: string
    label: string
    status: 'done' | 'current' | 'pending'
}

interface AgentProgressCardProps {
    title: string
    role?: 'Frontend' | 'Backend' | 'Testing' | 'Architect'
    thoughtDuration?: string
    summary: string
    filesEdited: string[]
    progress: ProgressItem[]
    onReview?: () => void
    onApprove?: () => void
    isApproved?: boolean
}

export function AgentProgressCard({
    title,
    role,
    thoughtDuration,
    summary,
    filesEdited,
    progress,
    onReview,
    onApprove,
    isApproved
}: AgentProgressCardProps) {
    const roleColors = {
        'Frontend': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'Backend': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'Testing': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
        'Architect': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl mb-6 last:mb-0"
        >
            <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/20">
                <div className="flex items-center gap-2">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.15em] text-zinc-300">
                        {title}
                    </h3>
                    {role && (
                        <span className={cn("text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border", roleColors[role])}>
                            {role}
                        </span>
                    )}
                </div>
                {thoughtDuration && (
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold">
                        <Clock className="w-3 h-3" />
                        {thoughtDuration}
                    </div>
                )}
            </div>

            <div className="p-5 space-y-6">
                {/* Summary */}
                <div className="space-y-2">
                    <p className="text-[13px] text-zinc-200 leading-relaxed font-medium">
                        {summary}
                    </p>
                </div>

                {/* Files Edited */}
                {filesEdited.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Files Edited</h4>
                        <div className="flex flex-wrap gap-2">
                            {filesEdited.map(file => (
                                <div key={file} className="flex items-center gap-1.5 px-2 py-1 bg-zinc-950 border border-zinc-800 rounded-md text-[11px] font-mono text-zinc-400">
                                    <FileCode className="w-3 h-3 text-blue-500" />
                                    {file}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Progress List */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Progress Updates</h4>
                        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Expand all</span>
                    </div>
                    <div className="space-y-3">
                        {progress.map((item, i) => (
                            <div key={item.id} className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    {item.status === 'done' ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                    ) : item.status === 'current' ? (
                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        </div>
                                    ) : (
                                        <div className="w-3.5 h-3.5 rounded-full border border-zinc-800"></div>
                                    )}
                                </div>
                                <span className={cn(
                                    "text-[12px] font-medium leading-tight",
                                    item.status === 'done' ? "text-zinc-500" : item.status === 'current' ? "text-white" : "text-zinc-600"
                                )}>
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-2 border-t border-zinc-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                        {isApproved ? (
                            <div className="flex items-center gap-1 text-green-500">
                                <CheckCircle2 className="w-3 h-3" />
                                Applied
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Verified
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        {onReview && (
                            <button
                                onClick={onReview}
                                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-zinc-500 hover:text-white transition-colors group"
                            >
                                Diff
                                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        )}
                        {onApprove && !isApproved && (
                            <button
                                onClick={onApprove}
                                className="px-3 py-1 bg-[#6366f1] hover:bg-[#4f46e5] text-white text-[9px] font-black rounded uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
                            >
                                Apply Changes
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
