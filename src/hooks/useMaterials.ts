import { useState, useEffect } from "react";
import { db } from "../db";
import type { StudyMaterial, NotificationState } from "../types";

export const useMaterials = (showNotification: (m: string, t?: NotificationState['type']) => void) => {
    const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const allMaterials = await db.materials.toArray();
            setStudyMaterials(allMaterials);
        };
        loadData();
    }, []);

    const processIncomingMaterial = async (name: string, questions: any[]) => {
        const cleanName = name.replace(/\.json$/, '');
        const existing = await db.materials.get(cleanName);
        
        if (existing) {
            showNotification(`"${cleanName}" is already loaded.`, 'info');
            return false;
        }

        const newMaterial = { name: cleanName, questions };
        await db.materials.add(newMaterial);
        setStudyMaterials(prev => [...prev, newMaterial]);
        return true;
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

    return {
        studyMaterials,
        selectedMaterials,
        processIncomingMaterial,
        handleDeleteMaterial,
        handleToggleMaterial
    };
};