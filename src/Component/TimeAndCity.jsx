/* eslint-disable react/prop-types */
const TimeAndCity = ({ 
  weather: { formattedLocalTime, name, country }, 
   }) => {
  return (
    <div>
      <div className="flex justify-center items-center my-10">
        <p className="text-xl font-extralight">{formattedLocalTime}</p>
      </div>
      <div className="flex justify-center items-center my-2">
        <p className="text-3xl">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndCity;
