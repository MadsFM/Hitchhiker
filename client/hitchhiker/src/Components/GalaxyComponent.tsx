import {useAtom} from "jotai";
import {galaxyAtom} from "../Atoms/GalaxyAtom.tsx";
import React, {useEffect, useState} from "react";
import {Api} from "../../Api.ts/Api.ts";
import GalaxyStats from "./GalaxyStats.tsx";


function GalaxyComponent(){

    const [galaxies, setGalaxies] = useAtom(galaxyAtom);
    const [selectedGalaxy, setSelectedGalaxy] = useState(null);
    const api = new Api();

    useEffect(() => {
        const getGalaxies = async () => {
            try {
                const response = await api.galaxy.galaxyGetAll();
                setGalaxies(response.data);
                // @ts-ignore
                setSelectedGalaxy(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        if (galaxies.length === 0){
            getGalaxies();
        }
    }, [galaxies, setGalaxies])


    return (
        <div className="flex flex-col items-center w-full h-screen overflow-hidden">
            {/* Display Galaxy Stats as a full-width bar */}
            {selectedGalaxy && (
                <div className="w-full bg-gray-800 p-4">
                    <GalaxyStats galaxy={selectedGalaxy} />
                </div>
            )}

            {/* Carousel */}
            <div className="carousel w-full h-[calc(100vh-150px)] overflow-hidden mt-5">
                {galaxies.length > 0 ? (
                    galaxies.map((galaxy, index) => (
                        <div
                            key={galaxy.id}
                            id={`item${index + 1}`}
                            className="carousel-item w-full h-full"
                            onClick={() => setSelectedGalaxy(galaxy)}
                        >
                            {/* Galaxy Image */}
                            <img
                                src={galaxy.imagePath}
                                alt={galaxy.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading galaxies...</p>
                )}
            </div>

            {/* Navigation buttons */}
            <div className="flex w-full justify-center gap-2 py-2">
                {galaxies.length > 0 &&
                    galaxies.map((galaxy, index) => (
                        <a
                            key={galaxy.id}
                            href={`#item${index + 1}`}
                            className={`btn btn-xs bg-gray-700 text-yellow-400 
                          transition transform duration-200
                          hover:shadow-green-500 hover:scale-105 
                          ${selectedGalaxy === galaxy ? 'bg-yellow-400 text-gray-700 shadow-green-500 scale-105' : ''}`}
                            onClick={() => setSelectedGalaxy(galaxy)}
                        >
                            {galaxy.name}
                        </a>
                    ))}
            </div>
        </div>
    );
};

export default GalaxyComponent;