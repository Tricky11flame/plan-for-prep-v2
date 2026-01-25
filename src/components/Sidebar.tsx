import React from 'react';
import  type {StudyMaterial} from '../types.ts';
import MainRedirect from './MainRedirect.tsx';
import NavHead from "./NavHead.tsx"
import ModuleCard from "./ModuleCard.tsx"
import NoCard from "./NoCard.tsx"
import ActiveUnits from "./ActiveUnits.tsx"

interface SidebarProps {
  materials: StudyMaterial[];
  selectedMaterials: string[];
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteMaterial: (name: string) => void;
  onToggleMaterial: (name: string) => void;
}

export default function Sidebar({ 
  materials, 
  selectedMaterials, 
  onFileSelect, 
  onDeleteMaterial, 
  onToggleMaterial
  }: SidebarProps) {
  return (
    <aside className="w-90 h-[97vh] border-2 border-r-[3pt] border-black bg-[#f0f0f0] flex flex-col font-mono overflow-hidden  ">
      <NavHead onFileSelect = {onFileSelect} />
      <ActiveUnits sCount={selectedMaterials.length}/>
      <MainRedirect />
      {/* Scrollable Material List */}
      <div title='no-material' className="flex-1 overflow-y-auto max-h-full px-2 py-6 space-y-4 custom-scrollbar h-fit">
        {materials.length === 0 ? (<NoCard />): 
        (materials.map((material) => (
            <ModuleCard material = {material} selectedMaterials={selectedMaterials} 
            onDeleteMaterial={onDeleteMaterial} onToggleMaterial={onToggleMaterial} />
          )))
        }
      </div>
    </aside>
  );
}