"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Square, FastForward, Rewind, MousePointer2, Scissors, Hand, Type } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [timecode, setTimecode] = useState("00:00:00:00");

    useEffect(() => {
        // Fake timecode running animation
        const interval = setInterval(() => {
            const now = new Date();
            const ms = Math.floor(now.getMilliseconds() / 33).toString().padStart(2, '0'); // roughly 30fps
            const s = now.getSeconds().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const h = now.getHours().toString().padStart(2, '0');
            setTimecode(`${h}:${m}:${s}:${ms}`);
        }, 33);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="w-full bg-[#1a0030] border-b border-[#3d1b5c] shrink-0 z-40 relative shadow-md">
            {/* Top Menu Bar */}
            <div className="flex items-center text-xs px-2 py-1 space-x-4 border-b border-[#3d1b5c]/50 text-[#e0d4f5]/80">
                <div className="flex items-center space-x-3">
                    <span className="font-bold text-[#c084fc] drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]">AE</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">File</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">Edit</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">Composition</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">Layer</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">Effect</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">View</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">Window</span>
                    <span className="cursor-pointer hover:bg-white/10 px-1 rounded">Help</span>
                </div>
                <div className="flex-1"></div>
                <div className="font-mono text-[10px] text-[#8b75a3]">Kanami_Unit_Project.aep</div>
            </div>

            {/* Main Toolbar */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#0d0010]">

                {/* Left Tools */}
                <div className="flex items-center space-x-1 border-r border-[#3d1b5c] pr-4">
                    <button className="p-1.5 rounded hover:bg-[#3d1b5c] text-[#c084fc] bg-[#3d1b5c]/50 transition-colors">
                        <MousePointer2 size={16} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[#3d1b5c] text-[#8b75a3] transition-colors">
                        <Hand size={16} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[#3d1b5c] text-[#8b75a3] transition-colors">
                        <Scissors size={16} />
                    </button>
                    <button className="p-1.5 rounded hover:bg-[#3d1b5c] text-[#8b75a3] transition-colors">
                        <Type size={16} />
                    </button>
                </div>

                {/* Navigation Tabs (Simulating Workspaces) */}
                <div className="flex space-x-1 px-4 flex-1">
                    <Link
                        href="/"
                        className={`px-4 py-1 text-sm rounded-t-md border-b-2 transition-all ${pathname === '/' ? 'bg-[#1a0030] text-white border-[#9b30ff]' : 'text-[#8b75a3] hover:text-[#e0d4f5] border-transparent hover:bg-[#1a0030]/50'}`}
                    >
                        Project
                    </Link>
                    <Link
                        href="/members"
                        className={`px-4 py-1 text-sm rounded-t-md border-b-2 transition-all ${pathname === '/members' ? 'bg-[#1a0030] text-white border-[#9b30ff]' : 'text-[#8b75a3] hover:text-[#e0d4f5] border-transparent hover:bg-[#1a0030]/50'}`}
                    >
                        Timeline / Members
                    </Link>
                    <Link
                        href="/gallery"
                        className={`px-4 py-1 text-sm rounded-t-md border-b-2 transition-all ${pathname === '/gallery' ? 'bg-[#1a0030] text-white border-[#9b30ff]' : 'text-[#8b75a3] hover:text-[#e0d4f5] border-transparent hover:bg-[#1a0030]/50'}`}
                    >
                        Composition / Gallery
                    </Link>
                </div>

                {/* Right Playback & Timecode */}
                <div className="flex items-center space-x-4">
                    <div className="font-mono text-[#ff3366] text-sm tabular-nums tracking-widest bg-black px-3 py-1 rounded border border-[#ff3366]/30 shadow-[0_0_10px_rgba(255,51,102,0.2)]">
                        {timecode}
                    </div>

                    <div className="flex items-center space-x-1 bg-[#150026] p-1 rounded border border-[#3d1b5c]">
                        <button className="p-1 rounded hover:bg-[#3d1b5c] text-[#8b75a3] transition-colors">
                            <Rewind size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-[#3d1b5c] text-[#8b75a3] transition-colors">
                            <Square size={16} />
                        </button>
                        <button className="p-1 rounded hover:bg-[#9b30ff] text-[#e0d4f5] transition-colors drop-shadow-[0_0_5px_rgba(155,48,255,0.8)]">
                            <Play size={16} fill="currentColor" />
                        </button>
                        <button className="p-1 rounded hover:bg-[#3d1b5c] text-[#8b75a3] transition-colors">
                            <FastForward size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </nav>
    );
}
