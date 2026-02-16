import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, LayoutGrid, CheckCircle2, ListTodo, Activity, Play, Plus, Trash2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { TeamMembers } from "./TeamMembers"

interface Agent {
    id: string
    name: string
    role: string
    status: 'idle' | 'working' | 'offline'
}

interface MissionTask {
    id: string
    task: string
    completed: boolean
    proposed?: boolean
}

interface FeedItem {
    id: string
    sender: string
    timestamp: string
    message: string
}

interface ManagerViewProps {
    roomId: string
}

export function ManagerView({ roomId }: ManagerViewProps) {
    const [agents, setAgents] = useState<Agent[]>([
        { id: '1', name: 'Frontend_Agent', role: 'Monitoring UX', status: 'working' }
    ])
    const [tasks, setTasks] = useState<MissionTask[]>([
        { id: '1', task: 'Alloy Hub Initialized', completed: true },
        { id: '2', task: 'Bifurcated Layout Deployed', completed: true },
        { id: '3', task: 'Shared Terminal Protocol', completed: false },
        { id: '4', task: 'Propagate Agent Mission Control', completed: false, proposed: true }
    ])
    const [feed, setFeed] = useState<FeedItem[]>([
        { id: '1', sender: 'Alloy_Core', timestamp: '10:45 AM', message: 'Bifurcated layout implementation started. Standing by for human approval of the navigation system.' }
    ])

    const logActivity = (sender: string, message: string) => {
        const newItem: FeedItem = {
            id: Math.random().toString(36).substr(2, 9),
            sender,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message
        }
        setFeed([newItem, ...feed])
    }

    const spawnAgent = () => {
        const roles = ['Backend_AI', 'Security_Vault', 'Performance_Bot']
        const role = roles[Math.floor(Math.random() * roles.length)]
        const newAgent: Agent = {
            id: Math.random().toString(36).substr(2, 9),
            name: `${role}_${Math.floor(Math.random() * 99)}`,
            role: 'Analyzing Stack',
            status: 'idle'
        }
        setAgents([...agents, newAgent])
        logActivity('System', `New agent spawned: ${newAgent.name}`)
    }
    return (
        <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-y-auto p-8 space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white mb-2 underline decoration-blue-500/30 decoration-4 underline-offset-8">Mission Control</h1>
                    <p className="text-zinc-500 font-medium">Manage agents and oversee the mission for room <span className="text-blue-500 font-mono select-all bg-blue-500/5 px-2 py-0.5 rounded">{roomId}</span></p>
                </div>
                <button
                    onClick={spawnAgent}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 group">
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Spawn Agent
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Agents Card */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Activity className="w-4 h-4 text-green-500" />
                            Active Agents
                        </h3>
                        <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full font-bold">1 ONLINE</span>
                    </div>
                    <div className="space-y-3">
                        {agents.map(agent => (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={agent.id}
                                className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800 rounded-2xl hover:border-blue-500/30 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <LayoutGrid className="w-4 h-4 text-blue-400" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white leading-none">{agent.name}</span>
                                        <span className={cn("text-[10px] mt-1 uppercase font-black tracking-tighter",
                                            agent.status === 'working' ? 'text-green-500' : 'text-zinc-600'
                                        )}>{agent.role}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-600 hover:text-red-400 transition-colors" onClick={() => setAgents(agents.filter(a => a.id !== agent.id))}>
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mission Status Card */}
                <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-blue-500" />
                        Mission Plan
                    </h3>
                    <div className="space-y-4">
                        {tasks.map(task => (
                            <div key={task.id} className={cn("flex items-center gap-3", task.completed && "opacity-40")}>
                                {task.completed ? (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : task.proposed ? (
                                    <AlertCircle className="w-4 h-4 text-yellow-500 animate-pulse" />
                                ) : (
                                    <div className="w-4 h-4 border-2 border-zinc-700 rounded-full"></div>
                                )}
                                <span className={cn("text-xs font-medium", task.completed ? "text-zinc-500 line-through" : task.proposed ? "text-yellow-500/80 italic" : "text-white")}>
                                    {task.task}
                                </span>
                                {task.proposed && (
                                    <button
                                        onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, proposed: false } : t))}
                                        className="ml-auto text-[9px] font-black uppercase text-blue-400 hover:text-white transition-colors"
                                    >
                                        Approve Plan
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <TeamMembers />
            </div>

            {/* Task Feed (Global History) */}
            <div className="flex-1 bg-zinc-900/20 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden min-h-[400px]">
                <div className="p-5 border-b border-zinc-800 bg-zinc-900/20">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Global Mission Feed</h3>
                </div>
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <AnimatePresence>
                        {feed.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                                    <Sparkles className="w-3 h-3 text-blue-400" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-white uppercase tracking-[0.15em]">{item.sender}</span>
                                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{item.timestamp}</span>
                                    </div>
                                    <div className="bg-zinc-900/60 p-4 rounded-2xl rounded-tl-none border border-zinc-800/50 max-w-2xl shadow-inner">
                                        <p className="text-sm text-zinc-400 leading-relaxed font-medium">{item.message}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
