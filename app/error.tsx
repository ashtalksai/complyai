"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">500</h1>
        <p className="text-slate-400 mb-8">Something went wrong</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#3B82F6]/90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
