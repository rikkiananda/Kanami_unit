import { Eye, Lock, LayoutList, ChevronRight } from "lucide-react";

export default function Members() {
    const members = [
        { name: "Rikki", role: "Founder", color: "bg-red-500", trackLength: "w-[90%]" },
        { name: "QodryMv", role: "Staff", color: "bg-[#9b30ff]", trackLength: "w-[85%]" },
        { name: "Bryan", role: "Staff", color: "bg-[#9b30ff]", trackLength: "w-[80%]" },
        { name: "Rei", role: "Staff", color: "bg-[#9b30ff]", trackLength: "w-[75%]" },
        { name: "Aldi", role: "Staff", color: "bg-[#9b30ff]", trackLength: "w-[70%]" },
        { name: "Zen", role: "Helper", color: "bg-[#c084fc]", trackLength: "w-[65%]" },
        { name: "Haidar", role: "Helper", color: "bg-[#c084fc]", trackLength: "w-[60%]" },
    ];

    return (
        <div className="flex-1 flex flex-col bg-[var(--color-editor-panel-bg)] rounded-md border border-[var(--color-editor-border)] shadow-lg overflow-hidden">

            {/* Timeline Toolbar Header */}
            <div className="px-3 py-1 border-b border-[var(--color-editor-border)] bg-[#150026] text-xs font-semibold text-[#c084fc] flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <span>Kanami_Unit_Timeline</span>
                    <span className="text-[#8b75a3] font-mono font-normal">00:00:00:00</span>
                </div>
                <LayoutList size={14} className="text-[#8b75a3]" />
            </div>

            {/* Main Timeline Workspace */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left Side: Layers Panel */}
                <div className="w-[300px] bg-[#0d0010] border-r border-[#3d1b5c] flex flex-col shrink-0">

                    {/* Properties Header */}
                    <div className="flex text-xs text-[#8b75a3] border-b border-[#3d1b5c] py-2 px-2 font-semibold">
                        <div className="w-12 flex justify-around px-1 border-r border-[#3d1b5c]/50">
                            <Eye size={12} />
                            <Lock size={12} />
                        </div>
                        <div className="flex-1 px-3 border-r border-[#3d1b5c]/50">Layer Name</div>
                        <div className="w-20 px-2 text-center text-[10px]">Mode</div>
                    </div>

                    {/* Members Layers List */}
                    <div className="flex-1 overflow-y-auto">
                        {members.map((member, idx) => (
                            <div key={idx} className="flex text-xs text-[#e0d4f5] border-b border-[#3d1b5c]/50 hover:bg-[#3d1b5c]/30 group transition-colors">
                                <div className="w-12 py-2 flex justify-around px-1 items-center border-r border-[#3d1b5c]/50">
                                    <Eye size={12} className="text-[#c084fc]" />
                                    <span className="w-2 h-2 rounded-full border border-[#8b75a3]"></span>
                                </div>
                                <div className="flex-1 px-2 py-2 border-r border-[#3d1b5c]/50 flex items-center space-x-2">
                                    <ChevronRight size={12} className="text-[#8b75a3] group-hover:text-[#c084fc] transition-colors" />
                                    <span className={`w-3 h-3 rounded-sm ${member.color}`}></span>
                                    <span className="font-mono text-[11px] truncate">{idx + 1}. {member.name}</span>
                                </div>
                                <div className="w-20 px-2 py-2 flex items-center justify-center font-mono text-[10px] text-[#8b75a3]">
                                    {member.role}
                                </div>
                            </div>
                        ))}

                        {/* Empty Space for rest of panel */}
                        <div className="h-full border-r border-transparent"></div>
                    </div>
                </div>

                {/* Right Side: Timeline Tracks */}
                <div className="flex-1 bg-[#1a0030] flex flex-col overflow-x-auto relative">

                    {/* Time Ruler */}
                    <div className="h-[31px] border-b border-[#3d1b5c] bg-[#150026] flex items-end px-4 sticky top-0 z-10 min-w-max w-full">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="flex-1 min-w-[50px] border-l border-[#3d1b5c] pl-1 pb-1">
                                <span className="text-[10px] text-[#8b75a3] font-mono">00:0{i}f</span>
                            </div>
                        ))}
                    </div>

                    {/* Playhead Marker */}
                    <div className="absolute top-0 bottom-0 left-[150px] w-[1px] bg-[var(--color-editor-playhead)] z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(255,51,102,0.8)]">
                        <div className="absolute top-0 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-[var(--color-editor-playhead)]"></div>
                    </div>

                    {/* Members Tracks */}
                    <div className="flex-1">
                        {members.map((member, idx) => (
                            <div key={idx} className="h-[33px] border-b border-[#3d1b5c]/50 flex items-center px-2 group hover:bg-black/20">
                                {/* Track Bar */}
                                <div className={`h-5 ${member.color} ${member.trackLength} rounded-sm relative shadow-md opacity-80 group-hover:opacity-100 transition-opacity flex items-center px-2 overflow-hidden`}>

                                    {/* Track Details Overlay */}
                                    <span className="text-[10px] font-mono text-white drop-shadow-md z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        [{member.role.toUpperCase()}] {member.name}
                                    </span>

                                    {/* Diagonal Striped pattern inside the track */}
                                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)' }}>
                                    </div>

                                    {/* Grab handles on edges */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/40 cursor-ew-resize"></div>
                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-black/40 cursor-ew-resize"></div>
                                </div>
                            </div>
                        ))}

                        {/* Grid Pattern Background for Timeline Space */}
                        <div className="absolute inset-0 pointer-events-none opacity-10"
                            style={{
                                backgroundImage: 'linear-gradient(to right, #3d1b5c 1px, transparent 1px), linear-gradient(to bottom, #3d1b5c 1px, transparent 1px)',
                                backgroundSize: '50px 33px',
                                marginTop: '31px'
                            }}>
                        </div>
                    </div>
                </div>

            </div>

            {/* Timeline Footer bar */}
            <div className="h-6 border-t border-[var(--color-editor-border)] bg-[#150026] flex items-center justify-between px-2">
                <div className="w-[300px] flex items-center justify-between pr-4">
                    <div className="w-16 h-2 bg-[#0d0010] rounded-full overflow-hidden border border-[#3d1b5c]">
                        <div className="w-1/2 h-full bg-[#8b75a3]"></div>
                    </div>
                    <span className="text-[10px] text-[#8b75a3] font-mono">Render: Complete</span>
                </div>
                {/* Zoom Slider */}
                <div className="flex items-center space-x-2 w-32">
                    <span className="text-[10px] text-[#8b75a3]">-</span>
                    <div className="flex-1 h-1.5 bg-[#0d0010] rounded-full border border-[#3d1b5c] relative">
                        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-3 bg-[#c084fc] rounded-sm shadow border border-white/20"></div>
                    </div>
                    <span className="text-[10px] text-[#8b75a3]">+</span>
                </div>
            </div>
        </div>
    );
}
