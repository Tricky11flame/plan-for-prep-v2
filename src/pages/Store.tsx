import { useState } from "react";
import { useMaterials } from "../hooks/useMaterials";
import { useSync } from "../hooks/useSync";
import { REMOTE_ASSETS, INTERNAL_ASSETS } from "../utils/assets";
import type { NotificationState } from "../types";
function Store() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notification, setNotification] = useState<NotificationState | null>(null);
    const showNotification = (message: string, type: NotificationState['type'] = 'error') => {
        setNotification({ message, type });
    };
    const { 
        processIncomingMaterial, 
    } = useMaterials(showNotification);

    const { loadRemoteJSON, batchImportFromGitHub } = useSync(processIncomingMaterial, showNotification);
    return (
<>
{/* Main Content */}
<div className="flex-1 p-8 overflow-y-auto bg-[#dbeafe]">
    <h1 className="text-4xl font-black italic uppercase tracking-tighter text-black ">
        Global Repository
    </h1>

    {/* Section 1: Official Modules (Internal /public folder) */}
    <section className="mb-8">
        <h2 className="text-sm font-black uppercase bg-black text-white inline-block px-2 mb-4 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
            Official Local Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERNAL_ASSETS.map((asset) => (
                <div key={asset.name} className="bg-white border-[2pt] border-black px-4 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                    <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase">System Asset</span>
                        <div className="text-lg font-black italic">{asset.name}</div>
                    </div>
                    <button
                        onClick={() => loadRemoteJSON(asset.url, asset.name)}
                        className="flex-1 bg-yellow-400 text-black text-xs font-black py-3 uppercase hover:bg-black hover:text-white transition-all border-[1.5pt] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
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
        {REMOTE_ASSETS.map((asset) => (
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
</>
    );
}

export default Store;