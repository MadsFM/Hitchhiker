import React from 'react';
import {Galaxy} from "../../Api.ts/Api.ts";
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';


interface GalaxyStatsProps {
    galaxy: Galaxy;
}

const GalaxyStats: React.FC<GalaxyStatsProps> = ({ galaxy }) => {
    const totalPopulation = galaxy.planets
        ? galaxy.planets.reduce((sum, planet) => sum + (planet.population || 0), 0)
        : 0;

    return (
        <div className="w-full mb-5">
            {/* Galaxy Name */}
            <h2 className="text-3xl font-bold text-center mb-3">
                {galaxy.name}
            </h2>

            {/* Stats Container */}
            <div className="stats shadow w-full justify-center">
                {/* Total Population */}
                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        {/* Replace with People Icon from Material UI */}
                        <PeopleIcon className="inline-block h-8 w-8" />
                    </div>
                    <div className="stat-title">Total Population</div>
                    <div className="stat-value">
                        {totalPopulation ? totalPopulation.toLocaleString() : 'N/A'}
                    </div>
                    <div className="stat-desc">Across all planets</div>
                </div>

                {/* Number of Planets */}
                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        {/* Replace with Globe Icon from Material UI */}
                        <PublicIcon className="inline-block h-8 w-8" />
                    </div>
                    <div className="stat-title">Number of inhabited Planets</div>
                    <div className="stat-value">
                        {galaxy.planets ? galaxy.planets.length : 'N/A'}
                    </div>
                    <div className="stat-desc">In the galaxy</div>
                </div>
            </div>
        </div>
    );
};

export default GalaxyStats;
