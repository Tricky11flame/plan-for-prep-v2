import { useState, useEffect, useRef } from 'react';
import type { TestSession } from '../types';

interface TestViewProps {
  test: TestSession;
  onNextQuestion: () => void;
  onEndTest: () => void;
}

export default function TestView({ test, onNextQuestion, onEndTest }: TestViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { questions, currentIndex } = test;
  const currentQuestion = questions[currentIndex];
  // const questionScrollRef = useRef<HTMLDivElement>(null);
  // const answerScrollRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // Reset Question side
  //   if (questionScrollRef.current) {
  //     questionScrollRef.current.scrollTop = 0;
  //     if (!isFlipped) questionScrollRef.current.focus();
  //   }
  //   // Reset Answer side
  //   if (answerScrollRef.current) {
  //     answerScrollRef.current.scrollTop = 0;
  //     if (isFlipped) answerScrollRef.current.focus();
  //   }
  // }, [currentIndex, isFlipped]);
// Inside your JSX
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-mono " 
    // ref={ scrollRef}
    >
  {/* Header Terminal Bar */}
  <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-yellow-400 border-[3pt] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] gap-4 sm:gap-0 font-mono">
  {/* Status Section */}
  <div className="text-sm font-black uppercase tracking-tight flex items-center">
    <div className="my-auto whitespace-nowrap">PROGRESS:</div>
    <div className="bg-white px-3 py-1 border-[2pt] border-black ml-3 text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      {currentIndex + 1} <span className="text-gray-400 text-sm">/</span> {questions.length}
    </div>
  </div>

  {/* Control Section */}
  <button
    onClick={onEndTest}
    className="w-full sm:w-auto bg-red-600 text-white px-6 py-2 text-xs font-black uppercase border-[2pt] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-white active:text-black transition-all"
  >
    Abort X
  </button>
</div>
  {/* The Interaction Machine (Flip Card) */}
  {/* Note: Relying on your existing .flip-card CSS for the mechanics, styling the faces here */}
  <div className={`flip-card h-[450px] md:h-[600px] mb-8 ${isFlipped ? 'flipped' : ''}`}>
    <div className="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-3d">
      {/* Front Face - Question */}
      {/* Overriding default padding/border-radius with brutalist styles */}
      <div className="flip-card-front absolute inset-0 w-full h-full backface-hidden bg-white border-[3pt] border-black p-0! flex flex-col shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overscroll-contain"
      >
        <div className="bg-black  border-b-[3pt] border-black">
           <span className="text-white text-sm font-black uppercase tracking-widest border-b-2 border-b-yellow-400 overscroll-contain">
            Question 
          </span>
        </div>
        <div key={currentQuestion.q}  className="flex-1 flex  justify-center p-8 text-center overflow-y-auto  overflow-x-hidden" 
        // ref={questionScrollRef}
        // tabIndex={-1}
        >
           <h3 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tight my-auto">
             {currentQuestion.q}
           </h3>
        </div>
      </div>
      {/* Back Face - Answer */}
      <div className="flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-blue-50 border-[3pt] border-black p-0! flex flex-col shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]  "
      >
         <div className="bg-blue-600  border-b-[3pt] border-black ">
           <span className="text-white text-sm font-black uppercase tracking-widest ">
            Answer
          </span>
        </div>
         <div key={currentQuestion.q}  className="w-full overscroll-contain flex-1 p-4 flex flex-col justify-start text-start overflow-y-auto custom-scrollbar"
        //  ref={answerScrollRef}
        //  tabIndex={-1}
        >
           <p className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-blue-900 my-auto">
             {currentQuestion.a}
           </p>
        </div>
      </div>
    </div>
  </div>

  {/* Control Deck */}
  <div className="mt-6">
    {!isFlipped ? (
       <button
        onClick={() => setIsFlipped(true)}
        className="w-full py-6 bg-gray-800 text-white font-black text-2xl uppercase border-[3pt] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black active:translate-y-1 active:shadow-none transition-all tracking-widest"
      >
        Reveal Data [SPACE]
      </button>
    ) : (
      <button
        onClick={onNextQuestion}
        className="w-full py-6 bg-green-500 text-white font-black text-2xl uppercase border-[3pt] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 active:translate-y-1 active:shadow-none transition-all tracking-widest"
      >
        {"Proceed >>>"}
      </button>
    )}
  </div>
</div>
  );
}