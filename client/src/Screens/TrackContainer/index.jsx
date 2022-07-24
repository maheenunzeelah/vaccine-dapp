import { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp} from '../../components/Shared';
import HorizontalStepperWithError from '../../components/VaccPipeline';
const TrackContainer=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();
    const [selectedVaccine,setSelectedVaccine]=useState(0); 
  const [step,setStep]=useState(0);
  const [show,setShow]=useState(false);
  const [loader,showloader]=useState(false);

  useEffect(()=>{
    if(show)
     trackContainer()
   },[show,selectedVaccine,step])
    const handleSelect=(val)=>{
      setSelectedVaccine(val)
  }

  const trackContainer=async()=>{
    console.log(selectedVaccine)
    try{
  const _vacc=await contract?.methods?.vaccine(selectedVaccine)?.call({from:accounts[0]})
  setStep(parseInt(_vacc.state))
    }
    catch(err){
      console.log(err)
    }
    finally{
      showloader(false)
    }
}
 
    
return <> <RootContainer heading={"Track Containers"} selectedVaccine={selectedVaccine} address={accounts && accounts[0]}> 
           <SelectComp vaccines={vaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
           <ButtonComp disabled={loader} loader={loader}  text={"Show Track"} onClick={()=>setShow(!show)}/> 
          
       </RootContainer>
       {show && <HorizontalStepperWithError step={step} />}
       </>
  
}
export default TrackContainer;