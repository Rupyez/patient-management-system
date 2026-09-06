import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientHeader from '../components/layout/PatientHeader';

// Mock test results data
const MOCK_TESTS = [
  {
    id: '1',
    testName: 'Complete Blood Count (CBC)',
    dateOrdered: '2025-01-15',
    datePerformed: '2025-01-16',
    status: 'COMPLETED',
    results: {
      findings: 'All values within normal range. No abnormalities detected.',
      attachments: ['cbc_report.pdf'],
      interpretation: 'Normal',
      normalRange: 'WBC: 4.5-11.0, RBC: 4.7-6.1, etc.',
      abnormal: false,
    },
    doctorName: 'Dr. Sarah Chen',
    notes: 'Routine check-up',
  },
  {
    id: '2',
    testName: 'Lipid Panel',
    dateOrdered: '2025-02-01',
    datePerformed: '2025-02-02',
    status: 'COMPLETED',
    results: {
      findings: 'Total cholesterol slightly elevated (220 mg/dL). LDL 140 mg/dL.',
      attachments: ['lipid_panel.pdf'],
      interpretation: 'Borderline high cholesterol. Consider lifestyle changes.',
      normalRange: 'Total: <200, LDL: <100, HDL: >40',
      abnormal: true,
    },
    doctorName: 'Dr. Michael Torres',
    notes: 'Annual physical',
  },
  {
    id: '3',
    testName: 'MRI Brain',
    dateOrdered: '2025-02-10',
    datePerformed: '2025-02-12',
    status: 'PENDING',
    results: null,
    doctorName: 'Dr. Sarah Chen',
    notes: 'For headache evaluation',
  },
];

const TestResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (test: any) => {
    setSelectedTest(test);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };
    return `px-2 py-0.5 text-xs rounded-full ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <PatientHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-flex items-center gap-1"
        >
          ← Back
        </button>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/30 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Test Results</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View your lab and imaging results</p>

          <div className="mt-6 space-y-4">
            {MOCK_TESTS.map((test) => (
              <div
                key={test.id}
                className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/30 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{test.testName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Ordered: {test.dateOrdered} • Performed: {test.datePerformed || '—'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Doctor: {test.doctorName}</p>
                    {test.results && test.results.abnormal && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">⚠️ Abnormal result</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={getStatusBadge(test.status)}>{test.status}</span>
                    {test.status === 'COMPLETED' && test.results && (
                      <button
                        onClick={() => handleViewDetails(test)}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for test details */}
        {showModal && selectedTest && selectedTest.results && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-white/20 dark:border-gray-700/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {selectedTest.testName}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Date Performed:</span>
                  <span className="ml-2 text-gray-800 dark:text-gray-200">{selectedTest.datePerformed}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Findings:</span>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedTest.results.findings}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Interpretation:</span>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedTest.results.interpretation}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600 dark:text-gray-400">Normal Range:</span>
                  <p className="mt-1 text-gray-700 dark:text-gray-300">{selectedTest.results.normalRange}</p>
                </div>
                {selectedTest.results.abnormal && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-700 dark:text-red-300 font-medium">⚠️ Abnormal result</p>
                  </div>
                )}
                {selectedTest.results.attachments.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Attachments:</span>
                    <ul className="mt-1 space-y-1">
                      {selectedTest.results.attachments.map((file: string) => (
                        <li key={file} className="text-blue-600 dark:text-blue-400 underline cursor-pointer">
                          {file}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestResultsPage;