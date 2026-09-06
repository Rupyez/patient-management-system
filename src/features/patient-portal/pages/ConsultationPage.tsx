import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientHeader from "../components/layout/PatientHeader";


// Mock consultation data
const mockConsultation = {
  doctor: 'Dr. Sarah Chen',
  date: '2025-01-20',
  diagnosis: 'Tension-type headache',
  symptoms: ['Severe headache', 'Neck stiffness', 'Sensitivity to light'],
  assessmentNotes: 'Patient presented with a severe throbbing headache lasting 3 days. No neurological deficits. Likely tension-type headache.',
  testsOrdered: [
    { id: '1', name: 'Complete Blood Count (CBC)', status: 'ORDERED' },
    { id: '2', name: 'Head CT Scan', status: 'ORDERED' },
  ],
  prescription: {
    medications: [
      { name: 'Ibuprofen 400mg', dosage: 'Take 1 tablet every 6 hours as needed', duration: '5 days' },
      { name: 'Sumatriptan 50mg', dosage: 'Take 1 tablet at onset of headache', duration: 'As needed' },
    ],
    instructions: 'Rest in a quiet, dark room. Stay hydrated. Avoid caffeine.',
  },
  followUp: {
    recommended: true,
    date: '2025-01-27',
    notes: 'Follow up in one week to assess response to treatment.',
  },
};

export default function ConsultationPage(){
    const navigate = useNavigate();
    const [showAll, setShowAll] = useState(false);


    return(
        <div>
            <PatientHeader/>
            <main>
                <button>← Back</button>
                <div>
                    <h2>Consultation Summary</h2>
                    <p> with {mockConsultation.doctor} • {new Date(mockConsultation.date).toLocaleDateString()}</p>

                    {/* Diagnosis */}
                    <div>
                        <p>Diagnosis</p>
                        <p>{mockConsultation.diagnosis}</p>
                    </div>


                    {/* Symptoms */}
                    <div>
                        <h3>Symptoms</h3>
                        <div>
                            {mockConsultation.symptoms.map((s, i) =>(
                                <span>{s}</span>
                            ))}
                        </div>
                    </div>


                    {/* Assessment Notes */}
                    <div>
                        <h3>Assessment</h3>
                        <p>{mockConsultation.assessmentNotes}</p>
                    </div>


                    {/* Tests ordered */}
                    <div>
                        <h3>Tests Ordered</h3>
                        <div>
                            {mockConsultation.testsOrdered.map((test) =>(
                                <div>
                                    <span>{test.name}</span>
                                    <span>{test.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* Prescriptions */}
                    <div>
                        <h3>Prescriptions</h3>
                        <div>
                            {mockConsultation.prescription.medications.map((med, idx) =>(
                                <div>
                                    <p>{med.name}</p>
                                    <p>{med.dosage}</p>
                                    <p>{med.duration}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p><span>Instructions:</span>{mockConsultation.prescription.instructions}</p>
                        </div>
                    </div>


                    {/* Follow up */}
                    {mockConsultation.followUp.recommended &&(
                        <div>
                            <div>
                                <svg>
                                    <path/>
                                </svg>

                                <span>Follow-up Recommended</span>
                            </div>

                            <p>{mockConsultation.followUp.notes} <br/>
                              <span>Date:</span> {new Date(mockConsultation.followUp.date).toLocaleDateString()}
                            </p>

                            <button>
                                Schedule Follow-up
                            </button>

                            <button>
                                Back to Dashboard
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}