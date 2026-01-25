import type {Question} from "../types.tsx"
interface CardFullProps{
    isFlipped : boolean
    currentQuestion:Question
}
function CardFull({currentQuestion,isFlipped}:CardFullProps) {
  return (
    <div className={`flip-card h-[450px] md:h-[600px] mb-8 ${isFlipped ? 'flipped' : ''}`} >
      <div className="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-3d" >    
        
        {/* Front Face - Answer */}
        <div className="flip-card-front absolute inset-0 w-full h-full backface-hidden bg-white border-[3pt] border-black p-0! flex flex-col shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overscroll-contain" >
          <div className="bg-black  border-b-[3pt] border-black">
            <span className="text-white text-sm font-black uppercase tracking-widest border-b-2 ml-4 border-b-yellow-400 overscroll-contain" >
              Question 
            </span>
          </div>
          <div key={currentQuestion.q} 
          className="flex-1 flex  justify-center p-8 text-center overflow-y-auto  overflow-x-hidden" >
            <h3 className="text-3xl md:text-5xl font-black uppercase leading-none tracking-tight my-auto">
              {currentQuestion.q}
            </h3>
          </div>
        </div>
        {/* Back Face - Answer */}
        <div className="flip-card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-blue-50 border-[3pt] border-black p-0! flex flex-col shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]" >
          <div className="bg-blue-600  border-b-[3pt] border-black ">
            <span className="ml-4 text-white text-sm font-black uppercase tracking-widest ">
              Answer
            </span>
          </div>
          <div key={currentQuestion.q}  className="w-full overscroll-contain flex-1 p-4 flex flex-col justify-start text-start overflow-y-auto custom-scrollbar">
            <p className="text-2xl md:text-4xl font-bold leading-tight tracking-tight text-blue-900 my-auto select">
              {currentQuestion.a}
            </p>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  )
}

export default CardFull