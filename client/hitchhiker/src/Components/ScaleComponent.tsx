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
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '5px 10px', borderRadius: '5px' }}>
            Scale: {scale.toFixed(2)} lightyears
        </div>
    );
};

export default ScaleComponent;