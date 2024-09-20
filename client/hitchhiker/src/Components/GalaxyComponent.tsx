import {useAtom} from "jotai";
import {galaxyAtom} from "../Atoms/GalaxyAtom.tsx";
import {useEffect} from "react";
import {Api} from "../../Api.ts/Api.ts";
import GalaxyStats from "./GalaxyStats.tsx";


function GalaxyComponent(){

    const [galaxies, setGalaxies] = useAtom(galaxyAtom);
    const api = new Api();

    useEffect(() => {
        const getGalaxies = async () => {
            try {
                const response = await api.galaxy.galaxyGetAll();
                setGalaxies(response.data);
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
            {/* Display Galaxy Stats for the first galaxy */}
            {galaxies.length > 0 && galaxies[0].planets && (
                <GalaxyStats galaxy={galaxies[0]} />
            )}

            <div className="carousel w-full h-[calc(100vh-100px)] overflow-hidden">
                {galaxies.length > 0 ? (
                    galaxies.map((galaxy, index) => (
                        <div
                            key={galaxy.id}
                            id={`item${index + 1}`}
                            className="carousel-item w-full h-full"
                        >
                            {/* Adjust height of the image to fit the view */}
                            <img
                                src="astralisp.webp"
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
                            className="btn btn-xs bg-gray-700 text-yellow-400 hover:shadow-green-500 hover:scale-105 transition transform duration-200"
                        >
                            {galaxy.name}
                        </a>
                    ))}
            </div>
        </div>
    );
};

export default GalaxyComponent;