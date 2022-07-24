import { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';

const Container=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();
    const [selectedVaccine,setSelectedVaccine]=useState(0);  
    const [startedVaccines,setStartedVaccines]=useState([]);
    const [loader,showloader]=useState(false);
    
    useEffect(()=>{
     let _selected= vaccines?.filter(vacc=>(vacc.state=="2"));
     setStartedVaccines(_selected);
     setSelectedVaccine(parseInt(_selected[0]?.id))
  
    
    },[vaccines])
    const handleSelect=(val)=>{
      setSelectedVaccine(val)
  }
  const handleViolation=async(type, val)=>{
    try{
      showloader(true)
      const violated=await contract?.methods?.violationOccurrence(selectedVaccine,type,val)?.send({from:accounts[0]})
      if(violated){
        const _violate=vaccines?.filter(vacc=>(( vacc.state=="2") && vacc.id!=selectedVaccine));
        setStartedVaccines(_violate);
        if(_violate.length)
        setSelectedVaccine(parseInt(_violate[0].id))
        

      }
    }
    catch(err){
      console.log(err)
    }
    finally{
      showloader(false)
    }
  }
 
  const BUTTONS=[
    {
     text:'Temperature Violated',
     type:1
    },
    {
      text:'Container Disclosed',
      type:2
     },
     {
      text:'Container Exposed',
      type:3
     },
     {
      text:'Container Route Changed',
      type:4
     },
    ]
return <RootContainer heading={"Container"} address={accounts && accounts[0]}> 
           <SelectComp vaccines={startedVaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
           {BUTTONS.map(btn=>{
           return <ButtonComp disabled={loader} loader={loader}  text={btn.text} onClick={()=>handleViolation(btn.type,12)}/>})}
  </RootContainer>
}
export default Container;