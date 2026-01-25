
interface CardHeaderProps{
    currentIndex : number
    size : number
    onEndTest: () => void;
    onNextQuestion: () => void;
    setIsFlipped:()=> void;
    isFlipped : boolean;
}
function CardHeader({currentIndex,size,onEndTest,onNextQuestion,setIsFlipped,isFlipped}:CardHeaderProps) {
  return (
    <div className="pt-1 pb-2 flex flex-col sm:flex-row justify-between items-center bg-yellow-400 border-[3pt] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] gap-4 sm:gap-0 font-mono">
      {/* Status Section */}
      <div className="text-sm font-black uppercase tracking-tight flex items-center">
        <div className="my-auto pl-2 whitespace-nowrap">PROGRESS:</div>
        <div className="bg-white  border-[2pt] border-black text-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] divide-black divide-x-4 flex ">
          <span className="px-1 py-1/2"> {currentIndex + 1}</span> 
          <span className="px-1 py-1/2"> {size}</span>
        </div>
      </div>

      <div className="">
      {!isFlipped ? (
        <button
          onClick={() => setIsFlipped(true)}
          className="w-full py-2 px-4 bg-gray-800 text-white font-black text-2xl uppercase border-[3pt] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-950 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all tracking-widest"
        >
          Reveal 
          <div className="text-xs">
          Press [ SPACE ]
          </div>
        </button>
      ) : (
        <button
          onClick={onNextQuestion}
          className="w-full py-2 px-4 bg-green-500 text-white font-black text-2xl uppercase border-[3pt] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all tracking-widest"
        >
          Next 
          <div className="text-xs">
          Press [ SPACE ]
          </div>
        </button>
      )}
    </div>
      {/* Control Section */}
      <button
        onClick={onEndTest}
        className="w-full sm:w-auto mr-2 bg-red-600 text-white px-6 py-2 text-xs font-black uppercase border-[2pt] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-white active:text-black transition-all"
      >
        Abort X
      </button>
    </div>
  )
}

export default CardHeader