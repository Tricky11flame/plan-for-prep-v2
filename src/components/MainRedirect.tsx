function MainRedirect() {
  return (
    <div className="flex gap-4  font-mono py-2 pb-3 border-b-3 border-t-3 border-black">
          <button
            onClick={() => window.location.href = '/main'}
            className="px-6 py-1 
            bg-white 
            border-2 border-black font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-emerald-500 hover:translate-x-[2px] hover:text-white hover:translate-y-[2px] hover:shadow-none active:bg-black active:text-white transition-all mx-auto"
          >Main</button>
          <button
            onClick={() => window.location.href = '/store'}
            className="px-6 py-1 bg-white border-2 border-black font-black uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-indigo-500 hover:text-white hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-black active:text-white transition-all mx-auto"
          >Store</button>
    </div>
  )
}

export default MainRedirect