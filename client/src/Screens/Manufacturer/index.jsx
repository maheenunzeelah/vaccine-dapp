import { useState,useEffect } from 'react';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';

const Manufacturer=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();  
    const [selectedVaccine,setSelectedVaccine]=useState(0);
    const [notReadyVacc,setNotReadyVacc]=useState([]);
    const [distributor,setDistributor]=useState('');

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
        const create=await contract?.methods?.CreateContainer(selectedVaccine)?.send({from:accounts[0]});
        if(create){
          const _notReady=vaccines?.filter(vacc=>(vacc.state=="0" && vacc.id!=selectedVaccine));
          setNotReadyVacc(_notReady);
          if(_notReady.length)
          setSelectedVaccine(parseInt(_notReady[0].id))

        }
      }
      catch(err){
        console.log(err)
      }
      
    }
    const registerDistributor=async()=>{
      try{
        const register=await contract?.methods?.distributorRegistration(distributor)?.send({from:accounts[0]})
       console.log(register)
      }
      catch(err){
        console.log(err)
      }
    }
    
    return <RootContainer heading={"Manufacturer"} selectedVaccine={selectedVaccine} address={accounts && accounts[0]}>
              <SelectComp vaccines={notReadyVacc} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
              <ButtonComp text={'Create Container'} onClick={createContainer} />
              <TextInpComp placeholder={'Enter Distributor Address'} distributor={distributor} handleDistributor={handleDistributor}/>
              <ButtonComp text={'Register Distributor'} onClick={registerDistributor}/>
          </RootContainer>
}

export default Manufacturer;