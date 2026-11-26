import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, CheckCircle2, User, Calendar, BookOpen, Star, Award, Sparkles, MessageSquare, Plus } from 'lucide-react';

export default function ElectiveDetailModal({ elective, isOpen, onClose, onAddReviewTip }) {
  if (!isOpen || !elective) return null;

  const currentProf = elective.currentProfessor;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full border border-[#EAECF0] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Drawer */}
        <div className="p-6 sm:p-7 border-b border-[#EAECF0] bg-[#F8FAFB]">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-bold text-base px-3 py-1 rounded-lg bg-[#E8FAF5] text-[#009E77] border border-[#A7F0DC]">
                  {elective.code}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F3F4F6] text-[#44475B] border border-[#EAECF0]">
                  {elective.department}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white text-[#7C7E8C] border border-[#EAECF0]">
                  {elective.credits} Credits
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1E222B] tracking-tight pt-1">
                {elective.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5B6275] pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-[#00D09C]" />
                  Current Active Instructor: <strong className="text-[#1E222B]">{elective.currentProfessor}</strong>
                  <span className="text-[#7C7E8C] font-normal">({elective.currentProfSince} — Present)</span>
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#7C7E8C] hover:text-[#1E222B] p-1.5 rounded-xl hover:bg-[#F3F4F6] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Key Factor Metric Pills Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#EAECF0]">
            <div className="bg-white p-3 rounded-2xl border border-[#EAECF0] shadow-xs">
              <div className="text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider">Grading Score</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-lg font-black text-[#00D09C]">{elective.gradingScore}</span>
                <span className="text-xs text-[#7C7E8C]">/ 5.0</span>
              </div>
              <div className="text-[10px] text-[#44475B] truncate font-semibold">{elective.gradingLabel}</div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#EAECF0] shadow-xs">
              <div className="text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider">Workload</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-base font-extrabold ${
                  elective.workload === 'Low' ? 'text-[#00D09C]' :
                  elective.workload === 'Med' ? 'text-[#5367FF]' : 'text-rose-600'
                }`}>
                  {elective.workload} Workload
                </span>
              </div>
              <div className="text-[10px] text-[#7C7E8C]">Project / Lab balance</div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#EAECF0] shadow-xs">
              <div className="text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider">Attendance</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-base font-extrabold ${
                  elective.attendance === 'Chill' ? 'text-[#00D09C]' : 'text-[#B45309]'
                }`}>
                  {elective.attendance}
                </span>
              </div>
              <div className="text-[10px] text-[#7C7E8C] truncate" title={elective.attendanceDetails}>
                {elective.attendanceDetails}
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-[#EAECF0] shadow-xs">
              <div className="text-[11px] font-bold text-[#7C7E8C] uppercase tracking-wider">Placement Value</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-lg font-black text-[#5367FF]">{elective.placementValue}</span>
                <span className="text-xs text-[#7C7E8C]">/ 5.0</span>
              </div>
              <div className="text-[10px] text-[#5367FF] font-bold">Industry alignment</div>
            </div>
          </div>
        </div>

        {/* Modal Body: Consensus & Reviews */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Top Senior Consensus Box */}
          <div className="bg-[#E8FAF5] border border-[#A7F0DC] rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#007054] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4 text-[#00D09C]" />
              Overall Senior Verdict ({elective.stats.recommendationPct}% Recommend)
            </div>
            <p className="text-sm text-[#1E222B] leading-relaxed font-semibold">
              "{elective.seniorConsensus}"
            </p>
          </div>

          {/* Professor Drift Callout Alert */}
          {elective.syllabusSnafuAlert && (
            <div className="bg-[#FFF8E7] border border-[#FDE68A] rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <div className="text-xs text-[#92400E] leading-relaxed">
                <span className="font-extrabold">Professor Change Note: </span>
                {elective.syllabusSnafuAlert}
              </div>
            </div>
          )}

          {/* Reviews List */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-extrabold text-[#1E222B] text-sm flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#7C7E8C]" />
                Senior Experiences ({elective.reviews.length} reviews)
              </h3>
              <span className="text-[11px] font-medium text-[#7C7E8C]">
                Anchored to Professor + Semester Taken
              </span>
            </div>

            <div className="space-y-4">
              {elective.reviews.map((rev) => {
                const isOutdatedProf = rev.professor !== currentProf;

                return (
                  <div
                    key={rev.id}
                    className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                      isOutdatedProf 
                        ? 'bg-[#FFFDF7] border-[#FDE68A]' 
                        : 'bg-white border-[#EAECF0]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAECF0] pb-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="font-extrabold text-xs text-[#1E222B]">
                          {rev.author}
                        </span>
                        <span className="text-[11px] text-[#7C7E8C]">
                          under <strong className="text-[#1E222B] font-semibold">{rev.professor}</strong>
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F3F4F6] text-[#44475B] rounded-md border border-[#EAECF0]">
                          {rev.semester}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isOutdatedProf ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B45309] bg-[#FFF8E7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                            <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
                            Previous Prof — Verify Syllabus
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#009E77] bg-[#E8FAF5] px-2.5 py-0.5 rounded-full border border-[#A7F0DC]">
                            <CheckCircle2 className="w-3 h-3 text-[#00D09C]" />
                            Current Instructor
                          </span>
                        )}
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#1E222B]">
                          Grade: {rev.grade}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#44475B] leading-relaxed">
                      "{rev.text}"
                    </p>

                    {rev.tips && (
                      <div className="mt-3 text-xs bg-[#F8FAFB] text-[#1E222B] p-3 rounded-xl border border-[#EAECF0]">
                        <span className="font-bold text-[#009E77]">💡 Senior Advice: </span>
                        {rev.tips}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#EAECF0] bg-[#F8FAFB] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onAddReviewTip(elective);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#009E77] hover:text-[#007054] px-3 py-2 rounded-xl hover:bg-[#E8FAF5] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Your Experience for {elective.code}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#00D09C] hover:bg-[#00B386] rounded-xl transition-colors shadow-xs shadow-[#00D09C]/25"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
