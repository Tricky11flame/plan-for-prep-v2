interface ResultsViewProps {
  completedCount: number;
  onBackToMain: () => void;
}

export default function ResultsView({ completedCount, onBackToMain }: ResultsViewProps) {
  return (
    <div className="text-center max-w-lg font-mono">
  {/* Header with italicized tilt for urgency */}
  <h2 className="text-5xl font-black mb-6 uppercase italic tracking-tighter text-black">
    Session Complete!
  </h2>
  
  <div className="bg-white p-10 border-[2pt] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
    <div className="mb-10">
      <p className="text-sm font-bold uppercase text-gray-500 mb-1">Final Count</p>
      <div className="inline-block bg-green-400 border-[1.5pt] border-black px-4 py-2 text-2xl font-black">
        {completedCount} QUESTIONS
      </div>
      <p className="mt-6 text-lg font-bold leading-tight uppercase">
        Data synchronized and logged.<br/>Well done.
      </p>
    </div>

    <button
      onClick={onBackToMain}
      className="w-full px-6 py-4 
      border-[2pt] border-black 
      bg-indigo-600 text-white font-black text-xl uppercase tracking-widest hover:bg-black 
      hover:shadow-[4px_4px_0px_0px_rgba(79,70,229,1)] active:translate-y-1 active:shadow-none transition-all"
    >
      Return to System
    </button>
  </div>
</div>
  );
}