import { FolderOpen } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
      <FolderOpen size={70} className="text-slate-300" />
      <h2 className="mt-4 text-xl font-semibold text-slate-800">
        Nothing Here Yet
      </h2>
      <p className="text-slate-500">Data will appear once available</p>
    </div>
  );
}