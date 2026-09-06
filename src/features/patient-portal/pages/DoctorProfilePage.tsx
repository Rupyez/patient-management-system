
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PatientHeader from '../components/layout/PatientHeader';

const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Neurology',
    department: 'Neurology',
    experience: 12,
    rating: 4.9,
    reviewCount: 87,
    consultationFee: 180,
    profileImage: '',
    bio: 'Dr. Sarah Chen is a board-certified neurologist with over 12 years of experience. She specializes in treating migraines, epilepsy, and stroke rehabilitation. She is known for her compassionate patient care and evidence-based approach.',

    education: [
      'MD, Stanford University',
      'Residency in Neurology, Massachusetts General Hospital',
      'Fellowship in Headache Medicine',
    ],

    certifications: [
      'Board Certified in Neurology',
      'American Headache Society Member',
    ],

    availability: [
      {
        day: 'Monday',
        slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
      },
      {
        day: 'Wednesday',
        slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
      },
      {
        day: 'Friday',
        slots: ['9:00 AM', '10:00 AM', '11:00 AM'],
      },
    ],

    reviews: [
      {
        patient: 'John D.',
        date: '2025-02-15',
        rating: 5,
        comment:
          'Dr. Chen was incredibly thorough and explained everything clearly.',
      },
      {
        patient: 'Maria S.',
        date: '2025-01-28',
        rating: 4,
        comment:
          'Very knowledgeable, but the wait time was a bit long.',
      },
      {
        patient: 'Robert K.',
        date: '2025-01-10',
        rating: 5,
        comment:
          'Life-changing treatment for my migraines. Highly recommend.',
      },
    ],
  },
];

