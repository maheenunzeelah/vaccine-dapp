import { EthProvider } from "./contexts/EthContext";
import Home from "./components/Home";
import Manufacturer from "./Screens/Manufacturer";
import Distributor from "./Screens/Distributor";
import Container from "./Screens/Container";
import VaccCenter from "./Screens/VaccCenter";
import TrackContainer from "./Screens/TrackContainer";
import { Route, Routes} from 'react-router-dom';
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <EthProvider>
      <div >
        <div >
        <Routes>
        <Route exact path='/'element={<Home/>} />
        <Route exact path='/manufacturer'element={<Manufacturer/>} />
        <Route path='/distributor' element={<Distributor />} />
        <Route path='/container' element={<Container/>} />
        <Route path='/vaccine_center' element={<VaccCenter />} />
        <Route path='/track_container' element={<TrackContainer />} />
      </Routes>
        
          {/* 
          <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
