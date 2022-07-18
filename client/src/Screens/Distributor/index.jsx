import { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';

const Distributor=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();
    const [selectedVaccine,setSelectedVaccine]=useState(0);  
    const [createdVaccines,setCreatedVaccines]=useState([]);
    
    useEffect(()=>{
      const _created=vaccines?.filter(vacc=>(vacc.state=="1" || vacc.state=="2"));
      setCreatedVaccines(_created);
      setSelectedVaccine(parseInt(_created[0]?.id))
      
    
    },[vaccines])
    const handleSelect=(val)=>{
      setSelectedVaccine(val)
  }
  const startDelivery=async()=>{
    try{
      const create=await contract?.methods?.StartDelivery(selectedVaccine)?.send({from:accounts[0]})
    console.log(create)
    }
    catch(err){
      console.log(err)
    }
  }
  const endDelivery=async()=>{
    try{
      const create=await contract?.methods?.EndDelivery(selectedVaccine)?.send({from:accounts[0]})
      if(create){
        const _created=vaccines?.filter(vacc=>((vacc.state=="1" || vacc.state=="2") && vacc.id!=selectedVaccine));
        setCreatedVaccines(_created);
        if(_created.length)
        setSelectedVaccine(parseInt(_created[0].id))
        

      }
    }
    catch(err){
      console.log(err)
    }
  }
return <RootContainer heading={"Distributor"} address={accounts && accounts[0]}> 
           <SelectComp vaccines={createdVaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
           <ButtonComp text={'Start Delivery'} onClick={startDelivery}/>
           <ButtonComp text={'End Delivery'} onClick={endDelivery}/>
  </RootContainer>
}
export default Distributor;