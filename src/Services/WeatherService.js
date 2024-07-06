import { DateTime } from "luxon";

const ApiKey = 'c25f7bcdb06bad42940a0820b60d8b67'
const BaseUrl = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (infoType,searchParams) =>{
    const url = new URL(BaseUrl + infoType)
     url.search = new URLSearchParams({...searchParams,appid:ApiKey})

    return fetch(url).then(res => res.json()).then(data => data)
}

const formatToLocalTime = (secs,offset,format = "cccc,dd LLL yyyy' | Localtime:'hh:mm:a") => DateTime.fromSeconds(secs+offset,{zone:"utc"}).toFormat(format)
const iconUrl = (icon) =>`https://openweathermap.org/img/wn/${icon}@2x.png`

const formatCurrent = (data) =>{
    const {
        coord:{lat,lon},
        main:{feels_like,temp,temp_max,temp_min,humidity},
        name,dt,sys:{sunrise,sunset,country},weather,wind:{speed},timezone
    } = data
    const {main :details , icon} = weather[0]
    const formattedLocalTime = formatToLocalTime(dt,timezone);
    return {
            temp, temp_max,temp_min,feels_like,humidity,
            sunrise : formatToLocalTime(sunrise , timezone ,'hh:mm:a'),
            sunset : formatToLocalTime(sunset , timezone ,'hh:mm:a'),
            speed,details,icon:iconUrl(icon),formattedLocalTime,dt,timezone,lat,lon,name,country
    }
}
const formatForecastWeather = (secs,offset,data) =>{
    //hourly 
    const hourly = data.filter(f =>f.dt>secs).map((f)=>({
        temp : f.main.temp,
        title : formatToLocalTime(f.dt , offset, 'hh:mm:a'),
        icon  : iconUrl(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0,5)

     const daily = data.filter((f) =>f.dt_txt.slice(-8) === "00:00:00").map(f =>({
        temp : f.main.temp,
        title : formatToLocalTime(f.dt , offset, 'cccc'),
        icon  : iconUrl(f.weather[0].icon),
        date: f.dt_txt,
     }))
    return {hourly,daily}
}
const getFormattedWeatherData = async(searchParams) =>{
    const formattedCurrentWeather = await getWeatherData('weather',searchParams).then(formatCurrent)
    const {lat,lon,dt,timezone} = formattedCurrentWeather
    const formattedForecastWeather = await getWeatherData('forecast',{lat,lon,units:searchParams.units}).then((d)=>formatForecastWeather(dt,timezone,d.list))
    return {...formattedCurrentWeather,...formattedForecastWeather}
}

export default getFormattedWeatherData