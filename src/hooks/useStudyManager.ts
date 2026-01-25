import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { db } from '../db';
import type { StudyMaterial, TestSession, NotificationState} from '../types.tsx';
import { shuffleArray, parseQuestionsFile, getQuestionsFromSelection } from '../utils/studyUtils';

export const useStudyManager = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [view, setView] = useState<'setup' | 'test' | 'results'>('setup');
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [currentTest, setCurrentTest] = useState<TestSession | null>(null);
  const [savedCourse, setSavedCourse] = useState<TestSession | null>(null);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const [allMaterials, saved] = await Promise.all([
        db.materials.toArray(),
        db.savedCourses.get(1)
      ]);
      setStudyMaterials(allMaterials);
      if (saved) setSavedCourse(saved.session);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (currentTest?.mode === 'course') {
      db.savedCourses.put({ id: 1, session: currentTest });
    }
  }, [currentTest]);

  const showNotification = (message: string, type: NotificationState['type'] = 'error') => {
    setNotification({ message, type });
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    
    const newMaterialsList: StudyMaterial[] = [];
    let filesAddedCount = 0;

    for (const file of files) {
      const name = file.name.replace(/\.json$/, '');
      if (await db.materials.get(name)) {
        showNotification(`Material "${name}" is already loaded.`, 'info');
        continue;
      }
      try {
        const questions = await parseQuestionsFile(file);
        const newMaterial = { name, questions };
        await db.materials.add(newMaterial);
        newMaterialsList.push(newMaterial);
        filesAddedCount++;
      } catch (e) {
        showNotification(`Error in "${file.name}": ${(e as Error).message}`);
      }
    }

    if (filesAddedCount > 0) {
      setStudyMaterials(prev => [...prev, ...newMaterialsList]);
      showNotification(`${filesAddedCount} material(s) loaded.`, 'success');
    }
    event.target.value = '';
  };

  const handleDeleteMaterial = async (nameToDelete: string) => {
    await db.materials.delete(nameToDelete);
    setStudyMaterials(prev => prev.filter(m => m.name !== nameToDelete));
    setSelectedMaterials(prev => prev.filter(name => name !== nameToDelete));
  };

  const handleToggleMaterial = (name: string) => {
    setSelectedMaterials(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

  const clearCourseProgress = async () => {
    await db.savedCourses.delete(1);
    setSavedCourse(null);
  };

  const startTest = (numQuestions: number) => {
    const allSelected = getQuestionsFromSelection(studyMaterials, selectedMaterials);
    if (allSelected.length === 0) return showNotification("Select study material.");

    const count = Math.min(numQuestions, allSelected.length);
    const testQuestions = shuffleArray(allSelected).slice(0, count);
    
    setCurrentTest({ questions: testQuestions, currentIndex: 0, mode: 'test' });
    setView('test');
    navigate('main/test');
  };

  const startCourse = async () => {
    const allSelected = getQuestionsFromSelection(studyMaterials, selectedMaterials);
    if (allSelected.length === 0) return showNotification("Select study material.");
    
    await clearCourseProgress();
    setCurrentTest({ questions: shuffleArray(allSelected), currentIndex: 0, mode: 'course' });
    setView('test');
    navigate('main/test');
  };

  const handleNextQuestion = async () => {
    if (currentTest && currentTest.currentIndex + 1 < currentTest.questions.length) {
      setCurrentTest(prev => prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : null);
    } else {
      if (currentTest?.mode === 'course') await clearCourseProgress();
      setView('results');
      navigate("main/result", { relative: "path" });
    }
  };

  const handleResumeCourse = () => {
    if (savedCourse) {
      setCurrentTest(savedCourse);
      setView('test');
      navigate('main/test');
    }
  };

  const handleEndTest = async () => {
    setView('setup');
    navigate('main');
    const saved = await db.savedCourses.get(1);
    setSavedCourse(saved ? saved.session : null);
  };

  return {
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
  };
};