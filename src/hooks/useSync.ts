import type { NotificationState } from "../types";

export const useSync = (
    processIncomingMaterial: (name: string, questions: any[]) => Promise<boolean>,
    showNotification: (m: string, t?: NotificationState['type']) => void
) => {
    const loadRemoteJSON = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Fetch failed");
            const data = await response.json();
            const questions = Array.isArray(data) ? data : data.questions;
            const isValid = questions?.every((item: any) => item.q && item.a);

            if (isValid) {
                const success = await processIncomingMaterial(filename, questions);
                if (success) showNotification(`Synced: ${filename}`, 'success');
            } else {
                showNotification("Error: Invalid JSON Format", 'error');
            }
        } catch (err) {
            showNotification("Sync Failed: CORS or Network Error", 'error');
        }
    };

    const batchImportFromGitHub = async (repoPath: string) => {
        if (!repoPath.trim()) return showNotification("Enter a valid path");
        const apiUrl = `https://api.github.com/repos/${repoPath}`;
        
        try {
            const response = await fetch(apiUrl);
            const files = await response.json();
            if (!Array.isArray(files)) throw new Error("Not a folder path");

            const jsonFiles = files.filter((file: any) => file.name.endsWith('.json'));
            for (const file of jsonFiles) {
                await loadRemoteJSON(file.download_url, file.name);
            }
            showNotification(`Batch processed`, 'success');
        } catch (err) {
            showNotification("Batch Scan Failed", 'error');
        }
    };

    return { loadRemoteJSON, batchImportFromGitHub };
};