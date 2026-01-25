import type { StudyMaterial } from "../types";

interface ModuleCardProps{
    material: StudyMaterial;
    selectedMaterials: string[];
    onDeleteMaterial: (name: string) => void;
    onToggleMaterial: (name: string) => void;
}
function ModuleCard({material,selectedMaterials,onDeleteMaterial,onToggleMaterial}:ModuleCardProps) {
  return (
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
  )
}

export default ModuleCard