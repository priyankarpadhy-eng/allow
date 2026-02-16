"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createRoom } from "@/lib/rooms"
import { motion, AnimatePresence } from "framer-motion"
import { Code2, ArrowRight, Sparkles, Plus } from "lucide-react"

export default function Lobby() {
    const [roomId, setRoomId] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!roomId) return
        setLoading(true)
        // Optional: Only call createRoom if Supabase keys exist, otherwise just navigate
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            await createRoom(roomId)
        }
        router.push(`/room/${roomId}`)
    }

    const handleCreate = async () => {
        const id = Math.random().toString(36).substring(7)
        setLoading(true)
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            await createRoom(id)
        }
        router.push(`/room/${id}`)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-zinc-100 overflow-hidden relative">
            {/* Animated Background Blurs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full space-y-12 p-1 relative"
            >
                {/* Glow effect for the card */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10"></div>

                <div className="bg-zinc-900/80 backdrop-blur-2xl p-10 rounded-3xl border border-zinc-800 shadow-2xl space-y-8">
                    <div className="text-center space-y-4">
                        <motion.div
                            initial={{ rotate: -10 }}
                            animate={{ rotate: 0 }}
                            className="inline-flex p-3 bg-zinc-800 rounded-2xl border border-zinc-700 mb-2"
                        >
                            <Code2 className="w-8 h-8 text-blue-400" />
                        </motion.div>
                        <h1 className="text-5xl font-black tracking-tight text-white">
                            Collab<span className="text-blue-500">Sync</span>
                        </h1>
                        <p className="text-zinc-400 text-lg font-medium">Real-time collaboration meets AI intelligence.</p>
                    </div>

                    <div className="space-y-6">
                        <form onSubmit={handleJoin} className="relative group">
                            <input
                                type="text"
                                placeholder="Paste room ID to join..."
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-lg font-mono"
                            />
                            <button
                                type="submit"
                                disabled={loading || !roomId}
                                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 px-6 rounded-xl transition-all flex items-center gap-2 group-hover:scale-[1.02] active:scale-95"
                            >
                                <span className="font-bold">Join</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="flex items-center gap-4 px-2">
                            <div className="h-[1px] flex-1 bg-zinc-800"></div>
                            <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">or</span>
                            <div className="h-[1px] flex-1 bg-zinc-800"></div>
                        </div>

                        <button
                            onClick={handleCreate}
                            disabled={loading}
                            className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-white/5"
                        >
                            <Plus className="w-5 h-5" />
                            <span>Create New Session</span>
                        </button>
                    </div>

                    <div className="pt-4 flex items-center justify-center gap-6 text-zinc-500">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter">
                            <Sparkles className="w-3 h-3 text-yellow-500/50" />
                            AI Powered
                        </div>
                        <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-tighter">
                            <div className="flex -space-x-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-4 h-4 rounded-full border border-zinc-900 bg-zinc-800"></div>
                                ))}
                            </div>
                            Multiplayer
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-8 text-zinc-600 text-sm font-medium"
            >
                Built for collaborative efficiency.
            </motion.footer>
        </div>
    )
}
