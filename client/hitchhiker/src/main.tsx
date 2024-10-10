import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GalaxyComponent from "./Components/GalaxyComponent.tsx";
import GalaxyOverview from "./Components/GalaxyOverview.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}/>
              <Route path="/galaxies" element={<GalaxyComponent/>}/>

          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
