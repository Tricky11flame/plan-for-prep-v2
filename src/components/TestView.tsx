import { useState, useEffect } from 'react';
import type { TestSession } from '../types';
import CardHeader from "./CardHeader.tsx"
import CardFull from "./CardFull.tsx"
interface TestViewProps {
  test: TestSession;
  onNextQuestion: () => void;
  onEndTest: () => void;
}

export default function TestView({ test, onNextQuestion, onEndTest }: TestViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { questions, currentIndex } = test;
  const currentQuestion = questions[currentIndex];
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  if (!currentQuestion) return null;
  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-mono " 
    >
      <CardFull currentQuestion={currentQuestion} isFlipped={isFlipped}/>
      <CardHeader currentIndex={currentIndex} size={questions.length} onEndTest={onEndTest} onNextQuestion={onNextQuestion} setIsFlipped={setIsFlipped} isFlipped={isFlipped}/>
</div>
  );
}