import type { NotificationState } from "../types.ts";

export const useFileImport = (
    processIncomingMaterial: (name: string, questions: any[]) => Promise<boolean>,
    showNotification: (m: string, t?: NotificationState['type']) => void
) => {
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files?.length) return;

        for (const file of files) {
            try {
                const content = await file.text();
                const questions = JSON.parse(content);
                
                // Validate structure before processing
                if (Array.isArray(questions) || (questions.questions && Array.isArray(questions.questions))) {
                    const data = Array.isArray(questions) ? questions : questions.questions;
                    await processIncomingMaterial(file.name, data);
                } else {
                    throw new Error("Invalid JSON structure");
                }
            } catch (error) {
                showNotification(`Error in "${file.name}": ${(error as Error).message}`);
            }
        }
        
        // Reset input so the same file can be re-selected if needed
        event.target.value = '';
    };

    return { handleFileSelect };
};