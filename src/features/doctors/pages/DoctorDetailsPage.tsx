import { Link, useParams } from "react-router-dom";
import { doctors } from "../data/doctors";

export default function DoctorDetailsPage() {
  const { doctorId } = useParams();
  const doctor = doctors.find((item) => item.id === doctorId);

  if (!doctor) {
    return (
      <main>
        <h1>Doctor not found</h1>
        <p>The doctor you requested could not be found.</p>
        <Link to="/doctors">Back to Doctors</Link>
      </main>
    );
  }

  return (
    <main>
      <section>
        <p>{doctor.specialty}</p>
        <h1>
          Dr. {doctor.firstName} {doctor.lastName}
        </h1>
        <p>
          {doctor.rating} ★ ({doctor.reviewCount} reviews)
        </p>
        <p>{doctor.yearsOfExperience} years of experience</p>
        <p>${doctor.consultationFee} consultation fee</p>
        <Link to={`/book/${doctor.id}`}>Book Appointment</Link>
      </section>

      <section>
        <h2>About</h2>
        <p>{doctor.bio}</p>
      </section>

      <section>
        <h2>Education</h2>
        <ul>
          {doctor.education.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Certifications</h2>
        <ul>
          {doctor.certifications.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Languages</h2>
        <p>{doctor.languages.join(", ")}</p>
      </section>

      <section>
        <h2>Clinic Location</h2>
        <p>{doctor.clinicLocation.name}</p>
        <address>
          {doctor.clinicLocation.address}, {doctor.clinicLocation.city},{" "}
          {doctor.clinicLocation.state} {doctor.clinicLocation.zipCode}
        </address>
      </section>
    </main>
  );
}
