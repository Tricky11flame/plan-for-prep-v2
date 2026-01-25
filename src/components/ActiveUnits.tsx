function ActiveUnits({sCount}) {
  return (
    <div className="p-2 border-black bg-white">
        <div className="flex justify-between items-center text-[10px] font-black uppercase">
          <span>Active Units:</span>
          <span className="text-blue-600 text-lg bg-blue-100 px-2 border-[1.5pt] border-black">
            {sCount}
          </span>
        </div>
    </div>
  )
}

export default ActiveUnits