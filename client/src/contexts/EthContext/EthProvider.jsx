import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import { ToastContainer,toast} from 'react-toastify';
import {Spinner} from '../../components/Shared';

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loader,showloader]=useState(false);
  const listenToTheViolationEvents=useCallback(
    (contract)=>{
      console.log("insideviolation")
    contract?.events?.ViolationEvent().on("data",async(evt)=>{
      if(evt.returnValues){
        console.log(evt)
        switch(evt.returnValues.vio_type){
          case "1":
            return toast.warning("Temprature of the container violated");
          case "2":
            return toast.warning("Container opened while on track");
          case "3":
            return toast.warning("Container has been exposed to light"); 
          case "4":
            return toast.warning("Container got sidetracked"); 
            
                 
          default:
            return toast.error("Something went wrong")   

        }
      //  alert(evt)
       
      }
      
    })
  })
  const listenToTheVaccineEvent=useCallback(
    (contract)=>{
    console.log(contract,"inside vaccine event")
    contract?.events?.VaccineChainStep().on("data",async(evt)=>{
      if(evt.returnValues){
        console.log(evt)
        switch(await evt.returnValues.step){
          case "0":
            return toast.success("Not ready for Delivery");
          case "1":
            return toast.success("Container created and ready for delivery");
          case "2":
            return toast.success("Container is on its track"); 
          case "3":
            return toast.success("Delivery of container has been ended"); 
          case "4":
              return toast.success("Container has been received");  
                 
          default:
            return toast.error("Something went wrong")   

        }
      //  alert(evt)
       
      }
      
    })
  })
  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const vaccines=[];
        console.log(accounts,"accounts")
        const { abi } = artifact;
        let address, contract;
        try {
          showloader(true)
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          listenToTheVaccineEvent(contract);
          const vaccineCount=await contract?.methods?.vaccineCount().call({from:accounts[0]})
         
          for(let i=0;i<vaccineCount;i++){
            const res=await contract?.methods?.vaccine(i)?.call({from:accounts[0]})
            vaccines.push({id:res.id,name:res.name,state:res.state})
          }

          showloader(false)
          listenToTheViolationEvents(contract);

          console.log(vaccines,vaccineCount)
        } catch (err) {
          showloader(false)
          console.error(err);
        }
        // console.log("evets")
    
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract,vaccines }
        });
      
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/SmartContainer.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);
    // useEffect(()=>{
    //   toast.success("Checking!!!")
    //  },[])
  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
      console.log("changes")
      window.location.reload();
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      <ToastContainer style={{ fontSize:"1.4rem" }} />
      {loader?<Spinner />:children}
    </EthContext.Provider>
  );
}

export default React.memo(EthProvider);
