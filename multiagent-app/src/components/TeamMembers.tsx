"use client"

import { Users, Circle, Mic, Monitor, Edit3 } from "lucide-react"

interface Member {
    id: string
    name: string
    role: string
    status: 'online' | 'busy' | 'offline'
    editing?: string
    permission: 'read' | 'write' | 'admin'
}

export function TeamMembers() {
    const members: Member[] = [
        { id: '1', name: 'You', role: 'Lead Developer', status: 'online', editing: 'src/app/page.tsx', permission: 'admin' },
        { id: '2', name: 'Sarah_Desgn', role: 'UI/UX', status: 'busy', editing: 'components/Button.tsx', permission: 'write' },
        { id: '3', name: 'Mike_Backend', role: 'API Specialist', status: 'online', permission: 'write' },
        { id: '4', name: 'Alex_Manager', role: 'Product Owner', status: 'offline', permission: 'read' }
    ]

    return (
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    Team Members
                </h3>
                <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full font-bold">3 ONLINE</span>
            </div>

            <div className="space-y-3">
                {members.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-zinc-950/50 border border-zinc-800/50 rounded-2xl group hover:border-zinc-700 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                                    {member.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 ${member.status === 'online' ? 'bg-green-500' : member.status === 'busy' ? 'bg-red-500' : 'bg-zinc-600'
                                    }`}></div>
                            </div>
                            <div>
                                <div className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                                    {member.name}
                                    <span className={`text-[8px] uppercase font-black px-1.5 py-0.5 rounded border ${member.permission === 'admin' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' :
                                            member.permission === 'write' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                                                'bg-zinc-800 border-zinc-700 text-zinc-500'
                                        }`}>
                                        {member.permission}
                                    </span>
                                </div>
                                <div className="text-[10px] text-zinc-500 font-medium tracking-wide">{member.role}</div>
                            </div>
                        </div>

                        {member.editing && (
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 rounded-md border border-blue-500/20">
                                <Edit3 className="w-3 h-3 text-blue-400" />
                                <span className="text-[9px] text-blue-300 font-mono truncate max-w-[80px]">{member.editing}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
