import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-slate-400 mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
