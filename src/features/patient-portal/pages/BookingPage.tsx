
import React, { useMemo, useRef, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import PatientHeader from '../components/layout/PatientHeader';

/* ============================================================
   TYPES
   ============================================================ */

interface DoctorAvailability {
  day: string;
  slots: string[];
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultationFee: number;
  availability: DoctorAvailability[];
}

interface BookingLocationState {
  doctorId?: string;
  doctorName?: string;
  specialty?: string;
  consultationFee?: number;
  appointmentDate?: string;
  appointmentTime?: string;
}

/* ============================================================
   MOCK DOCTOR DATA

   For now we are storing weekly availability.

   Later:
   Replace this with data coming from your backend API.
   ============================================================ */

const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Neurology',
    consultationFee: 180,

    availability: [
      {
        day: 'Monday',
        slots: [
          '9:00 AM',
          '10:00 AM',
          '11:00 AM',
          '2:00 PM',
          '3:00 PM',
        ],
      },

      {
        day: 'Wednesday',
        slots: [
          '9:00 AM',
          '10:00 AM',
          '11:00 AM',
          '2:00 PM',
          '3:00 PM',
        ],
      },

      {
        day: 'Friday',
        slots: [
          '9:00 AM',
          '10:00 AM',
          '11:00 AM',
        ],
      },
    ],
  },
];

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/*
 * Convert Date object into YYYY-MM-DD.
 *
 * Example:
 * September 7, 2026
 *
 * becomes:
 * 2026-09-07
 *
 * We build this manually instead of using toISOString()
 * because toISOString() uses UTC and can occasionally cause
 * the displayed date to shift depending on timezone.
 */
const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/*
 * Convert YYYY-MM-DD into a local Date.
 *
 * Adding T00:00:00 prevents timezone-related date changes.
 */
const createLocalDate = (date: string): Date => {
  return new Date(`${date}T00:00:00`);
};

/*
 * Return weekday from YYYY-MM-DD.
 *
 * Example:
 * 2026-09-07 -> Monday
 */
const getDayName = (date: string): string => {
  return createLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'long',
  });
};

/*
 * Display appointment date in human-readable format.
 *
 * Example:
 * Mon, Sep 7, 2026
 */
