
import { useState } from "react";

import PageHeader from "../../../components/ui/PageHeader";
import PatientToolbar from "../components/PatientToolbar";
import PatientTable from "../components/PatientTable";
import PatientForm from "../components/createPatient/PatientForm";

import { patients } from "../data/patients";
import type { Patient } from "../../../types/patient";

export default function PatientPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [showForm, setShowForm] = useState(false);

  const [patientList, setPatientList] =
    useState<Patient[]>(patients);

  const filteredPatients = patientList.filter((patient) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.medicalRecordNumber
        .toLowerCase()
        .includes(query) ||
      patient.email.toLowerCase().includes(query);

    const matchesGender =
      gender === "ALL" || patient.gender === gender;

    const matchesStatus =
      status === "ALL" || patient.status === status;

    return (
      matchesSearch &&
      matchesGender &&
      matchesStatus
    );
  });

  const handleAddPatient = (newPatient: Patient) => {
    setPatientList((previous) => [
      ...previous,
      newPatient,
    ]);

    setShowForm(false);
  };

  return (
    <>
      <PageHeader
        title="Patients"
        subtitle="Manage all registered patients"
      />

      <PatientToolbar
        search={search}
        gender={gender}
        status={status}
        onSearchChange={setSearch}
        onGenderChange={setGender}
        onStatusChange={setStatus}
        onAddPatient={() => setShowForm(true)}
      />

      <PatientTable data={filteredPatients} />

      {showForm && (
        <div className="mt-8">
          <PatientForm
            onCancel={() => setShowForm(false)}
            onSubmitPatient={handleAddPatient}
          />
        </div>
      )}
    </>
  );
}

