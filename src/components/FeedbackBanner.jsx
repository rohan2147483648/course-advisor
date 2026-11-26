import React from 'react';
import { Flame, CheckCircle2, ThumbsDown, X } from 'lucide-react';

export default function FeedbackBanner({ pendingResource, onFeedbackSubmit, onDismiss }) {
  if (!pendingResource) return null;

  return (
    <div className="bg-gradient-to-r from-[#00D09C] via-[#00B386] to-[#009E77] text-white shadow-md border-b border-[#009E77]/40 animate-in slide-in-from-top duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Message text */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-xs sm:text-sm">
              <span className="font-extrabold text-white">Quick Check: </span>
              <span className="text-white/95">
                From your last study session — did{' '}
                <strong className="text-white underline decoration-white/60 underline-offset-2 font-bold">
                  {pendingResource.title}
                </strong>{' '}
                help for your exam?
              </span>
            </div>
          </div>

          {/* Quick 1-tap buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => onFeedbackSubmit(pendingResource.id, true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-white text-[#007054] hover:bg-white/90 active:bg-white/80 shadow-xs transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00D09C]" />
              <span>Yes, Saved Me!</span>
            </button>

            <button
              onClick={() => onFeedbackSubmit(pendingResource.id, false)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <ThumbsDown className="w-3 h-3" />
              <span>Not Useful</span>
            </button>

            <button
              onClick={onDismiss}
              className="text-white/70 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
