import { Link, NavLink } from "react-router-dom";

export default function PublicHeader() {
  return (
    <header>
      <nav aria-label="Main navigation">
        <Link to="/">
          <strong>CarePoint Clinic</strong>
        </Link>

        <div>
          <NavLink to="/doctors">Find Doctors</NavLink>
          <a href="/#services">Services</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </div>

        <div>
          <Link to="/login">Log In</Link>
          <Link to="/doctors">Book Appointment</Link>
        </div>
      </nav>
    </header>
  );
}
