
export default function PatientHeader() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        
        {/* Portal Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Patient Portal
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Manage your appointments and health information
          </p>
        </div>

        {/* Patient Welcome */}
        <nav>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Welcome, Patient
          </span>
        </nav>

      </div>
    </header>
  );
}
