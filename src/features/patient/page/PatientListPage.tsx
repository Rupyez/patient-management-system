import { useState } from "react";
import AppContainer from "../../../components/common/AppContainer";
import PageHeader from "../../../components/ui/PageHeader";
import PatientToolbar from "../components/PatientToolbar";
import PatientTable from "../components/PatientTable";

import type { Patient } from "../types/patient";

interface PatientListPageProps {
  data: Patient[];
}

export default function PatientListPage({
  data,
}: PatientListPageProps) {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");
  const [status, setStatus] = useState("all");

  return (
    <AppContainer>
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
        onAddPatient={() => {
          console.log("Add Patient");
        }}
      />

      <PatientTable data={data} />
    </AppContainer>
  );
}