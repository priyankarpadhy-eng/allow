"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Send, User, Sparkles, MessageSquare } from "lucide-react"
import { useState } from "react"

interface ChatMessage {
    id: string
    sender: string
    content: string
    timestamp: string
    type: 'user' | 'agent' | 'system'
}

export function RoomFeed() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '1', sender: 'Alloy', content: 'Room initialized. Cloud container is READY.', timestamp: '12:45', type: 'system' },
        { id: '2', sender: 'Frontend_Agent', content: 'I am monitoring the UI components. Let me know if you need any iterations.', timestamp: '12:46', type: 'agent' }
    ])
    const [input, setInput] = useState("")

    const sendMessage = () => {
        if (!input.trim()) return
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: 'You',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'user'
        }
        setMessages([...messages, newMessage])
        setInput("")
    }

    return (
        <aside
            className="w-[300px] border-l flex flex-col z-40 transition-all duration-500"
            style={{ backgroundColor: 'var(--alloy-bg)', borderColor: 'var(--alloy-border)' }}
        >
            <div className="h-[35px] border-b flex items-center px-4 transition-all duration-500" style={{ backgroundColor: 'var(--alloy-sidebar)', borderColor: 'var(--alloy-border)' }}>
                <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" />
                    Room Feed
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col gap-1.5"
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${msg.type === 'agent' ? 'text-blue-400' : msg.type === 'system' ? 'text-zinc-600' : 'text-zinc-400'
                                    }`}>
                                    {msg.sender}
                                </span>
                                <span className="text-[9px] text-zinc-700 font-mono">{msg.timestamp}</span>
                            </div>
                            <div className={`p-3 rounded-xl border ${msg.type === 'user' ? 'bg-blue-600/10 border-blue-500/20 text-zinc-200' :
                                msg.type === 'agent' ? 'bg-zinc-900/50 border-zinc-800 text-zinc-300' :
                                    'bg-black border-zinc-900 text-zinc-500 italic'
                                } text-[12px] leading-relaxed shadow-sm`}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="p-4 border-t border-zinc-900 bg-black/20">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Message room..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="w-full bg-[#050505] border border-zinc-800 rounded-lg pl-3 pr-8 py-2 text-[11px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                    <button
                        onClick={sendMessage}
                        className="absolute right-2 top-1.5 text-zinc-600 hover:text-blue-500 transition-colors"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </aside>
    )
}
