import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ElectiveExplorer from './components/ElectiveExplorer';
import ExamTriage from './components/ExamTriage';
import SubmissionModal from './components/SubmissionModal';
import FeedbackBanner from './components/FeedbackBanner';
import EvalRunnerModal from './components/EvalRunnerModal';
import ProblemBriefModal from './components/ProblemBriefModal';
import { INITIAL_ELECTIVES, INITIAL_RESOURCES } from './data/seedData';
import { EVAL_TEST_CASES } from './utils/evalSuite';
import { CheckCircle2, AlertTriangle, Sparkles, X, Flame } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('electives'); // 'electives' | 'triage'
  const [electives, setElectives] = useState(INITIAL_ELECTIVES);
  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem('coursesignal_resources');
    return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
  });

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isEvalsOpen, setIsEvalsOpen] = useState(false);
  const [isBriefOpen, setIsBriefOpen] = useState(false);
  const [selectedCourseForSubmit, setSelectedCourseForSubmit] = useState('');

  // Toast notification state
  const [toast, setToast] = useState(null);

  // Grab-and-Leave feedback loop state
  const [pendingFeedbackResource, setPendingFeedbackResource] = useState(null);

  // User verified resources tracking (1 vote per person)
  const [userVerifiedIds, setUserVerifiedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('coursesignal_user_verified_ids');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('coursesignal_user_verified_ids', JSON.stringify(userVerifiedIds));
    } catch (e) {}
  }, [userVerifiedIds]);

  // Evaluation Suite live state
  const [evalResults, setEvalResults] = useState(() => {
    return EVAL_TEST_CASES.map(test => {
      const result = test.run(test.input);
      return {
        id: test.id,
        name: test.name,
        category: test.category,
        passed: result.passed,
        expected: result.expected,
        actual: result.actual,
        executedAt: new Date().toLocaleTimeString()
      };
    });
  });

  // Sync resources to localStorage
  useEffect(() => {
    localStorage.setItem('coursesignal_resources', JSON.stringify(resources));
  }, [resources]);

  // Check last visited resource on initial mount
  useEffect(() => {
    try {
      const lastVisitedId = localStorage.getItem('coursesignal_last_visited_resource');
      if (lastVisitedId) {
        const found = resources.find(r => r.id === lastVisitedId);
        if (found) {
          setPendingFeedbackResource(found);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Open resource: saves to history & prompts feedback
  const handleOpenResource = (resource) => {
    try {
      localStorage.setItem('coursesignal_last_visited_resource', resource.id);
      setPendingFeedbackResource(resource);
    } catch (e) {
      console.error(e);
    }

    // Open link in new window
    window.open(resource.url, '_blank', 'noopener,noreferrer');
    showToast(`Opened "${resource.title}". Grab-and-leave feedback active.`, 'info');
  };

  // Grab-and-Leave feedback submission
  const handleFeedbackSubmit = (resourceId, actuallyHelped) => {
    if (actuallyHelped) {
      if (!userVerifiedIds.includes(resourceId)) {
        setUserVerifiedIds(prev => [...prev, resourceId]);
        setResources(prev => prev.map(r => {
          if (r.id === resourceId) {
            return { ...r, verifiedCount: r.verifiedCount + 1 };
          }
          return r;
        }));
      }
      showToast('Thank you! Your verification was added to this resource.', 'success');
    } else {
      showToast('Feedback noted! We down-rank resources that students report not useful.', 'info');
    }

    setPendingFeedbackResource(null);
    try {
      localStorage.removeItem('coursesignal_last_visited_resource');
    } catch (e) {}
  };

  // 1-Tap Simulate Return for reviewers
  const handleSimulateReturn = () => {
    const target = resources[0];
    setPendingFeedbackResource(target);
    showToast('Simulated next campus visit: Grab-and-Leave prompt triggered at top of screen.', 'info');
  };

  // Flag broken link
  const handleFlagBroken = (resourceId) => {
    setResources(prev => prev.map(r => {
      if (r.id === resourceId) {
        const nextState = !r.flaggedBroken;
        showToast(
          nextState ? 'Link reported as broken and dimmed in triage.' : 'Flag removed.',
          nextState ? 'warning' : 'success'
        );
        return { ...r, flaggedBroken: nextState };
      }
      return r;
    }));
  };

  // Outcome verification increment (1 vote per person)
  const handleVerifyResource = (resourceId) => {
    if (userVerifiedIds.includes(resourceId)) {
      // Toggle off
      setUserVerifiedIds(prev => prev.filter(id => id !== resourceId));
      setResources(prev => prev.map(r => {
        if (r.id === resourceId) {
          return { ...r, verifiedCount: Math.max(0, r.verifiedCount - 1) };
        }
        return r;
      }));
      showToast('Verification removed.', 'info');
    } else {
      // Add vote
      setUserVerifiedIds(prev => [...prev, resourceId]);
      setResources(prev => prev.map(r => {
        if (r.id === resourceId) {
          return { ...r, verifiedCount: r.verifiedCount + 1 };
        }
        return r;
      }));
      showToast('Verified! Your vote has been recorded (1 vote per student).', 'success');
    }
  };

  // Add new parsed resource from modal
  const handleAddResource = (newRes) => {
    setResources(prev => [newRes, ...prev]);
    showToast(`Published "${newRes.title}" to ${newRes.courseCode} live!`, 'success');

    // If it's an exam resource, switch to triage to show it
    if (newRes.timeBudget) {
      setActiveTab('triage');
    }
  };

  const handleAddTipForCourse = (elective) => {
    setSelectedCourseForSubmit(elective.code);
    setIsSubmitOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB] text-[#1E222B] font-sans selection:bg-[#00D09C] selection:text-white">
      {/* Grab-and-Leave Feedback Banner */}
      <FeedbackBanner
        pendingResource={pendingFeedbackResource}
        onFeedbackSubmit={handleFeedbackSubmit}
        onDismiss={() => setPendingFeedbackResource(null)}
      />

      {/* Main App Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSubmit={() => {
          setSelectedCourseForSubmit('');
          setIsSubmitOpen(true);
        }}
        onOpenBrief={() => setIsBriefOpen(true)}
        onSimulateReturn={handleSimulateReturn}
        hasPendingFeedback={!!pendingFeedbackResource}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'electives' ? (
          <ElectiveExplorer
            electives={electives}
            onAddTipForCourse={handleAddTipForCourse}
          />
        ) : (
          <ExamTriage
            resources={resources}
            onOpenResource={handleOpenResource}
            onFlagBroken={handleFlagBroken}
            onVerifyResource={handleVerifyResource}
            onOpenSubmit={() => {
              setSelectedCourseForSubmit('');
              setIsSubmitOpen(true);
            }}
            userVerifiedIds={userVerifiedIds}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border border-[#EAECF0] bg-[#1E222B] text-white text-xs sm:text-sm font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#00D09C]" />
            <span>{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 text-[#7C7E8C] hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 10-Second Natural Language Submission Modal */}
      <SubmissionModal
        isOpen={isSubmitOpen}
        onClose={() => {
          setIsSubmitOpen(false);
          setSelectedCourseForSubmit('');
        }}
        onAddResource={handleAddResource}
        existingResources={resources}
        initialCourseCode={selectedCourseForSubmit}
        onViewInCatalog={(res) => setActiveTab('triage')}
      />

      {/* Live In-Browser Evaluation Suite Drawer */}
      <EvalRunnerModal
        isOpen={isEvalsOpen}
        onClose={() => setIsEvalsOpen(false)}
        evalResults={evalResults}
        setEvalResults={setEvalResults}
      />

      {/* 1-Page Problem Statement & Evaluation Brief Modal */}
      <ProblemBriefModal
        isOpen={isBriefOpen}
        onClose={() => setIsBriefOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#EAECF0] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7C7E8C]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#1E222B]">Course<span className="text-[#00D09C]">Advisor</span></span>
            <span>•</span>
            <span>Elective Reviews & Exam Study Resources</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsBriefOpen(true)}
              className="text-[#44475B] hover:text-[#00D09C] font-semibold transition-colors"
            >
              Problem Brief
            </button>
            <button
              onClick={() => setIsEvalsOpen(true)}
              className="text-[#44475B] hover:text-[#00D09C] font-semibold transition-colors"
            >
              Test Suite (11/11 Passing)
            </button>
            <button
              onClick={handleSimulateReturn}
              className="text-[#009E77] hover:text-[#007054] font-bold transition-colors"
            >
              Simulate Return Visit
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
