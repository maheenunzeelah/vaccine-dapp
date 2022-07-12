import { EthProvider } from "./contexts/EthContext";
import Home from "./components/Home";
import Manufacturer from "./Screens/Manufacturer";
import Distributor from "./Screens/Distributor";
import { Route, Routes, Redirect, withRouter } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div >
        <div >
        <Routes>
        <Route exact path='/'element={<Manufacturer/>} />
        <Route exact path='/distributor' element={<Distributor />} />
        {/* <Route exact path='/dashboard' component={Dashboard} /> */}
        {/* <Route exact path='/manufacturer' component={Manufacturer} />
        
        <Route exact path='/container' component={ContainerComp} />
        <Route exact path='/vaccineCenter' component={VaccCenter} /> */}

      </Routes>
        
          {/* <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer /> */}
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
