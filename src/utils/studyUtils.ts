import type { Question,StudyMaterial } from '../types.tsx';
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const parseQuestionsFile = async (file: File): Promise<Question[]> => {
  const content = await file.text();
  return JSON.parse(content);
};

export const getQuestionsFromSelection = (
  materials: StudyMaterial[],
  selectedNames: string[]
): Question[] => {
  return materials
    .filter(m => selectedNames.includes(m.name))
    .flatMap(m => m.questions);
};