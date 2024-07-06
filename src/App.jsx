
import { useEffect, useState } from 'react'
import Forecast from './Component/Forecast'
import TempAndDetails from './Component/TempAndDetails'
import TimeAndCity from './Component/TimeAndCity'
import Buttons from './Component/TopButtons'
import Inputs from './Component/inputs'
import getWeatherData from './Services/WeatherService'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {


  const [query, setQuery] = useState({ q: 'tokyo' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
  const getWeather = async () => {
    const message = query.q ?query.q :"currentLocation"
    toast.info(`Fetching Data for ${message}`)
    await getWeatherData({...query,units }).then(data => {
      setWeather(data)
    })
  }
  useEffect(() => {
    getWeather()
  }, [query, units])

const formatBackground = () =>{
  if(!weather) return `from-cyan-400  to-blue-600`
  const threshold = units == 'metric'? 30 : 80
  if(weather.temp <= threshold)
  {
    return 'from-cyan-600  to-blue-700'
  }
  return 'from-yellow-600 to-orange-700'
}

  return (
    <div className={`mx-auto md:container m-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <Buttons setQuery ={setQuery} />
      <Inputs setQuery = {setQuery} setUnits = {setUnits}/>
      {weather && (
        <>
          <TimeAndCity weather = {weather} />
          <TempAndDetails weather = {weather} units={units} />
          <Forecast title='3 hours step forecast' data = {weather.hourly} />
          <Forecast  title = 'daily forecast' data = {weather.daily}/>
        </>
      )}
      <ToastContainer autoClose={2500} hideProgressBar= {true} theme='colored'/>
    </div>
  )
}

export default App
