import { Link } from "react-router-dom";
import type { Doctor } from "../types/doctor.types";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <article>
      <div>
        <p>{doctor.specialty}</p>
        <h2>
          Dr. {doctor.firstName} {doctor.lastName}
        </h2>
        <p>{doctor.yearsOfExperience} years of experience</p>
        <p>
          {doctor.rating} ★ ({doctor.reviewCount} reviews)
        </p>
      </div>

      <div>
        <p>Consultation fee: ${doctor.consultationFee}</p>
        <p>
          {doctor.acceptingNewPatients
            ? "Accepting new patients"
            : "Not accepting new patients"}
        </p>
      </div>

      <div>
        <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
        <Link to={`/book/${doctor.id}`}>Book Appointment</Link>
      </div>
    </article>
  );
}
