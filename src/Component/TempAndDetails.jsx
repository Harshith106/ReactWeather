/* eslint-disable react/prop-types */
import { FaTemperatureHalf } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { BsDropletHalf } from "react-icons/bs";
import { BsSunrise } from "react-icons/bs";
import { BsSunset } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";


/* c25f7bcdb06bad42940a0820b60d8b67 */

const TempAndDetails = ({
    weather: { details, icon , temp,temp_max,temp_min,sunrise,sunset,speed,humidity,feels_like},units
}) => {
    const verticaldetails = [
        {
            id: 1,
            Icon: FaTemperatureHalf,
            Title: "Real Feel",
            value: `${feels_like.toFixed()}°`
        },
        {
            id: 2,
            Icon: BsDropletHalf,
            Title: "Humidity",
            value: `${humidity.toFixed()}%`
        },
        {
            id: 3,
            Icon: FiWind,
            Title: "Wind",
            value: `${speed.toFixed()}${units==='metric'?"km/hr":"m/s"}`
        }
    ]
    
    
    const horizontalDetails = [
        {
            id: 1,
            Icon: BsSunrise,
            Title: "Sun Rise",
            value: sunrise
        },
        {
            id: 2,
            Icon: BsSunset,
            Title: "Sun Set",
            value: sunset
        },
        {
            id: 3,
            Icon: IoIosArrowUp,
            Title: "High",
            value: `${temp_max.toFixed()}°`
        },
        {
            id: 4,
            Icon: IoIosArrowDown,
            Title: "Low",
            value: `${temp_min.toFixed()}°`
        }
    ]
    return (
        <>
            <div className="flex justify-center items-center text-cyan-300 my-6 py-6 text-2xl"><p>{details}</p></div>


            <div className="flex justify-between items-center my-6">
                <img src={icon} alt="Weather Image" />

                <p className="text-6xl font-light">{`${temp.toFixed(2)}°`}</p>

                <div className="flex flex-col space-y-6">
                    {
                        verticaldetails.map(({ id, Icon, Title, value }) => (
                            <div key={id} className="flex flex-row gap-4">
                                <Icon size={30}/>
                                <p className="text-xl font-light">{Title}</p>
                                <p className="text-xl font-light">{value}</p>
                            </div>
                        ))
                    }
                    
                </div>
            </div>

            <div className="flex justify-between items-center py-6 my-10">
                    {
                        horizontalDetails.map(({id,Icon,Title,value})=>(
                            <div key={id} className="flex justify-between">
                                <Icon size={30} />
                                <p className="mx-2">{Title}</p>
                                <p className="mx-4">{value}</p>
                            </div>
                        ))
                    }
            </div>
        </>
    )
}

export default TempAndDetails
