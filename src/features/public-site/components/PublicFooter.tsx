import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer>
      <div>
        <strong>CarePoint Clinic</strong>
        <p>Simple, patient-first appointment booking and care coordination.</p>
      </div>

      <nav aria-label="Footer navigation">
        <Link to="/doctors">Find Doctors</Link>
        <a href="/#services">Services</a>
        <a href="/#contact">Contact</a>
      </nav>

      <p>© 2026 CarePoint Clinic. All rights reserved.</p>
    </footer>
  );
}