const formatDisplayDate = (date: string): string => {
  return createLocalDate(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/* ============================================================
   BOOKING PAGE
   ============================================================ */

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const location = useLocation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
   * Retrieve information sent by DoctorProfilePage.
   *
   * Example:
   *
   * appointmentDate: "2026-09-07"
   * appointmentTime: "10:00 AM"
   */
  const bookingState =
    location.state as BookingLocationState | null;

  /*
   * Find doctor.
   */
  const doctor = MOCK_DOCTORS.find(
    (doctor) => doctor.id === id
  );

  /*
   * Automatically use the date/time selected
   * on DoctorProfilePage.
   *
   * If patient opens this page directly,
   * these start empty and they can choose below.
   */
  const [selectedDate, setSelectedDate] =
    useState<string>(
      bookingState?.appointmentDate ?? ''
    );

  const [selectedSlot, setSelectedSlot] =
    useState<string>(
      bookingState?.appointmentTime ?? ''
    );

  /*
   * Patient appointment information.
   */
  const [symptoms, setSymptoms] = useState('');

  const [medicalHistory, setMedicalHistory] =
    useState('');

  const [uploadedFiles, setUploadedFiles] =
    useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formError, setFormError] = useState('');

  const [fileError, setFileError] = useState('');

  /*
   * Generate available appointment dates
   * dynamically for the next 14 days.
   *
   * We no longer hardcode dates such as 2025-01-20.
   */
  const availableDates = useMemo(() => {
    if (!doctor) {
      return [];
    }

    const dates: {
      date: string;
      day: string;
      slots: string[];
    }[] = [];

    const today = new Date();

    /*
     * Check today + next 13 days.
     */
    for (let index = 0; index < 14; index++) {
      const currentDate = new Date(today);

      currentDate.setDate(
        today.getDate() + index
      );

      const dayName =
        currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
        });

      /*
       * Check whether doctor works on this weekday.
       */
      const availability =
        doctor.availability.find(
          (item) => item.day === dayName
        );

      if (availability) {
        dates.push({
          date: formatDateForInput(currentDate),
          day: dayName,
          slots: availability.slots,
        });
      }
    }

    return dates;
  }, [doctor]);

  /*
   * Get available time slots for currently
   * selected appointment date.
   */
  const availableSlots = useMemo(() => {
    if (!doctor || !selectedDate) {
      return [];
    }

    const selectedDay =
      getDayName(selectedDate);

    const availability =
      doctor.availability.find(
        (item) => item.day === selectedDay
      );

    return availability?.slots ?? [];
  }, [doctor, selectedDate]);

  /*
   * Doctor not found.
   */
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

  /* ============================================================
     DATE SELECTION
     ============================================================ */

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);

    /*
     * Reset time whenever date changes.
     */
    setSelectedSlot('');

    setFormError('');
  };

  /* ============================================================
     TIME SELECTION
     ============================================================ */

  const handleTimeSelect = (slot: string) => {
    setSelectedSlot(slot);

    setFormError('');
  };

  /* ============================================================
     FILE UPLOAD
     ============================================================ */

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const newFiles = Array.from(files);

    /*
     * Maximum file size:
     * 10 MB
     */
    const maxFileSize =
      10 * 1024 * 1024;

    /*
     * Allowed report types.
     */
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
    ];

    /*
     * Validate file type.
     */
    const invalidType = newFiles.find(
      (file) =>
        !allowedTypes.includes(file.type)
    );

    if (invalidType) {
      setFileError(
        'Only PDF, JPG, JPEG, and PNG files are allowed.'
      );

      event.target.value = '';

      return;
    }

    /*
     * Validate file size.
     */
    const oversizedFile = newFiles.find(
      (file) => file.size > maxFileSize
    );

    if (oversizedFile) {
      setFileError(
        `${oversizedFile.name} is larger than 10MB.`
      );

      event.target.value = '';

      return;
    }

    setFileError('');

    /*
     * Use functional update so we always
     * work with the latest uploaded files.
     */
    setUploadedFiles((currentFiles) => [
      ...currentFiles,
      ...newFiles,
    ]);

    /*
     * Reset input so patient can upload
     * the same file again if needed.
     */
    event.target.value = '';
  };

  /* ============================================================
     REMOVE FILE
     ============================================================ */

  const removeFile = (index: number) => {
    setUploadedFiles((currentFiles) =>
      currentFiles.filter(
        (_, fileIndex) =>
          fileIndex !== index
      )
    );
  };

  /* ============================================================
     SUBMIT BOOKING
     ============================================================ */

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormError('');

    /*
     * Patient must select appointment date.
     */
    if (!selectedDate) {
      setFormError(
        'Please select an appointment date.'
      );

      return;
    }

    /*
     * Patient must select appointment time.
     */
    if (!selectedSlot) {
      setFormError(
        'Please select an appointment time.'
      );

      return;
    }

    /*
     * Symptoms / reason for visit required.
     */
    if (!symptoms.trim()) {
      setFormError(
        'Please describe your symptoms or reason for visit.'
      );

      return;
    }

    setIsSubmitting(true);

    /*
     * Temporary simulated API request.
     *
     * Later this will become something like:
     *
     * await appointmentService.createAppointment(...)
     */
    setTimeout(() => {
      setIsSubmitting(false);

      /*
       * Send completed booking information
       * to confirmation page.
       */
      navigate('/portal/confirmation', {
        state: {
          doctorId: doctor.id,
          doctorName: doctor.name,
          specialty: doctor.specialty,

          date: selectedDate,

          time: selectedSlot,

          fee: doctor.consultationFee,

          symptoms,

          medicalHistory,

          uploadedFileNames:
            uploadedFiles.map(
              (file) => file.name
            ),
        },
      });
    }, 1000);
  };

  /* ============================================================
     PAGE UI
     ============================================================ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 dark:from-gray-900 dark:to-gray-800">

      <PatientHeader />

      <main className="mx-auto max-w-3xl px-4 py-8">

        {/* =====================================================
            BACK BUTTON
            ===================================================== */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          ← Back
        </button>

        {/* =====================================================
            BOOKING CARD
            ===================================================== */}

        <div className="rounded-2xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-gray-700/30 dark:bg-gray-800/70">

          {/* Page Header */}

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Book Appointment
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            with {doctor.name} • {doctor.specialty}
          </p>

          {/* ===================================================
              BOOKING FORM
              =================================================== */}

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >

            {/* =================================================
                DATE SELECTION
                ================================================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Date{' '}
                <span className="text-red-500">
                  *
                </span>
              </label>

              {availableDates.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {availableDates.map(
                    (availableDate) => {

                      const isSelected =
                        selectedDate ===
                        availableDate.date;

                      return (
                        <button
                          key={
                            availableDate.date
                          }
                          type="button"
                          onClick={() =>
                            handleDateSelect(
                              availableDate.date
                            )
                          }
                          className={`
                            rounded-lg border px-4 py-2 text-sm transition-all
                            ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                            }
                          `}
                        >
                          {formatDisplayDate(
                            availableDate.date
                          )}
                        </button>
                      );
                    }
                  )}

                </div>

              ) : (

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No appointment dates are currently available.
                </p>

              )}

            </div>

            {/* =================================================
                TIME SELECTION
                ================================================= */}

            {selectedDate && (

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Time{' '}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                {availableSlots.length > 0 ? (

                  <div className="flex flex-wrap gap-2">

                    {availableSlots.map(
                      (slot) => {

                        const isSelected =
                          selectedSlot === slot;

                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() =>
                              handleTimeSelect(
                                slot
                              )
                            }
                            className={`
                              rounded-lg border px-4 py-2 text-sm transition-all
                              ${
                                isSelected
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                  : 'border-gray-300 bg-white text-gray-700 hover:bg-blue-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                              }
                            `}
                          >
                            {slot}
                          </button>
                        );
                      }
                    )}

                  </div>

                ) : (

                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    No time slots available for this date.
                  </p>

                )}

              </div>

            )}

            {/* =================================================
                SYMPTOMS
                ================================================= */}

            <div>

              <label
                htmlFor="symptoms"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Symptoms / Reason for Visit{' '}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <textarea
                id="symptoms"
                value={symptoms}
                onChange={(event) => {
                  setSymptoms(
                    event.target.value
                  );

                  setFormError('');
                }}
                placeholder="Example: Severe headache for the past three days, dizziness and sensitivity to light..."
                rows={4}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-900"
              />

            </div>

            {/* =================================================
                MEDICAL HISTORY
                ================================================= */}

            <div>

              <label
                htmlFor="medicalHistory"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Medical History
                <span className="ml-1 text-xs font-normal text-gray-400">
                  (optional)
                </span>
              </label>

              <textarea
                id="medicalHistory"
                value={medicalHistory}
                onChange={(event) =>
                  setMedicalHistory(
                    event.target.value
                  )
                }
                placeholder="Existing medical conditions, allergies, medications, previous surgeries, etc."
                rows={3}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-blue-900"
              />

            </div>

            {/* =================================================
                MEDICAL REPORT UPLOAD
                ================================================= */}

            <div>

              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Medical Reports
                <span className="ml-1 text-xs font-normal text-gray-400">
                  (optional)
                </span>
              </label>

              {/* Upload Area */}

              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                onKeyDown={(event) => {
                  if (
                    event.key === 'Enter' ||
                    event.key === ' '
                  ) {
                    fileInputRef.current?.click();
                  }
                }}
                className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-400 dark:border-gray-600"
              >

                {/* Upload Icon */}

                <svg
                  className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Click to upload medical reports
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-500">
                  PDF, JPG or PNG • Maximum 10MB
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />

              </div>

              {/* File Validation Error */}

              {fileError && (
                <p className="mt-2 text-sm text-red-500">
                  {fileError}
                </p>
              )}

              {/* Uploaded Files */}

              {uploadedFiles.length > 0 && (

                <div className="mt-3 space-y-2">

                  {uploadedFiles.map(
                    (file, index) => (

                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50"
                      >

                        <div className="min-w-0">

                          <p className="truncate text-sm text-gray-700 dark:text-gray-300">
                            {file.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {(
                              file.size /
                              1024 /
                              1024
                            ).toFixed(2)}{' '}
                            MB
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFile(index)
                          }
                          className="ml-4 text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

            {/* =================================================
                APPOINTMENT SUMMARY
                ================================================= */}

            <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-700 dark:bg-gray-700/50">

              <h4 className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">
                Appointment Summary
              </h4>

              <div className="space-y-2 text-sm">

                {/* Doctor */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500 dark:text-gray-400">
                    Doctor
                  </span>

                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {doctor.name}
                  </span>

                </div>

                {/* Specialty */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500 dark:text-gray-400">
                    Specialty
                  </span>

                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {doctor.specialty}
                  </span>

                </div>

                {/* Date */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500 dark:text-gray-400">
                    Date
                  </span>

                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedDate
                      ? formatDisplayDate(
                          selectedDate
                        )
                      : 'Not selected'}
                  </span>

                </div>

                {/* Time */}

                <div className="flex items-center justify-between">

                  <span className="text-gray-500 dark:text-gray-400">
                    Time
                  </span>

                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {selectedSlot ||
                      'Not selected'}
                  </span>

                </div>

                {/* Consultation Fee */}

                <div className="flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-600">

                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Consultation Fee
                  </span>

                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    $
                    {
                      doctor.consultationFee
                    }
                  </span>

                </div>

              </div>

            </div>

            {/* =================================================
                FORM ERROR
                ================================================= */}

            {formError && (

              <div className="rounded-lg bg-red-50 px-4 py-3 dark:bg-red-900/20">

                <p className="text-sm text-red-600 dark:text-red-400">
                  {formError}
                </p>

              </div>

            )}

            {/* =================================================
                CONFIRM BOOKING BUTTON
                ================================================= */}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !selectedDate ||
                !selectedSlot ||
                !symptoms.trim()
              }
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-3 font-medium text-white shadow-md transition-all duration-200 hover:from-blue-600 hover:to-purple-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? 'Booking Appointment...'
                : `Confirm Booking — $${doctor.consultationFee}`}
            </button>

          </form>

        </div>

      </main>

    </div>
  );
};

export default BookingPage;

