import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";
import { doctors } from "../data/doctors";

export default function DoctorSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const initialSpecialty = searchParams.get("specialty") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [specialty, setSpecialty] = useState(initialSpecialty);

  const filteredDoctors = useMemo(() => {
    const normalizedQuery = initialQuery.trim().toLowerCase();
    const normalizedSpecialty = initialSpecialty.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const searchableText = [
        doctor.firstName,
        doctor.lastName,
        doctor.specialty,
        doctor.department,
        doctor.bio,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesSpecialty =
        !normalizedSpecialty ||
        doctor.specialty.toLowerCase() === normalizedSpecialty;

      return matchesQuery && matchesSpecialty;
    });
  }, [initialQuery, initialSpecialty]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextParams: Record<string, string> = {};
    if (query.trim()) nextParams.query = query.trim();
    if (specialty) nextParams.specialty = specialty;

    setSearchParams(nextParams);
  }

  return (
    <main>
      <section>
        <h1>Find a Doctor</h1>
        <p>Search by doctor name, specialty, or the type of care you need.</p>

        <form onSubmit={handleSearch}>
          <label htmlFor="doctor-search">Search</label>
          <input
            id="doctor-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Doctor, specialty, or symptom"
          />

          <label htmlFor="specialty">Specialty</label>
          <select
            id="specialty"
            value={specialty}
            onChange={(event) => setSpecialty(event.target.value)}
          >
            <option value="">All specialties</option>
            <option value="Neurology">Neurology</option>
            <option value="Radiology">Radiology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>

          <button type="submit">Search Doctors</button>
        </form>
      </section>

      <section>
        <h2>{filteredDoctors.length} doctors found</h2>

        {filteredDoctors.length === 0 ? (
          <div>
            <h3>No doctors found</h3>
            <p>Try changing your search or specialty.</p>
          </div>
        ) : (
          <div>
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
