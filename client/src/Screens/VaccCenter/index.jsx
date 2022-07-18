import { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';
const VaccCenter=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();
    const [selectedVaccine,setSelectedVaccine]=useState(0);  
    const [endedVaccines,setEndedVaccines]=useState([]);
    
    useEffect(()=>{
     let _ended= vaccines?.filter(vacc=>(vacc.state=="3"));
     setEndedVaccines(_ended);
     setSelectedVaccine(parseInt(_ended[0]?.id))
  
    
    },[vaccines])
    const handleSelect=(val)=>{
      setSelectedVaccine(val)
  }
  const receiveContainer=async()=>{
    try{
      const received=await contract?.methods?.ReceiveContainer(selectedVaccine)?.send({from:accounts[0]})
      if(received){
        const _ended=vaccines?.filter(vacc=>(vacc.state=="3" && vacc.id!=selectedVaccine));
        setEndedVaccines(_ended);
        if(_ended.length)
        setSelectedVaccine(parseInt(_ended[0].id))
        
      }
    }
    catch(err){
      console.log(err)
    }
  }
 
 
    
return <RootContainer heading={"Vaccination Center"} selectedVaccine={selectedVaccine} address={accounts && accounts[0]}> 
           <SelectComp vaccines={endedVaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
           <ButtonComp text={"Container Received"} onClick={receiveContainer}/> 
       </RootContainer>
  
}
export default VaccCenter;