"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Send, Loader2, Share2, Play, Monitor, Terminal as TerminalIcon } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { ManagerView } from "@/components/ManagerView"
import { AgentProgressCard } from "@/components/AgentProgressCard"
import { ActivityBar } from "@/components/vscode/ActivityBar"
import { StatusBar } from "@/components/vscode/StatusBar"
import { RoomFeed } from "@/components/RoomFeed"
import { SettingsView, themes } from "@/components/SettingsView"

type ViewMode = 'editor' | 'manager'

interface AgentProgress {
    id: string
    label: string
    status: 'done' | 'current' | 'pending'
}

interface AgentCard {
    id: string
    title: string
    role: 'Frontend' | 'Backend' | 'Testing' | 'Architect'
    summary: string
    plan?: string
    approved?: boolean
    thoughtDuration: string
    filesEdited: string[]
    progress: AgentProgress[]
}

export default function RoomPage() {
    const { id } = useParams()
    const roomId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : ''

    // UI State
    const [viewMode, setViewMode] = useState<ViewMode>('editor')
    const [activeSidebar, setActiveSidebar] = useState<string>('agents') // Default to agents since VS Code has its own explorer
    const [currentTheme, setCurrentTheme] = useState('alloy-dark')
    const [activeFilePath, setActiveFilePath] = useState<string | null>(null)

    // AI Agent
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<AgentCard[]>([
        {
            id: 'init',
            title: 'Alloy: OpenVSCode Server',
            role: 'Architect',
            summary: 'Connected to Docker Backend. Use the VS Code interface for development. I will manage the mission from here.',
            thoughtDuration: 'Thought for 1s',
            filesEdited: [],
            progress: [
                { id: '1', label: 'Docker Container Connected', status: 'done' },
                { id: '2', label: 'VS Code Backend Ready', status: 'done' }
            ]
        }
    ])

    // AI prompt handler
    const handleAiPrompt = async () => {
        if (!prompt) return
        const userMessage = prompt

        setMessages(prev => [...prev, {
            id: 'temp-' + Date.now(),
            title: 'User Prompt',
            role: 'Architect',
            summary: userMessage,
            thoughtDuration: '',
            filesEdited: [],
            progress: []
        }])
        setPrompt("")
        setLoading(true)
        try {
            // For now, we don't have active file content reading from VS Code easily without an extension.
            // We'll send empty context or implement reading later.
            const currentCode = "// Context from VS Code not available yet"
            const res = await fetch('/api/ai', {
                method: 'POST',
                body: JSON.stringify({ prompt: userMessage, currentCode, language: 'javascript' }),
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()

            // If AI returns code, we propose it. 
            // Note: We need a target file. For MVP, we'll assume the user specifies it or we default to a scratchpad,
            // but the AI usually doesn't know the file path unless we tell it.
            // For this MVP, we will assume the AI generates a plan and we might not be able to auto-apply 
            // without a known file path.
            // HOWEVER, if the AI returns code, we can try to apply it if we knew where.
            // Let's assume we can apply it if the AI *tells* us the filename?
            // Or we just show it.

            if (data.newCode) {
                const newCard: AgentCard = {
                    id: Math.random().toString(36).substr(2, 9),
                    title: 'Alloy: Implementation Plan',
                    role: 'Architect',
                    summary: `I've analyzed your request: "${userMessage}". Review the plan below.`,
                    plan: data.newCode,
                    approved: false,
                    thoughtDuration: 'Thought for 4s',
                    filesEdited: ['(Select file to apply)'], // Placeholder
                    progress: [
                        { id: 'p1', label: 'Analyzing Request', status: 'done' },
                        { id: 'p2', label: 'Generating Plan', status: 'done' },
                        { id: 'p3', label: 'Awaiting Admin Approval', status: 'current' }
                    ]
                }
                setMessages(prev => [...prev, newCard])
            }
        } catch (e) {
            console.error('AI Error:', e)
            setMessages(prev => [...prev, {
                id: 'err-' + Date.now(),
                title: 'Alloy: Error',
                role: 'Architect',
                summary: "AI agent failed.",
                thoughtDuration: '',
                filesEdited: [],
                progress: []
            }])
        } finally {
            setLoading(false)
        }
    }

    const handleApplyCode = async (code: string) => {
        // In a real app, we'd know the file. For now, hardcode or prompt?
        // Let's hardcode a test file or ask user?
        // Since we can't easily prompt, let's write to a "latest-ai-change.ts" or just log it.
        // Better: We write to `ai-patch.txt` for now.
        try {
            await fetch('/api/filesystem', {
                method: 'POST',
                body: JSON.stringify({ path: 'ai-patch.txt', content: code }),
                headers: { 'Content-Type': 'application/json' }
            })
            alert("Code written to ai-patch.txt (Host sync active)")
        } catch (e) {
            console.error(e)
            alert("Failed to write file")
        }
    }

    const activeTheme = themes.find(t => t.id === currentTheme) || themes[0]

    return (
        <div
            className="h-screen flex flex-col font-sans overflow-hidden transition-colors duration-500"
            style={{
                backgroundColor: activeTheme.colors.bg,
                color: activeTheme.colors.bg === '#ffffff' ? '#1f2937' : '#f4f4f5',
                '--alloy-bg': activeTheme.colors.bg,
                '--alloy-sidebar': activeTheme.colors.sidebar,
                '--alloy-accent': activeTheme.colors.accent,
                '--alloy-border': activeTheme.colors.border
            } as any}
        >
            <div className="flex-1 flex overflow-hidden">
                <ActivityBar
                    activeId={activeSidebar}
                    onSelect={(id: string) => setActiveSidebar(id)}
                />

                {/* Sidebar */}
                <div className="w-[300px] flex flex-col border-r border-zinc-900 bg-[#0a0a0a] z-40">
                    {(activeSidebar === 'settings' || activeSidebar === 'account') && (
                        <div className="flex-1 flex flex-col bg-[#0a0a0a]">
                            <div className="p-4 border-b border-zinc-900 flex items-center bg-black/20">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">{activeSidebar} Mode</span>
                            </div>
                            <div className="flex-1 p-8 opacity-40 text-[10px] uppercase font-bold tracking-[0.3em] text-center mt-20">
                                Configure Workbench via Center Panel
                            </div>
                        </div>
                    )}
                    {(activeSidebar === 'agents' || activeSidebar === 'explorer') && (
                        <div className="flex flex-col h-full bg-[#0a0a0a] shadow-inner">
                            <div className="p-4 border-b border-zinc-900 flex items-center justify-between bg-black/20">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#444]">Mission Agent Control</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Active</span>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-3 no-scrollbar">
                                <AnimatePresence initial={false}>
                                    {messages.map((card, i) => (
                                        <AgentProgressCard
                                            key={card.id || i}
                                            title={card.title}
                                            role={card.role}
                                            summary={card.summary}
                                            thoughtDuration={card.thoughtDuration}
                                            filesEdited={card.filesEdited}
                                            progress={card.progress}
                                            onReview={() => { }}
                                            onApprove={() => {
                                                if (card.plan) {
                                                    handleApplyCode(card.plan)
                                                    setMessages(prev => prev.map(m =>
                                                        m.id === card.id ? {
                                                            ...m,
                                                            approved: true,
                                                            title: 'Alloy: Changes Applied',
                                                            progress: m.progress.map(p => p.id === 'p3' ? { ...p, status: 'done' as const, label: 'Changes Applied' } : p)
                                                        } : m
                                                    ))
                                                }
                                            }}
                                            isApproved={card.approved}
                                        />
                                    ))}
                                </AnimatePresence>
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 w-full animate-pulse">
                                            <div className="h-3 w-24 bg-zinc-800 rounded mb-4"></div>
                                            <div className="h-2 w-full bg-zinc-800 rounded mb-2"></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-3 border-t border-zinc-900 bg-black/20">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Command agent..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAiPrompt()}
                                        className="w-full bg-[#050505] border border-zinc-800 rounded-lg pl-3 pr-8 py-2 text-[11px] text-zinc-300 placeholder:text-zinc-700 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all font-medium"
                                    />
                                    <button
                                        onClick={handleAiPrompt}
                                        disabled={loading || !prompt}
                                        className="absolute right-2 top-1.5 text-zinc-600 hover:text-blue-500 transition-colors"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {(activeSidebar === 'search' || activeSidebar === 'git' || activeSidebar === 'run') && (
                        <div className="flex-1 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-800">
                            {activeSidebar} Managed in VS Code
                        </div>
                    )}
                </div>

                {/* Workbench Center */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {/* Header */}
                    <header className="h-[35px] border-b border-zinc-900 flex items-center justify-between px-4 bg-black select-none z-50 shrink-0">
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] font-medium text-zinc-500 tracking-tight">
                                Alloy <span className="opacity-50">/</span> <span className="text-zinc-300 font-bold">{roomId}</span>
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-green-500 font-bold">
                                <Monitor className="w-3 h-3" />
                                Docker Backend Connected
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 text-[10px] font-bold rounded transition-all uppercase tracking-widest border border-zinc-800">
                                <Share2 className="w-3 h-3" />
                                Share
                            </button>
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col overflow-hidden bg-[#1e1e1e]">
                        {/* Embed OpenVSCode Server */}
                        <iframe
                            src="http://localhost:3001"
                            className="w-full h-full border-none"
                            title="OpenVSCode Server"
                            allow="clipboard-read; clipboard-write;"
                        />
                    </main>
                </div>

                {/* Room Feed Sidebar */}
                <RoomFeed />
            </div>

            {/* Status Bar */}
            <StatusBar
                usersInRoom={1}
                connectionStatus="connected"
                roomId={roomId}
                containerState={'Active'}
            />
        </div>
    )
}
