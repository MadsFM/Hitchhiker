import {Navigate, Route, Routes,} from "react-router-dom";
import {ROUTE} from './Constants/Routes.ts';
import GalaxyMap from "./Components/Galaxies/GalaxyMap.tsx";
import UniverseMap from "./Components/Universe/UniverseMap.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={ROUTE.GALAXYMAP} />} />
                <Route path={ROUTE.GALAXYMAP} element={<GalaxyMap/>}/>
                <Route path={ROUTE.UNIVERSEMAP + "/:galaxyId"} element={<UniverseMap galaxyId={undefined}/>}/>
            </Routes>
        </>

    );
}

export default App;