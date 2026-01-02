import React from 'react';
import  type {StudyMaterial} from '../types.ts';
// import { Navigate } from 'react-router';
interface SidebarProps {
  materials: StudyMaterial[];
  selectedMaterials: string[];
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteMaterial: (name: string) => void;
  onToggleMaterial: (name: string) => void;
}

export default function Sidebar({ materials, selectedMaterials, onFileSelect, onDeleteMaterial, onToggleMaterial }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 h-screen border-2 border-r-[3pt] border-black bg-[#f0f0f0] flex flex-col font-mono overflow-hidden  ">
  {/* System Header */}
  <div className="
  box-yellow  border-b-[3pt] border-black bg-yellow-400 p-2">
    <h2 className="
    box-font text-2xl uppercase  font-semibold tracking-tighter text-black leading-none  pt-6 ">
      Local Quizes
    </h2>
    {/* <p className="
    box-subscript text-xs font-bold mt-2 uppercase bg-black text-white inline-block px-1">
      v1.0.4-stable
    </p> */}
    <p className="
    box-subscript text-xs font-semibold mt-2 uppercase bg-black text-white inline-block px-1">
      this menu shows the files saved on your system
    </p>
  </div>
  <input
        type="file"
        accept=".json"
        multiple
        onChange={onFileSelect}
        className="
        box-file block w-full text-xs border-black border-4 border-r border-t file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:font-mono file:text-white hover:file:bg-gray-800 cursor-pointer "
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
  {/* Scrollable Material List */}
  <div title='no-material' className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
    {materials.length === 0 ? (
      <div className="border-[2pt] border-dashed border-black p-8 text-center bg-white">
        <p className="text-xs font-black uppercase text-gray-400">No data loaded</p>
      </div>
    ) : (
      materials.map((material) => (
        <div 
          key={material.name}
          className={`relative border-[2pt] border-black p-3 transition-all ${
            selectedMaterials.includes(material.name) 
            ? 'bg-white shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]' 
            : 'bg-gray-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
          }`}
        >
          {/* Filename Badge */}
          <div className="flex justify-between items-start border-b pb-1">
            <span 
              title={material.name} 
              className="text-sm font-black uppercase bg-black text-white px-2 py-1 truncate max-w-[140px] block"
            >
              {material.name}
            </span>
            <span className="text-xs font-black border-[1.5pt] border-black px-1 bg-white">
              {material.questions.length}Q
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-black pt-1">
            <button
              onClick={() => onDeleteMaterial(material.name)}
              className="bg-red-500 text-white text-sm font-black px-2 py-1 border-[1.5pt] border-black hover:bg-black transition-colors uppercase"
            >
              Wipe
            </button>

            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="text-xs font-black uppercase group-hover:underline">Mount</span>
              <input
                type="checkbox"
                checked={selectedMaterials.includes(material.name)}
                onChange={() => onToggleMaterial(material.name)}
                className="w-5 h-5 border-2 border-black rounded-none appearance-none checked:bg-green-500 checked:shadow-[inset_2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
              />
            </label>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Footer Stats */}
  <div className="p-4 border-t-[3pt] border-black bg-white">
    <div className="flex justify-between items-center text-[10px] font-black uppercase">
      <span>Active Units:</span>
      <span className="text-blue-600 bg-blue-100 px-2 border-[1.5pt] border-black">
        {selectedMaterials.length}
      </span>
    </div>
  </div>
</aside>
  );
}