import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Mock patient data (in real app, fetch from API)
const MOCK_PATIENT = {
  id: '1',
  name: 'John Doe',
  age: 45,
  gender: 'Male',
  bloodGroup: 'A+',
  allergies: ['Penicillin', 'Sulfa'],
  chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
  medications: ['Lisinopril 10mg', 'Metformin 500mg'],
  appointment: {
    date: '2025-02-15',
    time: '09:00 AM',
    reason: 'Severe headache',
    status: 'IN_PROGRESS',
  },
  medicalHistory: [
    { date: '2024-12-10', diagnosis: 'Hypertension', notes: 'Blood pressure 140/90' },
    { date: '2024-11-05', diagnosis: 'Diabetes Type 2', notes: 'HbA1c 7.2' },
  ],
};

const ConsultationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for SOAP notes
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');

  // State for medications
  const [medications, setMedications] = useState<Array<{ name: string; dosage: string; frequency: string; duration: string }>>([]);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '', duration: '' });

  // State for tests
  const [testOrders, setTestOrders] = useState<string[]>([]);
  const [newTest, setNewTest] = useState('');

  // State for follow-up
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpReason, setFollowUpReason] = useState('');

  // State for active tab
  const [activeTab, setActiveTab] = useState<'soap' | 'tests' | 'prescriptions' | 'followup'>('soap');

  const handleAddMedication = () => {
    if (newMed.name && newMed.dosage) {
      setMedications([...medications, newMed]);
      setNewMed({ name: '', dosage: '', frequency: '', duration: '' });
    }
  };

  const handleAddTest = () => {
    if (newTest.trim()) {
      setTestOrders([...testOrders, newTest]);
      setNewTest('');
    }
  };

  const handleCompleteConsultation = () => {
    // In real app, save all data to API
    alert('Consultation completed!');
    navigate('/doctor/dashboard');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Patient Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              {MOCK_PATIENT.name}
            </h2>
            <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <span>{MOCK_PATIENT.age} years • {MOCK_PATIENT.gender}</span>
              <span>Blood: {MOCK_PATIENT.bloodGroup}</span>
              <span>Appointment: {MOCK_PATIENT.appointment.date} at {MOCK_PATIENT.appointment.time}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-xs">
                {MOCK_PATIENT.appointment.status}
              </span>
            </div>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">Reason:</span>
            <span className="ml-1 font-medium text-gray-800 dark:text-gray-100">{MOCK_PATIENT.appointment.reason}</span>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 flex flex-wrap gap-3">
          {MOCK_PATIENT.allergies.length > 0 && (
            <div className="text-sm">
              <span className="text-red-500 font-medium">Allergies:</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">{MOCK_PATIENT.allergies.join(', ')}</span>
            </div>
          )}
          {MOCK_PATIENT.chronicConditions.length > 0 && (
            <div className="text-sm">
              <span className="text-orange-500 font-medium">Conditions:</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">{MOCK_PATIENT.chronicConditions.join(', ')}</span>
            </div>
          )}
          {MOCK_PATIENT.medications.length > 0 && (
            <div className="text-sm">
              <span className="text-blue-500 font-medium">Current Meds:</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">{MOCK_PATIENT.medications.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { id: 'soap', label: 'SOAP Notes' },
          { id: 'tests', label: 'Order Tests' },
          { id: 'prescriptions', label: 'Prescriptions' },
          { id: 'followup', label: 'Follow-up' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              px-4 py-2 text-sm font-medium rounded-lg transition-colors
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/30 p-6">
        {/* SOAP Notes */}
        {activeTab === 'soap' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">SOAP Notes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subjective</label>
                <textarea
                  value={subjective}
                  onChange={(e) => setSubjective(e.target.value)}
                  placeholder="Patient's reported symptoms, history, etc."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objective</label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="Physical exam findings, test results, vitals, etc."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assessment</label>
                <textarea
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  placeholder="Diagnosis, differentials, severity, etc."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plan</label>
                <textarea
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  placeholder="Treatment plan, medications, tests, referrals, follow-up"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {/* Order Tests */}
        {activeTab === 'tests' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Order Tests</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTest}
                onChange={(e) => setNewTest(e.target.value)}
                placeholder="e.g., Complete Blood Count, MRI Brain"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleAddTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {testOrders.length > 0 && (
              <div className="mt-4 space-y-2">
                {testOrders.map((test, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <span className="text-gray-700 dark:text-gray-300">{test}</span>
                    <button
                      onClick={() => setTestOrders(testOrders.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Prescribe Medication</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input
                type="text"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                placeholder="Medication name"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                value={newMed.dosage}
                onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                placeholder="Dosage (e.g., 10mg)"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                value={newMed.frequency}
                onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })}
                placeholder="Frequency (e.g., once daily)"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleAddMedication}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {medications.length > 0 && (
              <div className="mt-4 space-y-2">
                {medications.map((med, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-100">{med.name}</span>
                      <span className="ml-2 text-gray-500 dark:text-gray-400">{med.dosage} • {med.frequency}</span>
                    </div>
                    <button
                      onClick={() => setMedications(medications.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Follow-up */}
        {activeTab === 'followup' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Schedule Follow-up</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reason</label>
                <input
                  type="text"
                  value={followUpReason}
                  onChange={(e) => setFollowUpReason(e.target.value)}
                  placeholder="e.g., Review blood test results, monitor response to treatment"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={handleCompleteConsultation}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Complete Consultation
        </button>
        <button
          onClick={() => navigate('/doctor/dashboard')}
          className="px-6 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Save Draft
        </button>
        <button
          onClick={() => navigate('/doctor/dashboard')}
          className="px-6 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConsultationPage;