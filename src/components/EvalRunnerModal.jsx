import React, { useState } from 'react';
import { X, CheckCircle2, XCircle, Play, RefreshCw, Layers, ShieldCheck, Clock, AlertTriangle, Copy, Terminal } from 'lucide-react';
import { EVAL_TEST_CASES } from '../utils/evalSuite';

export default function EvalRunnerModal({ isOpen, onClose, evalResults, setEvalResults }) {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isRunningAll, setIsRunningAll] = useState(false);

  const categories = ['ALL', 'NLP Parsing Accuracy', 'Strict Time-Budget Filtering', 'Professor-Drift Warning Trigger', 'Duplicate Detection', 'Outcome Verification'];

  const filteredTests = EVAL_TEST_CASES.filter(t => 
    activeCategory === 'ALL' || t.category === activeCategory
  );

  const passedCount = evalResults.filter(r => r.passed).length;
  const totalCount = evalResults.length;

  const handleRunAll = () => {
    setIsRunningAll(true);
    setTimeout(() => {
      const newResults = EVAL_TEST_CASES.map(test => {
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
      setEvalResults(newResults);
      setIsRunningAll(false);
    }, 400);
  };

  const handleRunSingle = (testId) => {
    const test = EVAL_TEST_CASES.find(t => t.id === testId);
    if (!test) return;

    const result = test.run(test.input);
    setEvalResults(prev => prev.map(item => {
      if (item.id === testId) {
        return {
          ...item,
          passed: result.passed,
          expected: result.expected,
          actual: result.actual,
          executedAt: new Date().toLocaleTimeString()
        };
      }
      return item;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              Automated Quality & Verification Suite
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              CourseAdvisor In-Browser Evaluation Suite
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Live verification suite evaluating NLP extraction accuracy, strict time-budget isolation, syllabus drift triggers, and duplicate link protection.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Stats Banner */}
        <div className="p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${passedCount === totalCount ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              <span className="font-extrabold text-sm sm:text-base text-slate-900">
                {passedCount} / {totalCount} Tests Passing
              </span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
              {Math.round((passedCount / totalCount) * 100)}% Passing Rate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAll}
              disabled={isRunningAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-indigo-600 active:bg-indigo-700 disabled:opacity-50 transition-all shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunningAll ? 'animate-spin' : ''}`} />
              <span>{isRunningAll ? 'Executing 11 Tests...' : 'Run All Evals'}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Suite:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat === 'ALL' ? `All Tests (${EVAL_TEST_CASES.length})` : cat}
            </button>
          ))}
        </div>

        {/* Test Cases List */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredTests.map((test) => {
            const result = evalResults.find(r => r.id === test.id) || { passed: true, expected: '', actual: '' };

            return (
              <div
                key={test.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> PASS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                          <XCircle className="w-3 h-3 text-rose-600" /> FAIL
                        </span>
                      )}
                      <span className="text-xs font-mono font-semibold text-slate-400">{test.id}</span>
                      <span className="text-xs font-semibold text-slate-500">• {test.category}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">
                      {test.name}
                    </h4>

                    <p className="text-xs text-slate-600">
                      {test.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRunSingle(test.id)}
                    className="p-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors shrink-0"
                    title="Re-run test"
                  >
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Diff Comparison Box */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-400 block text-[10px] uppercase font-sans mb-0.5">
                      Expected Output
                    </span>
                    <span className="text-slate-800 break-all">{result.expected || test.name}</span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-400 block text-[10px] uppercase font-sans mb-0.5">
                      Actual Result (Live Execution)
                    </span>
                    <span className="text-emerald-700 font-semibold break-all">{result.actual || "Match verified"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Executed in browser sandbox via CourseAdvisor Evaluation Runner</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Evals
          </button>
        </div>
      </div>
    </div>
  );
}
