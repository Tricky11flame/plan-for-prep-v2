import { Route,Routes,Navigate } from "react-router";
import TestView from "../components/TestView";
import ResultsView from "../components/ResultsView";
import SetupView from "../components/SetupView";
import type { TestSession, NotificationState } from '../types';

interface DefaultProps {
  startTest: (numQuestions: number) => void;
  startCourse: () => Promise<void>;
  savedCourse: TestSession | null;
  handleResumeCourse: () => void;
  clearCourseProgress: () => Promise<void>;
  showNotification: (message: string, type?: NotificationState['type']) => void;
  currentTest: TestSession | null;
  handleNextQuestion: () => Promise<void>;
  handleEndTest: () => Promise<void>;
  // handleDeleteMaterial: (name: string) => Promise<void>;
}
// }
export default function Default({
  startTest,
  startCourse,
  savedCourse,
  handleResumeCourse,
  clearCourseProgress,
  showNotification,
  currentTest,
  handleNextQuestion,
  handleEndTest} 
  : DefaultProps
) {
  return (
    <div className="flex-1 mx-auto items-center justify-center ">
      <Routes>
          <Route path="/"
          element={
            <SetupView onStartTest={startTest} onStartCourse={startCourse}
            savedCourse={savedCourse} onResumeCourse={handleResumeCourse}
            onDiscardCourse={() => {
              clearCourseProgress();
              showNotification("Saved progress discarded.", 'success');
            }}/>
          }
          />
          <Route path="/test" 
          element=
            {currentTest ? (<TestView test={currentTest} onNextQuestion={handleNextQuestion} onEndTest={handleEndTest} />) : (<Navigate to="/" replace />)} 
          />
          <Route path="/result"
          element={
            <ResultsView 
              completedCount={currentTest?.questions.length ?? 0} 
              onBackToMain={handleEndTest} 
            />
          }
          />     
        </Routes>
      </div>
  );
}