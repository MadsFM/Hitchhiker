import  { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {Api, Galaxy, GalaxyDto} from "../../../Api.ts/Api.ts";
import GalaxyStats from "./GalaxyStats.tsx";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../Constants/Routes.ts";

const api = new Api();

const GalaxyMap = () => {
    const [galaxies, setGalaxies] = useState<GalaxyDto[]>([]);
    const [selectedGalaxy, setSelectedGalaxy] = useState<GalaxyDto | null>(null);
    const [scale, setScale] = useState(112000);
    const svgRef = useRef(null);
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    const navigate = useNavigate();


    const polarToCartesian = (r, theta) => {
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        return [x, y];
    };

    useEffect(() => {
        const fetchGalaxies = async () => {
            try {
                const res = await api.galaxy.galaxyGetAll();
                setGalaxies(res.data);
            } catch (error) {
                console.error("Error getting galaxies");
            }
        };
        fetchGalaxies();
    }, []);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();

        const zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on('zoom', (event) => {
                svg.selectAll('g').attr('transform', event.transform);
                const currentZoom = event.transform.k;
                const calculatedScale = 112000 / currentZoom;
                setScale(calculatedScale.toFixed(2));
            });

        svg.call(zoom);

        const galaxyGroup = svg.append("g");

        galaxyGroup.selectAll("image")
            .data(galaxies)
            .enter()
            .append("image")
            .attr("xlink:href", (d) => d.imagePath)
            .attr("x", (d, i) => {
                const r = Math.random() * 200 + 50;
                const theta = Math.random() *2 * Math.PI;
                const [x, y] = polarToCartesian(r, theta);
                return centerX + x - 15;
            })
            .attr("y", (d, i) => {
                const r = Math.random() * 200 + 50;
                const theta = Math.random() * 2 * Math.PI;
                const [x, y] = polarToCartesian(r, theta);
                return centerY + y - 15;
            })
            .attr("width", 30)
            .attr("height", 30)
            .on("click", (event, d) => {
                setSelectedGalaxy(d);
            });

        const handleClickToClose = (event) => {
            if(!svg.node().contains(event.target)){
                setSelectedGalaxy(null);
            }
        };

        document.addEventListener("click", handleClickToClose);

        return () => {
            document.removeEventListener("click", handleClickToClose);
        }
    }, [galaxies]);

    const travelToGalaxy = (galaxy: Galaxy) => {
        const svg = d3.select(svgRef.current)

        const  galaxyPos = {
            x: centerX + Math.random() * 200 + 50,
            y: centerY + Math.random() * 200 + 50
        };

        svg.transition()
            .duration(2000)
            .call(d3.zoom().transform, d3.zoomIdentity.translate(-galaxyPos.x + width / 2, -galaxyPos.y + height / 2).scale(2));

        setTimeout(() => {
            setSelectedGalaxy(null);
            navigate(`${ROUTE.UNIVERSEMAP}/${galaxy.id}`);
        }, 2000);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div
                className="relative w-4/5 h-4/5 bg-black bg-opacity-30 border border-cyan-400 rounded-xl shadow-xl transform rotate-x-10 overflow-hidden">
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${width} ${height}`}
                    preserveAspectRatio="xMidYMid meet"
                    className="h-full w-full"
                    style={{backgroundImage: `url(${import.meta.env.BASE_URL}holomap1.webp)`, backgroundSize: 'cover'}}
                ></svg>

                {/* Conditionally render GalaxyStats component */}
                {selectedGalaxy && (
                    <div
                        className="absolute bottom-10 left-10 bg-opacity-80 bg-black text-cyan-400 shadow-lg rounded-lg p-4">
                        <GalaxyStats galaxy={selectedGalaxy} onTravel={travelToGalaxy}/>
                    </div>
                )}
                <div className="absolute bottom-5 left-5 bg-gray-800 text-white p-2 rounded-lg shadow-md">
                    <p>Scale: {scale} lightyears</p>
                </div>
            </div>
        </div>
    );
};

export default GalaxyMap;
