"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Square, FastForward, Rewind, SkipBack, SkipForward, Volume2, VolumeX, Maximize } from "lucide-react";

export default function Gallery() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [timecode, setTimecode] = useState("00:00:00:00");
    const [isMuted, setIsMuted] = useState(true);

    // Format time to After Effects style Timecode HH:MM:SS:FF (assuming 30fps)
    const formatTimecode = (timeInSeconds: number) => {
        const min = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, '0');
        const sec = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
        const frames = Math.floor((timeInSeconds % 1) * 30).toString().padStart(2, '0');
        return `00:${min}:${sec}:${frames}`;
    };

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const total = videoRef.current.duration;
            setProgress((current / total) * 100);
            setTimecode(formatTimecode(current));
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            videoRef.current.currentTime = pos * videoRef.current.duration;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="flex-1 flex flex-col gap-2 w-full h-full pb-2 relative">

            {/* Target Composition Window */}
            <div className="flex-1 bg-[var(--color-editor-panel-bg)] rounded-md border border-[var(--color-editor-border)] flex flex-col shadow-lg relative max-h-[70vh]">
                <div className="px-3 py-1 border-b border-[var(--color-editor-border)] bg-[#150026] text-xs font-semibold text-[#c084fc] flex items-center justify-between rounded-t-md">
                    <div className="flex space-x-4">
                        <span className="bg-[#3d1b5c] px-3 py-0.5 rounded text-white">Composition 1</span>
                        <span className="text-white/30 hidden sm:inline-block">Kanami_Unit_MEP</span>
                    </div>
                    <div className="text-white/30 font-mono">1920x1080 (1.00)</div>
                </div>

                {/* Video Canvas Workspace */}
                <div className="flex-1 bg-black flex items-center justify-center relative overflow-hidden group p-4 sm:p-10">

                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(to right, #9b30ff 1px, transparent 1px), linear-gradient(to bottom, #9b30ff 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}>
                    </div>

                    <div className="relative border border-[#3d1b5c] shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video w-full max-w-5xl flex items-center justify-center group/canvas">

                        {/* Safe Zones */}
                        <div className="absolute inset-[5%] border border-[#ffffff]/10 border-dashed pointer-events-none z-10 hidden group-hover/canvas:block"></div>
                        <div className="absolute inset-[10%] border border-[#ffffff]/10 border-dashed pointer-events-none z-10 hidden group-hover/canvas:block"></div>

                        {/* Corner Anchors */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white outline outline-1 outline-black z-10 hidden group-hover/canvas:block"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white outline outline-1 outline-black z-10 hidden group-hover/canvas:block"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white outline outline-1 outline-black z-10 hidden group-hover/canvas:block"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white outline outline-1 outline-black z-10 hidden group-hover/canvas:block"></div>

                        <video
                            ref={videoRef}
                            src="https://xtiyacxhopmbsqsyawbz.supabase.co/storage/v1/object/public/kanami/SnapInsta.to_AQMZ3q3DLhw7OGywYv8j0LTajbstAFWlG_42Yj75TVNZBLUBuaiM_HV5KQEbFV4Buy5xxkJRWgeqzZIglGA9b_yNIZWsqNhXroV8Wso.mp4"
                            className="w-full h-full object-contain cursor-pointer"
                            controls={false}
                            autoPlay
                            muted={isMuted}
                            loop
                            onClick={handlePlayPause}
                            onTimeUpdate={handleTimeUpdate}
                        />

                        {/* Faux Playback Status Indicator */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40 z-20">
                                <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-pulse">
                                    <Play size={24} className="text-white ml-2" fill="currentColor" />
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* View Controls Toolbar */}
                <div className="p-2 border-t border-[var(--color-editor-border)] bg-[#150026] text-xs font-mono text-[#8b75a3] flex items-center justify-between">
                    <div className="flex space-x-4 items-center">
                        <span className="text-[#e0d4f5]">100%</span>
                        <span className="hidden sm:inline-block">Auto</span>
                        <span className="hidden sm:inline-block border-l border-[#3d1b5c] pl-4">Active Camera</span>
                    </div>

                    <button onClick={toggleMute} className="hover:text-white transition-colors">
                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                </div>
            </div>

            {/* Editor Timeline / Playback Controls Widget */}
            <div className="bg-[#1a0030] border border-[var(--color-editor-border)] rounded-md shadow-lg p-2 flex flex-col h-[150px]">

                {/* Top Info row */}
                <div className="flex items-end justify-between px-2 mb-2">
                    <div className="font-mono text-2xl text-[#ff3366] tabular-nums tracking-widest">{timecode}</div>
                    <div className="flex space-x-2">
                        {/* Fake playback tools */}
                        <button className="p-1.5 hover:bg-[#3d1b5c] rounded text-[#8b75a3]">
                            <SkipBack size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-[#3d1b5c] rounded text-[#8b75a3]">
                            <Rewind size={14} />
                        </button>
                        <button onClick={handlePlayPause} className="p-1.5 hover:bg-[#9b30ff] rounded text-[#e0d4f5] border border-[#3d1b5c] bg-[#3d1b5c]/50 drop-shadow-[0_0_5px_rgba(155,48,255,0.5)]">
                            {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                        </button>
                        <button className="p-1.5 hover:bg-[#3d1b5c] rounded text-[#8b75a3]">
                            <FastForward size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-[#3d1b5c] rounded text-[#8b75a3]">
                            <SkipForward size={14} />
                        </button>
                    </div>
                </div>

                {/* Faux Timeline Track */}
                <div className="flex-1 mt-2 border-t border-[#3d1b5c] relative flex">

                    {/* Layer Names (Left Menu) */}
                    <div className="w-[200px] border-r border-[#3d1b5c] flex flex-col text-[10px] text-[#8b75a3] font-mono py-1">
                        <div className="px-2 py-1 bg-[#150026] flex items-center justify-between border-b border-[#3d1b5c]/30">
                            <span>1. Kanami_MEP_Render.mp4</span>
                            <Square size={8} fill="currentColor" className="text-[#c084fc]" />
                        </div>
                        <div className="px-2 py-1 hover:bg-[#3d1b5c]/30 cursor-pointer">
                            Transforms
                        </div>
                        <div className="px-2 py-1 hover:bg-[#3d1b5c]/30 cursor-pointer">
                            Effects
                        </div>
                        <div className="px-2 py-1 hover:bg-[#3d1b5c]/30 cursor-pointer">
                            Audio
                        </div>
                    </div>

                    {/* Timeline Scrub Area */}
                    <div className="flex-1 relative cursor-pointer group/timeline" onClick={handleSeek}>

                        {/* Time Ticks */}
                        <div className="h-4 border-b border-[#3d1b5c] w-full flex text-[8px] text-[#8b75a3] opacity-50 px-1 overflow-hidden">
                            {[...Array(30)].map((_, i) => (
                                <span key={i} className="flex-1 text-center border-l border-[#3d1b5c]/30">0{i}</span>
                            ))}
                        </div>

                        {/* Video Clip Track Bar */}
                        <div className="absolute top-[20px] left-0 right-0 h-[24px] bg-[#9b30ff] mx-1 rounded-sm flex items-center px-2 opacity-80 border border-white/20 overflow-hidden shadow-inner">
                            <span className="text-[10px] text-white font-mono drop-shadow-md relative z-10 w-full truncate">[v] Kanami_MEP_Render.mp4</span>
                            <div className="absolute inset-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.5) 10px, rgba(0,0,0,0.5) 20px)' }}>
                            </div>
                        </div>

                        {/* Playhead and Scrubber Line */}
                        <div className="absolute top-0 bottom-0 w-[1px] bg-[#ff3366] pointer-events-none drop-shadow-[0_0_5px_rgba(255,51,102,1)] z-20 transition-all duration-100 ease-linear" style={{ left: `${progress}%` }}>
                            <div className="absolute top-0 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-[#ff3366]"></div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}
