import { useState, useEffect } from 'react';
import { Stack} from '@mui/material';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';

const Distributor=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();
    const [selectedVaccine,setSelectedVaccine]=useState(0);  
    const [createdVaccines,setCreatedVaccines]=useState([]);
    
    useEffect(()=>{
      const created=async()=>{
        let arr=[]
        for await (let vac of vaccines){
          const res=await contract?.methods?.containersCreated(vac.id)?.call({from:accounts[0]})
          
          console.log(res,vac.id)
           if(res){
           
            arr=[...arr,vac]
           }
     }
    console.log(arr)
    setCreatedVaccines(arr)
      }
   created()
    
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
    console.log(create)
    }
    catch(err){
      console.log(err)
    }
  }
return <RootContainer heading={"Distributor"} address={accounts && accounts[0]}> 
         <Stack spacing={2} direction="column" mt="2em">
           <SelectComp vaccines={createdVaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
           <ButtonComp text={'Start Delivery'} onClick={startDelivery}/>
           <ButtonComp text={'End Delivery'} onClick={endDelivery}/>
         </Stack>
  </RootContainer>
}
export default Distributor;