import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { Api, GalaxyDto, Planet } from "../../../Api.ts/Api.ts";
import {useParams} from "react-router-dom";

const api = new Api();

const UniverseMap = () => {
    const {galaxyId} = useParams();
    const [galaxy, setGalaxy] = useState<GalaxyDto | null>(null);
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
    const svgRef = useRef(null);
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;


    const polarToCartesian = (r, theta) => {
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        return [x, y];
    };

    useEffect(() => {
        const fetchUniverse = async () => {
            try {
                const res = await api.galaxy.galaxyGetById(galaxyId);
                setGalaxy(res.data);
            } catch (error) {
                console.error("Error fetching universe data", error);
            }
        };
        fetchUniverse();
    }, [galaxyId]);

    useEffect(() => {
        if (!galaxy) return;

        const svg = d3.select(svgRef.current);


        svg.selectAll("*").remove();


        const planetGroup = svg.append("g");


        planetGroup.selectAll("image")
            .data(galaxy.planets || [])
            .enter()
            .append("image")
            .attr("xlink:href", (d) => d.imagePath || `${import.meta.env.BASE_URL}default_planet_image.webp`)
            .attr("x", (d) => {
                const r = Math.random() * 200 + 50;
                const theta = Math.random() * 2 * Math.PI;
                const [x, y] = polarToCartesian(r, theta);
                return centerX + x - 15;
            })
            .attr("y", (d) => {
                const r = Math.random() * 200 + 50;
                const theta = Math.random() * 2 * Math.PI;
                const [x, y] = polarToCartesian(r, theta);
                return centerY + y - 15;
            })
            .attr("width", 30)
            .attr("height", 30)
            .on("click", (event, d) => {
                setSelectedPlanet(d);
            });

        const handleClickToClose = (event) => {
            if (!svg.node().contains(event.target)) {
                setSelectedPlanet(null);
            }
        };

        document.addEventListener("click", handleClickToClose);

        return () => {
            document.removeEventListener("click", handleClickToClose);
        };
    }, [galaxy]);

    if (!galaxy) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="relative w-4/5 h-4/5 bg-black bg-opacity-30 border border-cyan-400 rounded-xl shadow-xl overflow-hidden">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="h-full w-full"
                    style={{
                        backgroundImage: `url(${galaxy.imagePath || import.meta.env.BASE_URL + 'default_universe_background.webp'})`,
                        backgroundSize: 'cover'
                    }}
                ></svg>

                {/* Conditionally render selected planet details */}
                {selectedPlanet && (
                    <div className="absolute bottom-10 left-10 bg-opacity-80 bg-black text-cyan-400 shadow-lg rounded-lg p-4">
                        <h3 className="text-xl font-bold">{selectedPlanet.name}</h3>
                        <p>Population: {selectedPlanet.population?.toLocaleString()}</p>
                        <p>Description: {selectedPlanet.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UniverseMap;
