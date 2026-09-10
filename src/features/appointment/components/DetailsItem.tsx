



export default function DetailItem({label, value}:{label:string; value:string}){
    return(
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-400">{label}</p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{value}</p>
        </div>
    )
}