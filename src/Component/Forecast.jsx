/* eslint-disable react/prop-types */
const Forecast = ({ title, data }) => {
    return (
      <>
        <div className="flex justify-start items-center mt-6">
          <p className="uppercase text-xl font-medium">{title}</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          {data.map((d, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              <p className="text-xl font-light">{d.title}</p>
              <img src={d.icon} alt="Weather Image" className="w-20 my-6" />
              <p className="text-xl font-extralight my-6">{`${d.temp.toFixed()}°`}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
  
  export default Forecast;
  