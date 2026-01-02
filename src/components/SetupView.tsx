import { useState } from 'react';
import  type{ TestSession } from '../types';

interface SetupViewProps {
  onStartTest: (numQuestions: number) => void;
  onStartCourse: () => void;
  savedCourse: TestSession | null;
  onResumeCourse: () => void;
  onDiscardCourse: () => void;
}

export default function SetupView({ onStartTest, onStartCourse, savedCourse, onResumeCourse, onDiscardCourse }: SetupViewProps) {
  const [numQuestions, setNumQuestions] = useState(10);

  return (
    <div className="text-center max-w-lg font-mono ">
  {savedCourse && (
    <div className="mb-10">
      <div className="bg-purple-200 p-8 border-[2pt] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-lg font-black mb-2 uppercase tracking-tighter">
          Unfinished Course Detected!
        </h3>
        <p className="text-xs border-2 rounded-sm opacity-60 text-black mb-6 font-semibold inline-block px-2">
          RESUMING: Q{savedCourse.currentIndex + 1} OF {savedCourse.questions.length}
        </p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onResumeCourse}
            className="bg-amber-500 text-white box-button-animate hover:bg-orange-500"
          >
            Resume Course
          </button>
          <button
            onClick={onDiscardCourse}
            className="bg-white/70 px-4 py-2  text-black/70 font-black border-[1.5pt] border-black uppercase hover:bg-black/70 hover:text-white/70 transition-colors box-button-animate text-xs "
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Main Title Section */}
  <div className="mb-10">
    {/* <h2 className="text-4xl uppercase font-semibold leading-none tracking-tighter">
      <span className="text-red-600">Ready </span>
      <span className="text-black/80 lowercase text-4xl">To </span>
      <span className="text-blue-600 ">Start?</span>
    </h2> */}
    <p className="mt-4 text-sm font-bold uppercase tracking-tight text-gray-500">
      Select materials. Initialize practice. Log data.
    </p>
  </div>

  <div className="bg-white p-8 box-shadow">
    {/* Random Test Section */}
    <div className="mb-8">
      <h3 className="text-md font-black uppercase mb-4 text-left border-b-[2pt] border-black pb-1 inline-block">
        Random Test Generator
      </h3>
      <div className="flex items-center justify-center gap-4 mb-6">
        <label htmlFor="num-questions" className="font-black uppercase text-sm">Quantity:</label>
        <input
          type="number"
          id="num-questions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(Math.max(1, parseInt(e.target.value, 10) || 1))}
          className="w-24 p-2 text-center text-xl font-black border-[2pt] border-black focus:bg-yellow-100 outline-none"
        />
      </div>
      <button
        onClick={() => onStartTest(numQuestions)}
        className="
        bg-blue-500 text-white 
        box-button-animate hover:bg-indigo-600"
      >
        Launch Quiz
      </button>
    </div>

    {/* Decorative Divider */}
    <div className="relative my-10 flex items-center justify-center">
      <div className="w-full border-t-[2pt] border-black"></div>
      <span className="absolute bg-white px-4 font-black text-2xl italic">OR</span>
    </div>

    {/* Course Section */}
    <div>
      <h3 className="text-md font-black uppercase mb-2 text-left border-b-[2pt] border-black pb-1 inline-block">
        Linear Course
      </h3>
      <p className="text-[10px] font-bold text-gray-400 uppercase mb-4 text-left">
        Sequential execution of all selected modules.
      </p>
      <button
        onClick={onStartCourse}
        className="w-full py-4 bg-red-500 text-white box-button-animate hover:bg-rose-600"
      >
        Start Course
      </button>
    </div>
  </div>
</div>
  );
}