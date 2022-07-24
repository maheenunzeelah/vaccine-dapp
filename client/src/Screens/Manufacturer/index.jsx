import { useState,useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp,Spinner} from '../../components/Shared';

const Manufacturer=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();  
    const [selectedVaccine,setSelectedVaccine]=useState(0);
    const [notReadyVacc,setNotReadyVacc]=useState([]);
    const [distributor,setDistributor]=useState('');
    const [loader,showloader]=useState(false);
    useEffect(()=>{
      const _notReady=vaccines?.filter(vacc=>(vacc.state=="0"));
      setNotReadyVacc(_notReady);
      setSelectedVaccine(parseInt(_notReady[0]?.id))
    },[vaccines])

    const handleSelect=(val)=>{
        setSelectedVaccine(val)
    }
    const handleDistributor=(distr)=>{
         setDistributor(distr)
    }
    const createContainer=async(e)=>{
      try{
        showloader(true)
        const create=await contract?.methods?.CreateContainer(selectedVaccine)?.send({from:accounts[0]});
        if(create){
          const _notReady=vaccines?.filter(vacc=>{
              console.log(vacc,"vacc")
            return vacc.state=="0" && vacc.id!=selectedVaccine
          });
          setNotReadyVacc(_notReady);
          if(_notReady.length)
          setSelectedVaccine(parseInt(_notReady[0].id))

        }
      }
      catch(err){
        console.log(err)
      }
      finally{
        showloader(false)
      }
      
    }
    const registerDistributor=async()=>{
      try{
        showloader(true)
        const register=await contract?.methods?.distributorRegistration(distributor)?.send({from:accounts[0]})
       console.log(register)
      }
      catch(err){
        console.log(err)
      }
      finally{
        showloader(false)
      }
    }
    
    return <RootContainer heading={"Manufacturer"} selectedVaccine={selectedVaccine} address={accounts && accounts[0]}>
              <SelectComp vaccines={notReadyVacc} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
              <ButtonComp disabled={loader} loader={loader} text={'Create Container'} onClick={createContainer} />
              <TextInpComp placeholder={'Enter Distributor Address'} distributor={distributor} handleDistributor={handleDistributor}/>
              <ButtonComp disabled={loader} loader={loader} text={'Register Distributor'} onClick={registerDistributor}/>
          </RootContainer>
}

export default Manufacturer;