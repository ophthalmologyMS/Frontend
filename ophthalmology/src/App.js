import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Homepage/Homepage';
import PatientRecords from './Records/PatientRecords';
import Schedule from './ListViewForAppointements/Schedule';
import Intro from './intro';
import SignupSelector from './signUp_selector';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Intro></Intro>}></Route>
        <Route path="/Home/:username/:type" element={<Homepage></Homepage>}></Route>
        <Route path ="/Records" element={<PatientRecords></PatientRecords>}  />
        <Route path ="/signup_selector" element={<SignupSelector></SignupSelector>}  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
