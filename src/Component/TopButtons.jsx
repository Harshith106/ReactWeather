/* eslint-disable react/prop-types */
function TopButtons({setQuery}) {
    const cities = [
        { id: 1, name: 'London' },
        { id: 2, name: 'Tokyo' },
        { id: 3, name: 'Sydney' },
        { id: 4, name: 'Paris' },
        { id: 5, name: 'Delhi' },
    ];

    return (
        <>
            <div className="flex items-center justify-center my-6 text-white">
                {cities.map((city) => (
                    <button 
                        key={city.id} onClick={() =>setQuery({q:city.name})}
                        className="mx-auto max-w-screen-lg mt-4 py-4 text-lg hover:bg-gray-700/20 rounded-lg p-4 transition ease-in-out text-white"
                    >
                        {city.name}
                    </button>
                ))}
            </div>
        </>
    );
}

export default TopButtons;
