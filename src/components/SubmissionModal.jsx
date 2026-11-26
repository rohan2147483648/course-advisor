import React, { useState, useEffect, useMemo } from 'react';
import { X, PlusCircle, AlertTriangle, CheckCircle2, ArrowRight, Link as LinkIcon, Clock, User, BookOpen, Tag, Copy, RefreshCw, Sparkles, ExternalLink } from 'lucide-react';
import { parseSubmissionNote, checkDuplicateResource } from '../utils/smartParser';

export default function SubmissionModal({ isOpen, onClose, onAddResource, existingResources, initialCourseCode = '', onViewInCatalog }) {
  if (!isOpen) return null;

  const [rawText, setRawText] = useState(
    initialCourseCode ? `For ${initialCourseCode} ` : ''
  );
  const [optionalUrl, setOptionalUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedResource, setSubmittedResource] = useState(null);
  const [step, setStep] = useState('form'); // 'form' | 'success'

  // Reset when opened
  useEffect(() => {
    if (isOpen) {
      setStep('form');
      setSubmittedResource(null);
      if (initialCourseCode && !rawText.trim()) {
        setRawText(`For ${initialCourseCode} `);
      }
    }
  }, [isOpen, initialCourseCode]);

  // Live NLP parsed output
  const parsedData = useMemo(() => {
    return parseSubmissionNote(rawText, optionalUrl);
  }, [rawText, optionalUrl]);

  // Live Duplicate Detection check
  const duplicateCheck = useMemo(() => {
    if (!rawText.trim() && !optionalUrl.trim()) return { isDuplicate: false };
    return checkDuplicateResource(parsedData, existingResources);
  }, [parsedData, existingResources, rawText, optionalUrl]);

  // Quick sample notes for quick demonstration
  const SAMPLES = [
    {
      title: "ME3100 Midsem Notes",
      text: "For ME3100 Midsem under Prof Rao, skip the textbook—just solve Tut Sheets 2-4, takes 2 hours max and 3 questions came directly from it.",
      url: "https://drive.google.com/file/d/me3100-tut-quick-drill/view"
    },
    {
      title: "CS4061 Quiz 1 Sheet",
      text: "CS4061 Quiz 1 with Prof Sen: memorize the CNN dimension formula sheet, takes 35 mins and saves 15 marks.",
      url: "https://drive.google.com/file/d/cs4061-cnn-dimensions/view"
    },
    {
      title: "ME3100 Solved Guide",
      text: "Here is the exact ME3100 solution guide for Rao's tutorial sheets.",
      url: "https://drive.google.com/file/d/1me3100-tut2-4-solutions-rao/view" // existing url to showcase duplicate warning
    }
  ];

  const handleApplySample = (sample) => {
    setRawText(sample.text);
    setOptionalUrl(sample.url);
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newResource = {
        id: `res-user-${Date.now()}`,
        courseCode: parsedData.courseCode,
        courseTitle: parsedData.courseTitle,
        examType: parsedData.examType,
        timeBudget: parsedData.timeBudget,
        timeEstimateMinutes: parsedData.timeEstimateMinutes,
        title: parsedData.title,
        type: parsedData.type,
        url: optionalUrl.trim() || 'https://drive.google.com/file/d/campus-resource/view',
        contextTags: parsedData.contextTags,
        verifiedCount: 1,
        flaggedBroken: false,
        seniorNote: rawText.trim(),
        author: "Verified Student (You)",
        createdAt: new Date().toISOString().split('T')[0]
      };

      onAddResource(newResource);
      setIsSubmitting(false);
      setSubmittedResource(newResource);
      setStep('success');
    }, 350);
  };

  const handleResetForAnother = () => {
    setRawText('');
    setOptionalUrl('');
    setSubmittedResource(null);
    setStep('form');
  };

  const handleGoToCatalog = () => {
    if (onViewInCatalog && submittedResource) {
      onViewInCatalog(submittedResource);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#12141A]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full border border-[#EAECF0] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SUCCESS CONFIRMATION SCREEN */}
        {step === 'success' && submittedResource ? (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E8FAF5] border border-[#A7F0DC] flex items-center justify-center mx-auto text-[#00D09C] shadow-sm animate-bounce duration-700">
              <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009E77] bg-[#E8FAF5] px-3 py-1 rounded-full border border-[#A7F0DC]">
                Published to CourseAdvisor Catalog
              </div>
              <h2 className="text-2xl font-black text-[#1E222B] tracking-tight">
                Tip Successfully Shared!
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6275] max-w-md mx-auto leading-relaxed">
                Thank you for helping out your juniors! Your note has been categorized and is now live in the Exam Resources directory.
              </p>
            </div>

            {/* Live Card Preview */}
            <div className="bg-[#F8FAFB] rounded-2xl border border-[#EAECF0] p-4 text-left space-y-2 max-w-lg mx-auto">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#E8FAF5] text-[#009E77] border border-[#A7F0DC]">
                  {submittedResource.courseCode}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#F3F4F6] text-[#44475B]">
                  {submittedResource.examType}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E8FAF5] text-[#009E77] border border-[#A7F0DC]">
                  {submittedResource.timeBudget}
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-[#1E222B]">
                {submittedResource.title}
              </h4>

              <p className="text-xs text-[#5B6275] italic line-clamp-2">
                "{submittedResource.seniorNote}"
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleGoToCatalog}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-[#00D09C] hover:bg-[#00B386] active:bg-[#009E77] shadow-sm shadow-[#00D09C]/30 transition-all cursor-pointer"
              >
                <span>View in Exam Resources</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetForAnother}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-[#44475B] bg-[#F8F9FA] hover:bg-[#EAECF0] border border-[#EAECF0] transition-colors cursor-pointer"
              >
                Share Another Tip
              </button>
            </div>
          </div>
        ) : (
          /* FORM SUBMISSION SCREEN */
          <div>
            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-[#EAECF0] bg-[#F8FAFB] flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#009E77] bg-[#E8FAF5] border border-[#A7F0DC] px-3 py-1 rounded-full mb-1.5">
                  <PlusCircle className="w-3.5 h-3.5 text-[#00D09C]" />
                  Add Study Tip or Resource
                </div>
                <h2 className="text-lg sm:text-xl font-black text-[#1E222B] tracking-tight">
                  Share a Helpful Tip or Study Link
                </h2>
                <p className="text-xs text-[#7C7E8C] mt-0.5">
                  Write normally. CourseAdvisor automatically identifies the course, exam, and time required.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#7C7E8C] hover:text-[#1E222B] p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Demonstration Examples */}
            <div className="bg-[#E8FAF5] px-6 py-3 border-b border-[#A7F0DC] flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#007054] uppercase tracking-wider">
                Quick Examples:
              </span>
              {SAMPLES.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySample(s)}
                  className="text-[11px] font-bold px-2.5 py-1 bg-white hover:bg-[#D4F5EC] text-[#009E77] border border-[#A7F0DC] rounded-lg transition-colors cursor-pointer"
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Modal Body / Input Form */}
            <form onSubmit={handlePublish} className="p-6 space-y-4">
              {/* Main Natural Language Input Box */}
              <div>
                <label className="block text-xs font-bold text-[#1E222B] uppercase tracking-wider mb-2">
                  Write your tip or note <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="e.g. For ME3100 Midsem under Prof Rao, skip the textbook—just solve Tut Sheets 2-4, takes 2 hours max and 3 questions came directly from it."
                  className="w-full text-sm p-4 bg-[#F8F9FA] border border-[#EAECF0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00D09C]/25 focus:border-[#00D09C] transition-all placeholder:text-[#9EA2B0]"
                  required
                />
              </div>

              {/* Optional URL Input */}
              <div>
                <label className="block text-xs font-bold text-[#1E222B] uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Google Drive / YouTube Link (Optional)</span>
                  <span className="text-[11px] text-[#7C7E8C] font-normal">Auto-detects Drive, PYQ or YouTube</span>
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-[#7C7E8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={optionalUrl}
                    onChange={(e) => setOptionalUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or https://youtube.com/..."
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F8F9FA] border border-[#EAECF0] rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00D09C]/25 focus:border-[#00D09C] transition-all placeholder:text-[#9EA2B0]"
                  />
                </div>
              </div>

              {/* DUPLICATE DETECTION ALERT */}
              {duplicateCheck.isDuplicate && (
                <div className="p-4 rounded-xl bg-[#FFF8E7] border border-[#FDE68A] text-[#92400E] space-y-1 animate-in fade-in">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#B45309]">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                    Possible Duplicate Detected ({duplicateCheck.type === 'EXACT_URL' ? 'Exact URL Match' : 'High Overlap'})
                  </div>
                  <p className="text-xs text-[#92400E] leading-relaxed">
                    {duplicateCheck.warningMessage}
                  </p>
                  <div className="text-[11px] text-[#B45309] italic">
                    You can still publish if this note provides a different perspective, or verify the existing entry instead.
                  </div>
                </div>
              )}

              {/* LIVE STRUCTURED CHIPS PREVIEW */}
              {rawText.trim().length > 3 && (
                <div className="p-4 rounded-xl bg-[#F8FAFB] border border-[#EAECF0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#1E222B] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00D09C]" />
                      Auto-Detected Details
                    </span>
                    <span className="text-[10px] text-[#7C7E8C] font-semibold">
                      Ready to add
                    </span>
                  </div>

                  {/* Chips Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-[#EAECF0]">
                      <span className="text-[10px] text-[#7C7E8C] block font-bold">Course Code</span>
                      <span className="font-mono font-extrabold text-[#009E77]">{parsedData.courseCode}</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-[#EAECF0]">
                      <span className="text-[10px] text-[#7C7E8C] block font-bold">Professor</span>
                      <span className="font-bold text-[#1E222B] truncate block">{parsedData.professor}</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-[#EAECF0]">
                      <span className="text-[10px] text-[#7C7E8C] block font-bold">Exam Type</span>
                      <span className="font-bold text-[#1E222B]">{parsedData.examType}</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-[#EAECF0]">
                      <span className="text-[10px] text-[#7C7E8C] block font-bold">Time Budget</span>
                      <span className="font-bold text-[#00D09C]">{parsedData.timeLabel}</span>
                    </div>
                  </div>

                  {/* Context Tags & Title preview */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] text-[#7C7E8C] font-bold mr-1">Tags:</span>
                      {parsedData.contextTags.map((tag) => (
                        <span key={tag} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#E8FAF5] text-[#009E77] border border-[#A7F0DC]">
                          {tag}
                        </span>
                      ))}
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#F3F4F6] text-[#44475B] border border-[#EAECF0] ml-auto">
                        Type: {parsedData.type}
                      </span>
                    </div>

                    <div className="text-xs text-[#5B6275] truncate">
                      <span className="font-bold text-[#1E222B]">Generated Title: </span>
                      {parsedData.title}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Footer */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[#44475B] bg-white border border-[#EAECF0] rounded-xl hover:bg-[#F8F9FA] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !rawText.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-[#00D09C] hover:bg-[#00B386] active:bg-[#009E77] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm shadow-[#00D09C]/30 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Publishing Live...</span>
                  ) : (
                    <>
                      <span>1-Click Confirm & Publish</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
