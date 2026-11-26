import React, { useState, useMemo } from 'react';
import { Clock, Filter, AlertTriangle, ExternalLink, Flag, CheckCircle2, Flame, ShieldAlert, Sparkles, BookOpen, Youtube, FileText, Bookmark, Share2 } from 'lucide-react';

export default function ExamTriage({ resources, onOpenResource, onFlagBroken, onVerifyResource, onOpenSubmit, userVerifiedIds = [] }) {
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [selectedExamType, setSelectedExamType] = useState('ALL');
  const [selectedTimeBudget, setSelectedTimeBudget] = useState('ALL'); // "ALL", "< 1 hr", "2–4 hrs", "Full Weekend"
  const [showFlagged, setShowFlagged] = useState(false);

  // Available courses
  const courses = [
    { code: 'ALL', name: 'All Enrolled Courses' },
    { code: 'ME3100', name: 'ME3100: Design for Manufacturing & Assembly' },
    { code: 'CS4061', name: 'CS4061: Deep Learning & Visual Perception' },
    { code: 'EC3201', name: 'EC3201: Digital Signal Processing' },
    { code: 'HS3002', name: 'HS3002: Science, Tech & Society' },
    { code: 'MG4010', name: 'MG4010: Financial Engineering & Algorithmic Trading' },
    { code: 'CS3040', name: 'CS3040: Cloud Computing & Distributed Systems' },
  ];

  // Filtering Logic
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // Broken filter
      if (!showFlagged && item.flaggedBroken) return false;

      // Course filter
      if (selectedCourse !== 'ALL' && item.courseCode !== selectedCourse) return false;

      // Exam Type filter
      if (selectedExamType !== 'ALL' && item.examType !== selectedExamType && item.examType !== 'All') {
        return false;
      }

      // STRICT Time Budget Filter
      if (selectedTimeBudget !== 'ALL') {
        if (selectedTimeBudget === '< 1 hr') {
          // Strictly <= 60 mins AND matches budget
          if (item.timeBudget !== '< 1 hr' || item.timeEstimateMinutes > 60) return false;
        } else if (selectedTimeBudget === '2–4 hrs') {
          if (item.timeBudget !== '2–4 hrs') return false;
        } else if (selectedTimeBudget === 'Full Weekend') {
          if (item.timeBudget !== 'Full Weekend') return false;
        }
      }

      return true;
    });
  }, [resources, selectedCourse, selectedExamType, selectedTimeBudget, showFlagged]);

  const flaggedCount = resources.filter(r => r.flaggedBroken).length;

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="bg-white border border-[#EAECF0] rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009E77] bg-[#E8FAF5] border border-[#A7F0DC] px-3 py-1 rounded-full mb-2.5">
              <Clock className="w-3.5 h-3.5 text-[#00D09C]" />
              Exam Prep Assistant
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1E222B] tracking-tight">
              Exam Resources
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6275] mt-1.5 max-w-2xl leading-relaxed">
              Find quick notes, formula sheets, and solved papers sorted by your exam and how much time you have. Long video series are filtered out for short study windows.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider">Matching</div>
              <div className="text-xs font-extrabold text-[#1E222B]">
                {filteredResources.length} Resources Found
              </div>
            </div>
            {flaggedCount > 0 && (
              <button
                onClick={() => setShowFlagged(!showFlagged)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-colors ${
                  showFlagged 
                    ? 'bg-rose-50 text-rose-700 border-rose-300' 
                    : 'bg-[#F3F4F6] text-[#44475B] border-[#EAECF0] hover:bg-[#E5E7EB]'
                }`}
              >
                {showFlagged ? 'Hide Dead Links' : `${flaggedCount} Dead Links`}
              </button>
            )}
          </div>
        </div>

        {/* 3-Part Selector Bar */}
        <div className="mt-6 pt-5 border-t border-[#EAECF0] grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 1. Course Selector */}
          <div>
            <label className="block text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider mb-2">
              1. Choose Course
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full text-xs sm:text-sm font-bold bg-[#F8F9FA] border border-[#EAECF0] rounded-xl px-3.5 py-2.5 text-[#1E222B] focus:outline-none focus:ring-2 focus:ring-[#00D09C]/25 focus:border-[#00D09C] cursor-pointer shadow-xs"
            >
              {courses.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Exam Type Selector */}
          <div>
            <label className="block text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider mb-2">
              2. Exam Type
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#F3F4F6] p-1.5 rounded-xl border border-[#EAECF0]">
              {['ALL', 'Quiz 1', 'Midsem', 'Endsem'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedExamType(type)}
                  className={`text-xs font-bold py-2 rounded-lg transition-all ${
                    selectedExamType === type
                      ? 'bg-white text-[#1E222B] shadow-xs border border-[#EAECF0]'
                      : 'text-[#5B6275] hover:text-[#1E222B]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Strict Time Window Selector */}
          <div>
            <label className="block text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider mb-2">
              3. Study Time Available
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#F3F4F6] p-1.5 rounded-xl border border-[#EAECF0]">
              {[
                { label: 'Any', value: 'ALL' },
                { label: '< 1 hr', value: '< 1 hr' },
                { label: '2–4 hrs', value: '2–4 hrs' },
                { label: 'Weekend', value: 'Full Weekend' }
              ].map((tb) => (
                <button
                  key={tb.value}
                  onClick={() => setSelectedTimeBudget(tb.value)}
                  className={`text-xs font-bold py-2 rounded-lg transition-all ${
                    selectedTimeBudget === tb.value
                      ? tb.value === '< 1 hr'
                        ? 'bg-[#00D09C] text-white shadow-xs font-extrabold'
                        : 'bg-white text-[#1E222B] shadow-xs border border-[#EAECF0]'
                      : 'text-[#5B6275] hover:text-[#1E222B]'
                  }`}
                >
                  {tb.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notice when < 1 hr is chosen */}
        {selectedTimeBudget === '< 1 hr' && (
          <div className="mt-4 p-3.5 bg-[#E8FAF5] border border-[#A7F0DC] rounded-xl flex items-center justify-between text-xs text-[#007054]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00D09C] animate-pulse"></span>
              <span className="font-extrabold">Under 1 Hour Filter Active:</span>
              <span>Showing formula sheets, 1-page summaries, and high-yield questions only. Long video playlists are hidden.</span>
            </div>
            <button
              onClick={() => setSelectedTimeBudget('ALL')}
              className="text-[11px] font-extrabold text-[#009E77] underline hover:text-[#007054] ml-2 whitespace-nowrap cursor-pointer"
            >
              Show All
            </button>
          </div>
        )}
      </div>

      {/* Resource Cards Grid */}
      <div className="space-y-4">
        {filteredResources.map((res) => {
          return (
            <div
              key={res.id}
              className={`bg-white rounded-2xl border transition-all duration-200 p-5 sm:p-6 shadow-xs ${
                res.flaggedBroken
                  ? 'border-rose-200 bg-rose-50/20 opacity-60'
                  : 'border-[#EAECF0] hover:border-[#00D09C] hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                {/* Left content block */}
                <div className="space-y-2.5 flex-1">
                  {/* Top Badges: Course, Exam, Type, Time Estimate */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#E8FAF5] text-[#009E77] border border-[#A7F0DC]">
                      {res.courseCode}
                    </span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#44475B] border border-[#EAECF0]">
                      {res.examType}
                    </span>
                    
                    {/* Resource Type */}
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 bg-[#F3F4F6] text-[#44475B] border border-[#EAECF0]">
                      {res.type === 'YouTube' ? <Youtube className="w-3.5 h-3.5 text-rose-500" /> : <FileText className="w-3.5 h-3.5 text-[#5367FF]" />}
                      {res.type}
                    </span>

                    {/* Time Required Badge (Clean, No Emojis) */}
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border ${
                      res.timeBudget === '< 1 hr'
                        ? 'bg-[#E8FAF5] text-[#009E77] border-[#A7F0DC]'
                        : res.timeBudget === '2–4 hrs'
                        ? 'bg-[#EEF1FF] text-[#5367FF] border-[#CCD4FF]'
                        : 'bg-purple-50 text-purple-800 border-purple-200'
                    }`}>
                      <Clock className="w-3.5 h-3.5 text-[#00D09C]" />
                      <span>
                        {res.timeEstimateMinutes <= 60 
                          ? `${res.timeEstimateMinutes} mins`
                          : res.timeEstimateMinutes <= 300 
                          ? `${Math.round(res.timeEstimateMinutes / 60)} hrs`
                          : `Weekend (~${Math.round(res.timeEstimateMinutes / 60)} hrs)`
                        }
                      </span>
                    </span>

                    {/* Broken Link Indicator */}
                    {res.flaggedBroken && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                        Flagged Dead Link
                      </span>
                    )}
                  </div>

                  {/* Resource Title */}
                  <h3 className="text-base font-extrabold text-[#1E222B] hover:text-[#00D09C] transition-colors leading-snug">
                    {res.title}
                  </h3>

                  {/* Senior Note Quote */}
                  <p className="text-xs sm:text-sm text-[#44475B] bg-[#F8FAFB] rounded-xl p-3.5 border border-[#EAECF0] leading-relaxed">
                    <span className="font-bold text-[#1E222B]">Senior Tip: </span>
                    "{res.seniorNote}"
                  </p>

                  {/* Context Tags & Outcome Verification Signal */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {res.contextTags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                          tag === 'Direct Exam Match'
                            ? 'bg-[#EEF1FF] text-[#5367FF] border-[#CCD4FF]'
                            : tag === 'Night-Before Cram'
                            ? 'bg-[#FFF8E7] text-[#B45309] border-[#FDE68A]'
                            : tag === 'High Yield'
                            ? 'bg-[#E8FAF5] text-[#009E77] border-[#A7F0DC]'
                            : 'bg-[#F3F4F6] text-[#44475B] border-[#EAECF0]'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}

                    {/* Outcome Verification Button (1 vote per person) */}
                    {(() => {
                      const isVerified = userVerifiedIds.includes(res.id);
                      return (
                        <button
                          onClick={() => onVerifyResource(res.id)}
                          className={`ml-auto inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-xl transition-all cursor-pointer border ${
                            isVerified
                              ? 'bg-[#00D09C] text-white border-[#00B386] shadow-xs'
                              : 'bg-[#E8FAF5] text-[#009E77] hover:bg-[#D4F5EC] border-[#A7F0DC]'
                          }`}
                          title={isVerified ? "You verified this resource. Click to remove verification." : "Click to verify this resource helped you (1 vote per student)"}
                        >
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isVerified ? 'text-white' : 'text-[#00D09C]'}`} />
                          <span>
                            {isVerified 
                              ? `Verified by you (+${Math.max(0, res.verifiedCount - 1)})` 
                              : `Verified by ${res.verifiedCount} students`
                            }
                          </span>
                        </button>
                      );
                    })()}
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-start gap-2 pt-2 sm:pt-0 sm:border-l sm:border-[#EAECF0] sm:pl-5 min-w-[140px]">
                  <button
                    onClick={() => onOpenResource(res)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-extrabold text-white bg-[#00D09C] hover:bg-[#00B386] active:bg-[#009E77] px-4 py-2.5 rounded-xl transition-all shadow-xs shadow-[#00D09C]/25"
                  >
                    <span>Open Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onFlagBroken(res.id)}
                    className={`w-full flex items-center justify-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-colors ${
                      res.flaggedBroken
                        ? 'text-[#009E77] border-[#A7F0DC] hover:bg-[#E8FAF5]'
                        : 'text-[#7C7E8C] hover:text-rose-600 border-[#EAECF0] hover:border-rose-200 hover:bg-rose-50'
                    }`}
                    title={res.flaggedBroken ? "Unmark dead link" : "Report broken or inaccessible link"}
                  >
                    <Flag className="w-3 h-3" />
                    <span>{res.flaggedBroken ? "Undo Flag" : "Flag Dead Link"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredResources.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#EAECF0] p-12 text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-[#F8FAFB] text-[#7C7E8C] rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-[#1E222B] text-base">No resources fit this exact window</h3>
            <p className="text-xs text-[#7C7E8C] mt-1 leading-relaxed">
              We couldn't find any resources for {selectedCourse} matching "{selectedTimeBudget}". Have one? Share it with your juniors in seconds!
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setSelectedTimeBudget('ALL')}
                className="text-xs font-bold px-3.5 py-2 bg-[#F3F4F6] text-[#44475B] rounded-xl hover:bg-[#E5E7EB] border border-[#EAECF0]"
              >
                Expand Time Window
              </button>
              <button
                onClick={onOpenSubmit}
                className="text-xs font-bold px-3.5 py-2 bg-[#00D09C] text-white rounded-xl hover:bg-[#00B386] shadow-xs"
              >
                + Submit Resource
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
