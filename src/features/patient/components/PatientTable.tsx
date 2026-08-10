import DataTable from "../../../components/table/DataTable";
import { patientColumns } from "../table/PatientColumns";
import type { Patient } from "../types/patient";


interface PatientTableProps {
  data: Patient[];
}

export default function PatientTable({ data }: PatientTableProps) {
  return (
    <DataTable
      columns={patientColumns}
      data={data}
    />
  );
}