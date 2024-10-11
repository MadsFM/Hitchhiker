import GalaxyComponent from "./Components/Galaxies/GalaxyComponent.tsx";
import {Navigate, Route, Routes,} from "react-router-dom";
import {ROUTE} from './Constants/Routes.ts';
import GalaxyMap from "./Components/Galaxies/GalaxyMap.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={ROUTE.GALAXYMAP} />} />
                {/*<Route path={ROUTE.GALAXIES} element={<GalaxyComponent/>}/>*/}
                <Route path={ROUTE.GALAXYMAP} element={<GalaxyMap/>}/>
            </Routes>
        </>

    );
}

export default App;