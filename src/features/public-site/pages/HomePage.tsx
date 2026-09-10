import { Link } from "react-router-dom";

const specialties = [
  {
    name: "Neurology",
    description: "Headaches, migraines, and neurological conditions",
  },
  {
    name: "Radiology",
    description: "MRI, CT, ultrasound, and diagnostic imaging",
  },
  {
    name: "Cardiology",
    description: "Heart and cardiovascular care",
  },
  {
    name: "Orthopedics",
    description: "Bones, joints, and musculoskeletal conditions",
  },
];

export default function HomePage() {
  return (
    <main>
      <section>
        <p>Patient-first healthcare</p>
        <h1>Find the right doctor and book your appointment with confidence.</h1>
        <p>
          Search by doctor, specialty, or symptom. Choose an available time,
          review your appointment, and continue to secure payment.
        </p>

        <div>
          <Link to="/doctors">Find a Doctor</Link>
          <Link to="/doctors">Book Appointment</Link>
        </div>
      </section>

      <section>
        <h2>Popular specialties</h2>
        <p>Start with the type of care you need.</p>

        <div>
          {specialties.map((specialty) => (
            <article key={specialty.name}>
              <h3>{specialty.name}</h3>
              <p>{specialty.description}</p>
              <Link to={`/doctors?specialty=${specialty.name}`}>
                View doctors
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Designed around your appointment journey</h2>
        <div>
          <article>
            <h3>1. Find care</h3>
            <p>Search doctors by specialty, symptom, or availability.</p>
          </article>

          <article>
            <h3>2. Book and pay</h3>
            <p>Choose a time, review the details, and complete payment.</p>
          </article>

          <article>
            <h3>3. Stay informed</h3>
            <p>
              Receive appointment confirmations, reminders, and future report
              notifications.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
