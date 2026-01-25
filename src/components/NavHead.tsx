interface NavHeadProps{
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function NavHead({onFileSelect }:NavHeadProps) {
  return (
    <>
    <div className="box-yellow  border-b-[3pt] border-black bg-yellow-400 p-2">
        <h2 className="
        box-font text-2xl uppercase  font-semibold tracking-tighter text-black leading-none  pt-6 ">
          Local Quizes
        </h2>
        <p className="
        box-subscript text-xs font-semibold mt-2 uppercase bg-black text-white inline-block px-1">
          this menu shows the files saved on your system
        </p>
      </div>
      <input type="file" accept=".json" multiple onChange={onFileSelect}
      className="box-file block w-full text-xs border-black border-4 border-r border-t file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-black file:font-mono file:text-white hover:file:bg-gray-800 cursor-pointer "/>
    </>
  )
}

export default NavHead;