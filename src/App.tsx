import { Routes, Route, Navigate } from 'react-router';
import Sidebar from './components/Sidebar';
import Notification from './components/Notification';
import Default from './pages/Default';
import Store from './pages/Store';
import { useStudyManager } from './hooks/useStudyManager';

export default function App() {
  const {
    studyMaterials,
    selectedMaterials,
    currentTest,
    savedCourse,
    notification,
    setNotification,
    showNotification,
    handleFileSelect,
    handleDeleteMaterial,
    handleToggleMaterial,
    startTest,
    startCourse,
    handleNextQuestion,
    handleResumeCourse,
    handleEndTest,
    clearCourseProgress
  } = useStudyManager();

  return (
    <>
      <Notification notification={notification} onClear={() => setNotification(null)} />
      <main className="p-2 h-screen border border-neutral-400 border-dotted flex  bg-neutral-200">
        <Sidebar 
          materials={studyMaterials} 
          selectedMaterials={selectedMaterials} 
          onFileSelect={handleFileSelect} 
          onDeleteMaterial={handleDeleteMaterial} 
          onToggleMaterial={handleToggleMaterial} 
        />
        <Routes>
          <Route path="/main/*" element={ 
            <Default
              startTest={startTest} 
              startCourse={startCourse} 
              savedCourse={savedCourse} 
              handleResumeCourse={handleResumeCourse} 
              clearCourseProgress={clearCourseProgress}
              showNotification={showNotification}
              currentTest={currentTest}
              handleNextQuestion={handleNextQuestion}
              handleEndTest={handleEndTest}
            />
          } />
          <Route path="/store/*" element={<Store />} />
          <Route path="/" element={<Navigate to="/main" replace />} />
        </Routes>
      </main>
    </>
  );
}