const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  /*
   * Store selected appointment date.
   */
  const [selectedDate, setSelectedDate] = useState('');

  /*
   * Store selected appointment time.
   */
  const [selectedTime, setSelectedTime] = useState('');

  /*
   * Display validation error if patient tries
   * to continue without selecting date/time.
   */
  const [bookingError, setBookingError] = useState('');

  const doctor = MOCK_DOCTORS.find((doctor) => doctor.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PatientHeader />

        <div className="flex items-center justify-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            Doctor not found
          </p>
        </div>
      </div>
    );
  }

  /*
   * Convert selected date into weekday.
   *
   * Example:
   * 2026-09-07 -> Monday
   */
  const getSelectedDay = () => {
    if (!selectedDate) {
      return '';
    }

    const date = new Date(`${selectedDate}T00:00:00`);

    return date.toLocaleDateString('en-US', {
      weekday: 'long',
    });
  };

  const selectedDay = getSelectedDay();

  /*
   * Find doctor's availability for
   * the selected weekday.
   */
  const selectedDayAvailability = doctor.availability.find(
    (availability) => availability.day === selectedDay
  );

  /*
   * Available appointment slots for
   * currently selected date.
   */
  const availableSlots = selectedDayAvailability?.slots ?? [];

  /*
   * Today's date.
   *
   * Prevents patient from selecting
   * previous dates.
   */
  const today = new Date().toISOString().split('T')[0];

  /*
   * Whenever patient changes date,
   * clear the previously selected time.
   */
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedDate(event.target.value);

    setSelectedTime('');

    setBookingError('');
  };

  /*
   * Store patient's selected appointment time.
   */
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);

    setBookingError('');
  };

  /*
   * Patient must select both date and time
   * before moving to booking page.
   */
  const handleBook = () => {
    if (!selectedDate) {
      setBookingError('Please select an appointment date.');

      return;
    }

    if (!selectedTime) {
      setBookingError('Please select an appointment time.');

      return;
    }

    /*
     * Pass appointment information
     * to the next booking page.
     */
    navigate(`/portal/book/${doctor.id}`, {
      state: {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        consultationFee: doctor.consultationFee,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <PatientHeader />

      <main className="mx-auto max-w-4xl px-4 py-8">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back
        </button>

        {/* Doctor Profile Card */}
        <div className="rounded-2xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/70">

          {/* Doctor Header */}
          <div className="flex flex-col items-start gap-6 md:flex-row">

            {/* Doctor Image */}
            <div className="flex-shrink-0">
              {doctor.profileImage ? (
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="h-24 w-24 rounded-full border-2 border-blue-100 object-cover dark:border-blue-800"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-400 text-3xl font-medium text-white shadow-sm">
                  {doctor.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Doctor Information */}
            <div className="flex-1">

              <div className="flex flex-wrap items-start justify-between">

                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {doctor.name}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400">
                    {doctor.specialty}
                  </p>

                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    {doctor.experience} years experience
                  </p>
                </div>

                {/* Doctor Rating */}
                <div className="mt-2 flex items-center gap-3 md:mt-0">

                  <span className="text-xl text-yellow-500">
                    ★
                  </span>

                  <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {doctor.rating}
                  </span>

                  <span className="text-sm text-gray-400 dark:text-gray-500">
                    ({doctor.reviewCount} reviews)
                  </span>

                </div>
              </div>

              {/* Education Summary */}
              <div className="mt-2 flex flex-wrap gap-2">
                {doctor.education.slice(0, 2).map((education, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100/80 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700/80 dark:text-gray-400"
                  >
                    {education}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div className="mt-6">

            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              About
            </h3>

            <p className="mt-1 leading-relaxed text-gray-700 dark:text-gray-300">
              {doctor.bio}
            </p>

          </div>

          {/* Education & Certifications */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* Education */}
            <div>

              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Education
              </h3>

              <ul className="mt-1 space-y-1">
                {doctor.education.map((education, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    • {education}
                  </li>
                ))}
              </ul>

            </div>

            {/* Certifications */}
            <div>

              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Certifications
              </h3>

              <ul className="mt-1 space-y-1">
                {doctor.certifications.map((certification, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    • {certification}
                  </li>
                ))}
              </ul>

            </div>
          </div>

          {/* Doctor Weekly Availability */}
          <div className="mt-6">

            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Weekly Availability
            </h3>

            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">

              {doctor.availability.map((availability) => (
                <div
                  key={availability.day}
                  className="rounded-lg bg-gray-50/70 p-3 dark:bg-gray-700/50"
                >

                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {availability.day}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-1">

                    {availability.slots.map((slot) => (
                      <span
                        key={slot}
                        className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {slot}
                      </span>
                    ))}

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Appointment Selection */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-white/60 p-5 dark:border-gray-700 dark:bg-gray-800/60">

            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Choose Your Appointment
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Select a date and available appointment time.
            </p>

            {/* Appointment Date */}
            <div className="mt-5">

              <label
                htmlFor="appointmentDate"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Appointment Date
              </label>

              <input
                id="appointmentDate"
                type="date"
                min={today}
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-blue-900"
              />

            </div>

            {/* Appointment Times */}
            {selectedDate && (
              <div className="mt-5">

                <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Available Times
                </p>

                {availableSlots.length > 0 ? (

                  <div className="flex flex-wrap gap-2">

                    {availableSlots.map((slot) => {

                      const isSelected = selectedTime === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleTimeSelect(slot)}
                          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}

                  </div>

                ) : (

                  <div className="rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">

                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Dr. {doctor.name.replace('Dr. ', '')} is not available on{' '}
                      {selectedDay}.
                    </p>

                    <p className="mt-1 text-xs text-orange-600 dark:text-orange-400">
                      Please select Monday, Wednesday, or Friday.
                    </p>

                  </div>

                )}

              </div>
            )}

            {/* Selected Appointment Summary */}
            {selectedDate && selectedTime && (

              <div className="mt-5 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">

                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Selected Appointment
                </p>

                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  {selectedDay}, {selectedDate} at {selectedTime}
                </p>

              </div>

            )}

            {/* Booking Error */}
            {bookingError && (
              <p className="mt-4 text-sm text-red-500">
                {bookingError}
              </p>
            )}

          </div>

          {/* Reviews */}
          <div className="mt-6">

            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Reviews
            </h3>

            <div className="mt-2 space-y-3">

              {doctor.reviews.map((review, index) => (

                <div
                  key={index}
                  className="rounded-lg bg-gray-50/70 p-3 dark:bg-gray-700/50"
                >

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {review.patient}
                    </span>

                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {review.date}
                    </span>

                  </div>

                  {/* Review Stars */}
                  <div className="mt-0.5 flex items-center gap-1 text-sm text-yellow-500">

                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < review.rating ? '★' : '☆'}
                      </span>
                    ))}

                  </div>

                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {review.comment}
                  </p>

                </div>

              ))}

            </div>
          </div>

          {/* Booking Button */}
          <div className="mt-6 border-t border-gray-200/50 pt-6 dark:border-gray-700/30">

            <button
              type="button"
              onClick={handleBook}
              disabled={!selectedDate || !selectedTime}
              className={`w-full rounded-xl py-3 font-medium transition-all duration-200 ${
                selectedDate && selectedTime
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:from-blue-600 hover:to-purple-600 hover:shadow-lg'
                  : 'cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500'
              }`}
            >
              {selectedDate && selectedTime
                ? `Continue Booking — $${doctor.consultationFee}`
                : 'Select Date & Time to Continue'}
            </button>

          </div>

        </div>

      </main>
    </div>
  );
};

export default DoctorProfilePage;

