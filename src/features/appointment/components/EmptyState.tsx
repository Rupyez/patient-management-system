


export default function EmptyState({onCreate}:{onCreate:() => void}){
    return(
        <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">📅</div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">No appointments found</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">There are no appointments matching your current search and filters</p>

            <button type="button" onClick={onCreate} className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Create Appointment</button>
        </div>
    )
}