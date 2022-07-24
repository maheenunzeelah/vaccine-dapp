import { useState, useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';

const Distributor=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();
    const [selectedVaccine,setSelectedVaccine]=useState(0);  
    const [createdVaccines,setCreatedVaccines]=useState([]);
    const [loader,showloader]=useState(false);

    useEffect(()=>{
    //  window.location.reload()
    },[])
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
      showloader(true)
      const create=await contract?.methods?.StartDelivery(selectedVaccine)?.send({from:accounts[0]})
    console.log(create)
    }
    catch(err){
      console.log(err)
    }
    finally{
      showloader(false)
    }
  }
  const endDelivery=async()=>{
    try{
      showloader(true)
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
    finally{
      showloader(false)
    }
  }
return <RootContainer heading={"Distributor"} address={accounts && accounts[0]}> 
           <SelectComp vaccines={createdVaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
           <ButtonComp disabled={loader} loader={loader}  text={'Start Delivery'} onClick={startDelivery}/>
           <ButtonComp disabled={loader} loader={loader} text={'End Delivery'} onClick={endDelivery}/>
  </RootContainer>
}
export default Distributor;