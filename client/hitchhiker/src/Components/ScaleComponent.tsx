import {useState} from "react";
import {useMapEvents} from "react-leaflet";


const ScaleComponent = () => {
    const [scale, setScale] = useState(100);
    const map = useMapEvents({
        zoom: () => {
            const zoomLevel = map.getZoom();
            let calculatedScale = Math.pow(2, zoomLevel - 2);
            calculatedScale = Math.min(Math.max(calculatedScale, 1), 1000); // Constrain scale between 1 and 1000 lightyears
            setScale(calculatedScale);
        },
    });

    return (
        <div className="absolute bottom-5 bg-opacity-50 bg-black text-cyan-400 shadow-lg p-4 rounded-lg" >
            <span className="font-orbiton">Scale: {scale.toFixed(2)} lightyears</span>
        </div>
    );
};

export default ScaleComponent;