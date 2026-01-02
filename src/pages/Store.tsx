import { db } from "../db";
import type { StudyMaterial, Question, NotificationState } from "../types";
import { useState, useEffect } from "react";

function Store() {
    const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
    const [notification, setNotification] = useState<NotificationState | null>(null);

    // Mock data for the Global Repository
    const remoteAssets = [
        { name: "Physics_Advanced.json", url: "https://raw.githubusercontent.com/user/repo/main/physics.json" },
        { name: "History_101.json", url: "https://raw.githubusercontent.com/user/repo/main/history.json" },
        { name: "React_Patterns.json", url: "https://raw.githubusercontent.com/user/repo/main/react.json" }
    ];
    const internalAssets = [
        { name: "CN.json", url: "/data/CN.json" },
        { name: "OS.json", url: "/data/OS.json" },
        { name: "SD.json", url: "/data/SD.json" },
        { name: "DBMS.json", url: "/data/DBMS.json" },
        { name: "LD.json", url: "/data/LD.json" }
    ];

    const showNotification = (message: string, type: NotificationState['type'] = 'error') => {
        setNotification({ message, type });
    };

    /**
     * CORE PROCESSOR: Handles adding data to DB and State
     */
    const processIncomingMaterial = async (name: string, questions: Question[]) => {
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

    const loadRemoteJSON = async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Fetch failed");
            const data = await response.json();
            
            // Handle different JSON structures (flat array vs object with questions key)
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

            const jsonFiles = files.filter(file => file.name.endsWith('.json'));
            let count = 0;
            
            for (const file of jsonFiles) {
                await loadRemoteJSON(file.download_url, file.name);
                count++;
            }
            showNotification(`Batch: ${count} files processed`, 'success');
        } catch (err) {
            showNotification("Batch Scan Failed: Check repo path", 'error');
        }
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files?.length) return;

        for (const file of files) {
            try {
                const content = await file.text();
                const questions: Question[] = JSON.parse(content);
                await processIncomingMaterial(file.name, questions);
            } catch (error) {
                showNotification(`Error in "${file.name}": ${(error as Error).message}`);
            }
        }
        event.target.value = '';
    };

    const handleDeleteMaterial = async (nameToDelete: string) => {
        await db.materials.delete(nameToDelete);
        setStudyMaterials(prev => prev.filter(m => m.name !== nameToDelete));
        setSelectedMaterials(prev => prev.filter(name => name !== nameToDelete));
    };

    const handleToggleMaterial = (name: string) => {
        setSelectedMaterials(prev => prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]);
    };

    useEffect(() => {
        const loadData = async () => {
            const allMaterials = await db.materials.toArray();
            setStudyMaterials(allMaterials);
        };
        loadData();
    }, []);

    return (
        <div className="flex h-screen w-full bg-gray-50 font-mono overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r-[1.5pt] border-black p-6 bg-white overflow-y-auto">
                <h2 className="text-xl font-black mb-4 uppercase italic">Local Assets</h2>
                <input
                    type="file"
                    accept=".json"
                    multiple
                    onChange={handleFileSelect}
                    className="block w-full text-xs border-black border-[1.5pt] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:text-white mb-6"
                />
                <div className="flex gap-4 mb-6 font-mono py-2 pb-3 border-b-3 border-black">
    <button
      onClick={() => window.location.href = '/main'}
      className="px-6 py-1 
      bg-white 
      border-2 border-black font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-500 hover:translate-x-[2px] hover:text-white hover:translate-y-[2px] hover:shadow-none active:bg-black active:text-white transition-all mx-auto"
    >
      Main
    </button>
    
    <button
      onClick={() => window.location.href = '/store'}
      className="px-6 py-1 bg-white border-2 border-black font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-indigo-500 hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-black active:text-white transition-all mx-auto"
    >
      Store
    </button>
</div>
                <div className="flex flex-col gap-4">
                    {studyMaterials.map((material) => (
                        <div key={material.name} className="flex flex-col border-[1.5pt] border-black p-3 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-orange-300 border-[1.5pt] border-black px-2 py-1 text-xs font-bold truncate w-32 uppercase">
                                    {material.name}
                                </span>
                                <span className="bg-green-400 border-[1.5pt] border-black px-2 py-1 text-[10px] font-black uppercase">
                                    {material.questions.length} Q
                                </span>
                            </div>
                            <div className="flex items-center justify-between mt-2 border-t-[1.5pt] border-black pt-2">
                                <input
                                    type="checkbox"
                                    checked={selectedMaterials.includes(material.name)}
                                    onChange={() => handleToggleMaterial(material.name)}
                                    className="h-5 w-5 border-[1.5pt] border-black rounded-none appearance-none checked:bg-indigo-600 cursor-pointer"
                                />
                                <button
                                    onClick={() => handleDeleteMaterial(material.name)}
                                    className="bg-red-500 text-white border-[1.5pt] border-black px-3 py-1 text-[10px] font-black uppercase hover:bg-black"
                                >
                                    Purge
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto bg-[#dbeafe]">
                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black mb-8">
                    Global Repository
                </h1>

                {/* Section 1: Official Modules (Internal /public folder) */}
                <section className="mb-12">
                    <h2 className="text-sm font-black uppercase bg-black text-white inline-block px-2 mb-4 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
                        Official Local Modules
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {internalAssets.map((asset) => (
                            <div key={asset.name} className="bg-white border-[2pt] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                                <div>
                                    <span className="text-[10px] font-bold text-blue-600 uppercase">System Asset</span>
                                    <h3 className="text-lg font-black leading-tight mb-4 truncate italic">{asset.name}</h3>
                                </div>
                                <button
                                    onClick={() => loadRemoteJSON(asset.url, asset.name)}
                                    className="w-full bg-yellow-400 text-black text-xs font-black py-3 uppercase hover:bg-black hover:text-white transition-all border-[1.5pt] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                                >
                                    Install To Storage
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="border-t-[3pt] border-black mb-12 border-dashed" />
                {/* Batch Terminal */}
                <div className="bg-white p-6 border-[3pt] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10">
                    <h3 className="text-xl font-black uppercase mb-4">Remote Sync Terminal</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="user/repo/contents/folder"
                            className="flex-1 p-3 border-[2pt] border-black text-sm font-bold outline-none"
                            id="batch-input"
                        />
                        <button
                            onClick={() => {
                                const val = (document.getElementById('batch-input') as HTMLInputElement).value;
                                batchImportFromGitHub(val);
                            }}
                            className="bg-indigo-600 text-white px-6 py-3 border-[2pt] border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
                        >
                            Batch Sync
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remoteAssets.map((asset) => (
                        <div key={asset.name} className="bg-white border-[2pt] border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-lg font-black leading-tight mb-4 truncate italic">{asset.name}</h3>
                            <button
                                onClick={() => loadRemoteJSON(asset.url, asset.name)}
                                className="w-full bg-black text-white text-xs font-black py-3 uppercase hover:bg-green-500 hover:text-black transition-colors border-[1.5pt] border-black"
                            >
                                Sync To System
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Store;