"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Palette, Check, Monitor, Layout, Keyboard, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Theme {
    id: string
    name: string
    description: string
    colors: {
        bg: string
        sidebar: string
        accent: string
        border: string
    }
}

export const themes: Theme[] = [
    {
        id: 'alloy-dark',
        name: 'Alloy Deep Dark',
        description: 'The signature Alloy mission control aesthetic.',
        colors: { bg: '#0a0a0a', sidebar: '#050505', accent: '#6366f1', border: '#18181b' }
    },
    {
        id: 'monokai',
        name: 'Monokai Noir',
        description: 'The classic high-contrast programmer favorite.',
        colors: { bg: '#1a1a1a', sidebar: '#121212', accent: '#f92672', border: '#2a2a2a' }
    },
    {
        id: 'one-dark',
        name: 'One Dark Ultra',
        description: 'A professional, balanced dark workspace.',
        colors: { bg: '#282c34', sidebar: '#21252b', accent: '#61afef', border: '#3e4451' }
    },
    {
        id: 'github-dark',
        name: 'GitHub Dark',
        description: 'The standard GitHub dark experience.',
        colors: { bg: '#0d1117', sidebar: '#010409', accent: '#58a6ff', border: '#30363d' }
    },
    {
        id: 'solarized-dark',
        name: 'Solarized Mission',
        description: 'Precision colors for long late-night sessions.',
        colors: { bg: '#002b36', sidebar: '#073642', accent: '#268bd2', border: '#073642' }
    },
    {
        id: 'synthwave',
        name: 'SynthWave \'84',
        description: 'For the visionary future-architect.',
        colors: { bg: '#241b2f', sidebar: '#201827', accent: '#ff7edb', border: '#4d3b5e' }
    },
    {
        id: 'dracula',
        name: 'Dracula Official',
        description: 'A dark theme for vampires.',
        colors: { bg: '#282a36', sidebar: '#21222c', accent: '#bd93f9', border: '#44475a' }
    },
    {
        id: 'nord',
        name: 'Nordic Frost',
        description: 'An arctic, north-bluish color palette.',
        colors: { bg: '#2e3440', sidebar: '#242933', accent: '#88c0d0', border: '#3b4252' }
    },
    {
        id: 'rose-pine',
        name: 'Rosé Pine',
        description: 'All-natural pine, voiced for the night.',
        colors: { bg: '#191724', sidebar: '#1f1d2e', accent: '#ebbcba', border: '#26233a' }
    },
    {
        id: 'gruvbox',
        name: 'Gruvbox Dark',
        description: 'Retro groove color scheme.',
        colors: { bg: '#282828', sidebar: '#1d2021', accent: '#fabd2f', border: '#3c3836' }
    },
    {
        id: 'cyberpunk',
        name: 'Cyberpunk 2077',
        description: 'Neon-infused high-tech interface.',
        colors: { bg: '#000b1e', sidebar: '#000000', accent: '#fcee0a', border: '#003d5b' }
    }
]

export function SettingsView({ currentTheme, onThemeChange }: { currentTheme: string, onThemeChange: (id: string) => void }) {
    const [activeSection, setActiveSection] = useState('appearance')

    const sections = [
        { id: 'appearance', icon: Palette, label: 'Appearance' },
        { id: 'editor', icon: Layout, label: 'Editor' },
        { id: 'keys', icon: Keyboard, label: 'Keyboard' },
        { id: 'security', icon: Shield, label: 'Security' }
    ]

    return (
        <div className="flex-1 flex bg-[var(--alloy-bg)] overflow-hidden">
            {/* Settings Navigation */}
            <aside className="w-[200px] border-r border-zinc-900/50 flex flex-col pt-4">
                <div className="px-6 mb-8">
                    <h2 className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-600">Settings</h2>
                </div>
                <nav className="space-y-1">
                    {sections.map(section => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-6 py-2.5 text-[11px] font-bold transition-all border-l-2",
                                activeSection === section.id
                                    ? "bg-white/5 border-[var(--alloy-accent)] text-[var(--alloy-accent)]"
                                    : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                            )}
                        >
                            <section.icon className="w-4 h-4" />
                            {section.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Settings Content */}
            <main className="flex-1 overflow-y-auto p-12 no-scrollbar">
                {activeSection === 'appearance' && (
                    <div className="max-w-2xl space-y-12">
                        <header>
                            <h1 className="text-2xl font-black text-white mb-2 tracking-tight">Workbench Appearance</h1>
                            <p className="text-sm text-zinc-500">Configure the visual signature of your Alloy instance.</p>
                        </header>

                        <section className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700 border-b border-zinc-900 pb-2">Color Themes</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {themes.map(theme => (
                                    <button
                                        key={theme.id}
                                        onClick={() => onThemeChange(theme.id)}
                                        className={cn(
                                            "group flex flex-col rounded-xl border p-4 text-left transition-all hover:bg-white/5",
                                            currentTheme === theme.id
                                                ? "border-[var(--alloy-accent)] bg-[var(--alloy-accent)]/5"
                                                : "border-zinc-800 bg-black/40"
                                        )}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={cn(
                                                "text-[12px] font-black tracking-tight",
                                                currentTheme === theme.id ? "text-white" : "text-zinc-400"
                                            )}>{theme.name}</span>
                                            {currentTheme === theme.id && <Check className="w-4 h-4 text-[var(--alloy-accent)]" />}
                                        </div>

                                        {/* Theme Preview Swatch */}
                                        <div className="h-24 w-full rounded-lg mb-3 flex overflow-hidden border border-zinc-900 ring-1 ring-white/5">
                                            <div className="w-1/3 h-full" style={{ backgroundColor: theme.colors.sidebar }}></div>
                                            <div className="flex-1 h-full p-2" style={{ backgroundColor: theme.colors.bg }}>
                                                <div className="flex gap-1 mb-2">
                                                    <div className="w-4 h-1 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                                                    <div className="w-8 h-1 rounded-full opacity-20" style={{ backgroundColor: theme.colors.accent }}></div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="w-full h-0.5 bg-white/10 rounded"></div>
                                                    <div className="w-3/4 h-0.5 bg-white/10 rounded"></div>
                                                    <div className="w-1/2 h-0.5 bg-white/10 rounded"></div>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[10px] text-zinc-600 font-medium leading-relaxed uppercase tracking-wider">
                                            {theme.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main>
        </div>
    )
}
