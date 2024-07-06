/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineGpsFixed } from "react-icons/md";
function inputs({setQuery,setUnits}) {
  const [city,setCity] = useState("")
  const handleSearch = () =>{
    if(city !=='')setQuery({q:city})
  }
  const handleLocation =() =>{
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(position =>{
        const {latitude,longitude} = position.cards
        setQuery({lat:latitude,lon:longitude})
      })
    }
  }
  return (
    <div className="flex flex-row my-6 justify-center items-center">
      <div className="w-full rounded-lg flex justify-center gap-6">
        <input value={city} onChange={(e)=>setCity(e.currentTarget.value)} type="text" placeholder="Enter city name" className="p-4 rounded-md text-md w-8/12 outline-none capitalize text-black" ></input>
        <FaSearch  size={30} className="mt-3 text-white mx-2 transition ease-in-out hover:scale-150 duration-500" onClick={handleSearch}/>
        <MdOutlineGpsFixed size={30} className="mt-3 mx-2 text-white transition ease-in-out hover:scale-150 duration-500" onClick={handleLocation}/>
      </div>
      <div className=" flex flex-row w-1/4 items-center justify-center bg-slate-500 rounded-md py-3 mx-4 px-3">
        <button className="text-2xl  hover:scale-150 duration-500" onClick={()=>setUnits("metric")}>°C</button>
        <p className="text-2xl px-3">|</p>
        <button className="text-2xl font-medium hover:scale-150 duration-500" onClick={() =>setUnits("imperial")}>°F</button>
      </div>
    </div>
  )
}

export default inputs
