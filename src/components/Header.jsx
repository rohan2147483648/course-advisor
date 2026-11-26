import React from 'react';
import { Compass, BookOpen, PlusCircle } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenSubmit
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAECF0] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 py-3">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00D09C] to-[#00B386] flex items-center justify-center text-white shadow-sm shadow-[#00D09C]/25">
              <BookOpen className="w-5 h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-[#1E222B]">
                Course<span className="text-[#00D09C]">Advisor</span>
              </span>
              <p className="text-[12px] text-[#7C7E8C] font-medium hidden sm:block">
                Elective Reviews & Exam Study Resources
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs - Beautifully Centered & Equally Spaced */}
          <nav className="flex items-center bg-[#F3F4F6] p-1.5 rounded-2xl border border-[#E5E7EB] shadow-inner">
            <button
              onClick={() => setActiveTab('electives')}
              className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                activeTab === 'electives'
                  ? 'bg-white text-[#1E222B] shadow-sm border border-[#E5E7EB]'
                  : 'text-[#5B6275] hover:text-[#1E222B] hover:bg-white/60'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'electives' ? 'text-[#00D09C]' : 'text-[#7C7E8C]'}`} />
              <span>Elective Explorer</span>
            </button>

            <button
              onClick={() => setActiveTab('triage')}
              className={`flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 ${
                activeTab === 'triage'
                  ? 'bg-white text-[#1E222B] shadow-sm border border-[#E5E7EB]'
                  : 'text-[#5B6275] hover:text-[#1E222B] hover:bg-white/60'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'triage' ? 'text-[#00D09C]' : 'text-[#7C7E8C]'}`} />
              <span>Exam Resources</span>
            </button>
          </nav>

          {/* Right Action Button (Clean, Single Primary CTA) */}
          <div className="flex items-center shrink-0">
            <button
              onClick={onOpenSubmit}
              className="flex items-center justify-center gap-2 bg-[#00D09C] hover:bg-[#00B386] active:bg-[#009E77] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl transition-all shadow-sm shadow-[#00D09C]/30 hover:shadow-md hover:shadow-[#00D09C]/40 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.4]" />
              <span>Share a Tip</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
