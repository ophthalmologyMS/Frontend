import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage';
import PatientRecords from './Records/PatientRecords';
import Schedule from './ListViewForAppointements/Schedule';
import Intro from './intro';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Intro></Intro>}></Route>
        <Route path="/Home/:username/:type" element={<Homepage></Homepage>}></Route>
        <Route path="/Records/:username/:type" element={<PatientRecords></PatientRecords>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
