import React, { useState, useMemo } from 'react';
import { Search, Compass, SlidersHorizontal, ArrowUpDown, Sparkles, AlertTriangle, ShieldCheck, User, Star, ChevronRight, CheckCircle2, Bookmark, Flame } from 'lucide-react';
import ElectiveDetailModal from './ElectiveDetailModal';

export default function ElectiveExplorer({ electives, onAddTipForCourse }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('recommended'); // recommended, grading, workload, placement, newest
  const [activeTagFilter, setActiveTagFilter] = useState('All');
  const [selectedElective, setSelectedElective] = useState(null);

  const QUICK_FILTERS = [
    { label: 'All Electives', value: 'All' },
    { label: 'Chill Attendance', value: 'Chill Attendance' },
    { label: 'Easy A', value: 'Easy A' },
    { label: 'No Endsem / Project-Based', value: 'No Endsem / Project-Based' },
    { label: 'Core Heavy', value: 'Core Heavy' }
  ];

  // Filter & Sort Logic
  const filteredElectives = useMemo(() => {
    return electives
      .filter((course) => {
        // Search query
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          course.code.toLowerCase().includes(query) ||
          course.title.toLowerCase().includes(query) ||
          course.currentProfessor.toLowerCase().includes(query) ||
          course.department.toLowerCase().includes(query) ||
          course.tags.some(t => t.toLowerCase().includes(query));

        // Quick Tag Filter
        let matchesTag = true;
        if (activeTagFilter === 'Chill Attendance') {
          matchesTag = course.attendance === 'Chill' || course.tags.includes('Chill Attendance');
        } else if (activeTagFilter === 'Easy A') {
          matchesTag = course.gradingScore >= 4.2 || course.tags.includes('Easy A');
        } else if (activeTagFilter === 'No Endsem / Project-Based') {
          matchesTag = course.tags.includes('No Endsem / Project-Based') || course.tags.includes('Project-Based');
        } else if (activeTagFilter === 'Core Heavy') {
          matchesTag = course.tags.includes('Core Heavy');
        }

        return matchesQuery && matchesTag;
      })
      .sort((a, b) => {
        if (selectedSort === 'recommended') {
          return b.stats.recommendationPct - a.stats.recommendationPct;
        } else if (selectedSort === 'grading') {
          return b.gradingScore - a.gradingScore;
        } else if (selectedSort === 'workload') {
          const wMap = { 'Low': 1, 'Med': 2, 'High': 3 };
          return wMap[a.workload] - wMap[b.workload];
        } else if (selectedSort === 'placement') {
          return b.placementValue - a.placementValue;
        } else if (selectedSort === 'newest') {
          return b.stats.enrolled - a.stats.enrolled;
        }
        return 0;
      });
  }, [electives, searchQuery, selectedSort, activeTagFilter]);

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero Context */}
      <div className="bg-white border border-[#EAECF0] rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009E77] bg-[#E8FAF5] border border-[#A7F0DC] px-3 py-1 rounded-full mb-2.5">
              <Compass className="w-3.5 h-3.5 text-[#00D09C]" />
              Course Directory & Reviews
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1E222B] tracking-tight">
              Elective Explorer
            </h1>
            <p className="text-xs sm:text-sm text-[#5B6275] mt-1.5 max-w-2xl leading-relaxed">
              Honest ratings and tips from seniors who took the course. Reviews clearly state the professor and semester taken so you avoid outdated advice.
            </p>
          </div>
        </div>

        {/* Search and Sort Toolbar */}
        <div className="mt-6 pt-5 border-t border-[#EAECF0] flex flex-col md:flex-row gap-3.5">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#7C7E8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Course Code (e.g. ME3100), Title, or Professor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8F9FA] border border-[#EAECF0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00D09C]/25 focus:border-[#00D09C] transition-all placeholder:text-[#9EA2B0]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#7C7E8C] hover:text-[#1E222B] absolute right-3.5 top-1/2 -translate-y-1/2 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-60">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full appearance-none pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-bold bg-white border border-[#EAECF0] rounded-xl text-[#1E222B] focus:outline-none focus:ring-2 focus:ring-[#00D09C]/25 focus:border-[#00D09C] cursor-pointer shadow-xs"
              >
                <option value="recommended">Most Recommended</option>
                <option value="grading">Easiest Grading (Highest GPA)</option>
                <option value="workload">Lowest Workload (Chill)</option>
                <option value="placement">Highest Placement Value</option>
                <option value="newest">Most Enrolled</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7C7E8C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 mt-4 scrollbar-none">
          <span className="text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider mr-1">Filter:</span>
          {QUICK_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveTagFilter(f.value)}
              className={`text-xs font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 ${
                activeTagFilter === f.value
                  ? 'bg-[#00D09C] text-white shadow-xs'
                  : 'bg-[#F3F4F6] text-[#44475B] hover:bg-[#E5E7EB] border border-[#E5E7EB]'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="text-xs text-[#7C7E8C] font-medium ml-auto hidden sm:inline">
            Showing <strong className="text-[#1E222B] font-bold">{filteredElectives.length}</strong> of {electives.length} electives
          </span>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredElectives.map((course) => {
          const hasDriftWarning = course.reviews.some(r => r.professor !== course.currentProfessor);

          return (
            <div
              key={course.id}
              onClick={() => setSelectedElective(course)}
              className="bg-white rounded-2xl border border-[#EAECF0] hover:border-[#00D09C] hover:shadow-md transition-all duration-200 p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header: Code & Active Professor */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm px-2.5 py-1 rounded-lg bg-[#E8FAF5] text-[#009E77] border border-[#A7F0DC]">
                      {course.code}
                    </span>
                    <span className="text-[11px] font-semibold text-[#7C7E8C] truncate max-w-[130px]">
                      {course.department.split('&')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#009E77] bg-[#E8FAF5] px-2 py-0.5 rounded-full border border-[#A7F0DC]">
                    <Sparkles className="w-3 h-3 text-[#00D09C]" />
                    {course.stats.recommendationPct}%
                  </div>
                </div>

                {/* Course Title */}
                <h3 className="text-base font-extrabold text-[#1E222B] group-hover:text-[#00D09C] transition-colors mt-3 leading-snug">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-1.5 text-xs text-[#5B6275] mt-1.5">
                  <User className="w-3.5 h-3.5 text-[#7C7E8C]" />
                  <span>Prof: <strong className="text-[#1E222B] font-semibold">{course.currentProfessor}</strong></span>
                  <span className="text-[#7C7E8C] text-[10px]">({course.currentProfSince})</span>
                </div>

                {/* Metric Bars & Pill Scores */}
                <div className="mt-4 pt-3.5 border-t border-[#EAECF0] space-y-2.5">
                  {/* Grading Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#7C7E8C] font-semibold">Grading Leniency</span>
                      <span className="font-extrabold text-[#1E222B]">{course.gradingScore} / 5.0</span>
                    </div>
                    <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(course.gradingScore / 5) * 100}%`,
                          backgroundColor:
                            course.gradingScore >= 4.2 ? '#00D09C' : // Groww Teal
                            course.gradingScore >= 3.8 ? '#5367FF' : // Groww Blue
                            '#FFB800' // Amber
                        }}
                      />
                    </div>
                  </div>

                  {/* Workload & Attendance Badges */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                      course.workload === 'Low'
                        ? 'bg-[#E8FAF5] text-[#009E77] border-[#A7F0DC]'
                        : course.workload === 'Med'
                        ? 'bg-[#EEF1FF] text-[#5367FF] border-[#CCD4FF]'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}>
                      Workload: {course.workload}
                    </span>

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                      course.attendance === 'Chill'
                        ? 'bg-[#E8FAF5] text-[#009E77] border-[#A7F0DC]'
                        : 'bg-[#FFF8E7] text-[#B45309] border-[#FDE68A]'
                    }`}>
                      Attendance: {course.attendance}
                    </span>

                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#44475B] border border-[#EAECF0] ml-auto">
                      Placement: {course.placementValue} / 5
                    </span>
                  </div>
                </div>

                {/* What Seniors Say */}
                <div className="mt-3.5 bg-[#F8FAFB] rounded-xl p-3 border border-[#EAECF0]">
                  <div className="text-[10px] font-bold text-[#7C7E8C] uppercase tracking-wider mb-1 flex items-center gap-1">
                    <span>What Seniors Say</span>
                  </div>
                  <p className="text-xs text-[#44475B] italic line-clamp-2 leading-relaxed">
                    "{course.seniorConsensus}"
                  </p>
                </div>
              </div>

              {/* Card Footer: Warning badge & CTA */}
              <div className="mt-4 pt-3 border-t border-[#EAECF0] flex items-center justify-between text-xs">
                {hasDriftWarning ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] bg-[#FFF8E7] px-2 py-0.5 rounded-md border border-[#FDE68A]">
                    <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
                    Prof Changed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#009E77]">
                    <CheckCircle2 className="w-3 h-3 text-[#00D09C]" />
                    Same Instructor
                  </span>
                )}

                <span className="inline-flex items-center gap-1 font-bold text-[#00D09C] group-hover:text-[#00B386] group-hover:translate-x-0.5 transition-transform">
                  View {course.reviews.length} Reviews <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredElectives.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-12 text-center max-w-md mx-auto">
          <div className="w-12 h-12 bg-[#F8F9FA] text-[#7C7E8C] rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-[#1E222B] text-base">No electives matched your filter</h3>
          <p className="text-xs text-[#7C7E8C] mt-1">
            Try clearing the search query or selecting "All Electives".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTagFilter('All');
            }}
            className="mt-4 text-xs font-bold px-4 py-2 bg-[#E8FAF5] text-[#009E77] rounded-xl hover:bg-[#D4F5EC] border border-[#A7F0DC] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Elective Detail Modal */}
      <ElectiveDetailModal
        elective={selectedElective}
        isOpen={!!selectedElective}
        onClose={() => setSelectedElective(null)}
        onAddReviewTip={onAddTipForCourse}
      />
    </div>
  );
}
