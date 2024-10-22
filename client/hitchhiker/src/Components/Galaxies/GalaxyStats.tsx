import React from 'react';
import {Galaxy} from "../../../Api.ts/Api.ts";
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';


interface GalaxyStatsProps {
    galaxy: Galaxy;
    onTravel: (galaxy: Galaxy) =>  void;
}

const GalaxyStats: React.FC<GalaxyStatsProps> = ({ galaxy , onTravel}) => {
    const totalPopulation = galaxy.planets
        ? galaxy.planets.reduce((sum, planet) => sum + (planet.population || 0), 0)
        : 0;

    return (
        <div className="w-full p-5 bg-opacity-90 bg-black rounded-lg shadow-lg">
            {/* Galaxy Name */}
            <h2 className="text-4xl font-bold text-center mb-4 text-cyan-400">
                {galaxy.name}
            </h2>

            {/* Stats Container */}
            <div className="stats shadow-lg justify-center bg-black text-cyan-400">
                {/* Total Population */}
                <div className="stat">
                    <div className="stat-figure text-cyan-400">
                        <PeopleIcon className="inline-block h-8 w-8"/>
                    </div>
                    <div className="stat-title text-cyan-400">Total Population</div>
                    <div className="stat-title text-cyan-400">Across all planets:</div>
                    <div className="stat-value text-cyan-400">
                        {totalPopulation ? totalPopulation.toLocaleString() : 'N/A'}
                    </div>

                </div>

                {/* Number of Planets */}
                <div className="stat">
                    <div className="stat-figure text-cyan-400">
                        <PublicIcon className="inline-block h-8 w-8"/>
                    </div>
                    <div className="stat-title text-cyan-400">Number of inhabited Planets</div>
                    <div className="stat-title text-cyan-400">In the galaxy:</div>
                    <div className="stat-value text-cyan-400">
                        {galaxy.planets ? galaxy.planets.length : 'N/A'}
                    </div>

                </div>
            </div>

            {/* Travel Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => onTravel(galaxy)}
                    className="btn bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg shadow-lg"
                >
                    Travel to {galaxy.name}
                </button>
            </div>
        </div>
    );
};

export default GalaxyStats;
