import Image from "next/image";
import Link from "next/link";
import { FolderOpen, Users, ExternalLink, Settings, Film, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex gap-2 w-full h-full pb-2">
      {/* Left Panel: Project Bin */}
      <div className="w-1/4 min-w-[250px] bg-[var(--color-editor-panel-bg)] rounded-md border border-[var(--color-editor-border)] flex flex-col shadow-lg">
        <div className="px-3 py-1 border-b border-[var(--color-editor-border)] bg-[#150026] text-xs font-semibold text-[#c084fc] flex items-center justify-between rounded-t-md">
          <span>Project</span>
          <Settings size={12} className="text-[#8b75a3]" />
        </div>
        <div className="flex-1 p-2 overflow-y-auto space-y-1">
          {/* Fake Folder Structure */}
          <div className="flex items-center space-x-2 text-sm text-[var(--color-editor-text)] p-1 hover:bg-[#3d1b5c]/50 rounded cursor-pointer transition-colors">
            <ChevronRight size={14} className="text-[#8b75a3]" />
            <FolderOpen size={16} className="text-[#c084fc]" />
            <span>01_Compositions</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-[var(--color-editor-text)] p-1 hover:bg-[#3d1b5c]/50 rounded cursor-pointer transition-colors">
            <ChevronRight size={14} className="text-[#8b75a3]" />
            <FolderOpen size={16} className="text-[#c084fc]" />
            <span>02_Assets</span>
          </div>

          <div className="my-2 border-t border-[#3d1b5c]/50"></div>

          <div className="text-xs uppercase text-[#8b75a3] font-bold px-2 py-1 tracking-wider">Important Links</div>

          <Link href="https://discord.gg/2trhwjkqen" target="_blank" className="flex items-center justify-between space-x-2 text-sm text-[var(--color-editor-text)] p-2 hover:bg-[#3d1b5c] rounded cursor-pointer group transition-colors border border-transparent hover:border-[#9b30ff]/30">
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-[#9b30ff]" />
              <span className="group-hover:text-white transition-colors">Join Discord</span>
            </div>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c084fc]" />
          </Link>

          <Link href="https://drive.google.com/drive/folders/1oF6QYlm8FJeaGOvsfVgaroz0N3PO4zdB" target="_blank" className="flex items-center justify-between space-x-2 text-sm text-[var(--color-editor-text)] p-2 hover:bg-[#3d1b5c] rounded cursor-pointer group transition-colors border border-transparent hover:border-[#9b30ff]/30">
            <div className="flex items-center space-x-2">
              <FolderOpen size={16} className="text-[#9b30ff]" />
              <span className="group-hover:text-white transition-colors">GDrive Assets</span>
            </div>
            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c084fc]" />
          </Link>

        </div>
        <div className="p-2 border-t border-[var(--color-editor-border)] bg-[#0d0010] rounded-b-md text-xs text-[#8b75a3] font-mono flex items-center space-x-2">
          <Film size={14} className="text-[#ff3366]" />
          <span>Composition: 1920x1080, 60fps</span>
        </div>
      </div>

      {/* Center Panel: Composition Viewer */}
      <div className="flex-1 bg-[var(--color-editor-panel-bg)] rounded-md border border-[var(--color-editor-border)] flex flex-col shadow-lg relative overflow-hidden group">
        {/* CRT Overlay on Viewer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10 opacity-30"></div>

        <div className="px-3 py-1 border-b border-[var(--color-editor-border)] bg-[#150026] text-xs font-semibold text-[#c084fc] flex flex-wrap items-center gap-4 rounded-t-md">
          <span>Composition 1</span>
          <span className="text-white/30 font-mono hidden sm:inline-block">100%</span>
          <span className="text-white/30 font-mono hidden sm:inline-block">Full</span>
          <span className="text-white/30 font-mono hidden sm:inline-block">Active Camera</span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8 relative bg-black">
          {/* Main Workspace Frame */}
          <div className="w-full max-w-2xl aspect-video bg-[#0d0010] relative border border-[#3d1b5c] shadow-[0_0_30px_rgba(155,48,255,0.1)] flex items-center justify-center overflow-hidden">

            {/* Center Guidelines */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#9b30ff]/20 z-0 border-dashed border-l border-[#9b30ff]/20"></div>
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#9b30ff]/20 z-0 border-dashed border-t border-[#9b30ff]/20"></div>

            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#c084fc]/50"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#c084fc]/50"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#c084fc]/50"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#c084fc]/50"></div>

            <div className="z-10 flex flex-col items-center animate-glitch relative">
              <Image
                src="/asset/logo-kanami.png"
                alt="Kanami Logo"
                width={250}
                height={250}
                className="drop-shadow-[0_0_15px_rgba(155,48,255,0.6)] object-contain z-10"
                priority
              />
              <h1 className="mt-6 text-4xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#e0d4f5] to-[#c084fc] drop-shadow-[0_0_10px_rgba(192,132,252,0.8)] uppercase">
                Kanami Unit
              </h1>
              <p className="mt-2 text-[#8b75a3] font-mono tracking-widest text-sm bg-[#1a0030]/80 px-4 py-1 rounded border border-[#3d1b5c]">
                [CREATIVE EDITING COMMUNITY (mybe creative)]
              </p>
            </div>
          </div>
        </div>

        {/* Viewer Tools Bottom Bar */}
        <div className="p-2 border-t border-[var(--color-editor-border)] bg-[#150026] text-xs font-mono text-[#8b75a3] flex items-center justify-between rounded-b-md">
          <div className="flex items-center space-x-4">
            <span className="bg-black px-2 py-0.5 rounded text-[#e0d4f5] border border-[#3d1b5c]">V 1.0</span>
            <span>1 BPC</span>
          </div>
          <div className="flex space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-blink"></span>
            <span>0 Render Errors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
