import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useState} from 'react';
import {Api, GalaxyDto} from "../../../Api.ts/Api.ts";
import GalaxyStats from "./GalaxyStats.tsx";
import ScaleComponent from "../ScaleComponent.tsx";

const api = new Api();

const createGalaxyIcon = (imagePath) => {
    return L.icon({
        iconUrl: imagePath,
        iconSize: [75, 75],
        iconAnchor: [50, 50],
        popupAnchor: [0, -50],
    });
};

const GalaxyMap = () => {
    const [galaxies, setGalaxies] = useState<GalaxyDto[]>([]);

    useEffect(() => {
        const fetchGalaxies = async () => {
            try {
                const res = await api.galaxy.galaxyGetAll();
                setGalaxies(res.data);
            }catch (error){
                console.error("Error getting galaxies");
            }
        };
        fetchGalaxies();
    }, [])


    return (
        <div style={{ height: '100vh', width: '100vw', background: 'black' }}>
            <MapContainer
                center={[0, 0]}
                zoom={2}
                style={{
                    height: '100%',
                    width: '100%',
                    backgroundImage: 'url("/map.webp")',
                    backgroundSize: 'cover',
                }}
                zoomControl={true}
                attributionControl={false}
            >
                {galaxies.map((galaxy, idx) => (
                    <Marker
                        key={idx}
                        position={[Math.random() * 180 - 90, Math.random() * 360 - 180]}
                        icon={createGalaxyIcon(galaxy.imagePath)}
                        title={galaxy.name}
                    >
                        <Popup
                            maxWidth={600}
                            minWidth={800}
                        >
                            <GalaxyStats galaxy={galaxy}/>
                        </Popup>
                    </Marker>
                ))}
                <ScaleComponent/>
            </MapContainer>
        </div>
    );
};

export default GalaxyMap;
