import { useState } from 'react';
import { Stack} from '@mui/material';
import useEth from "../../contexts/EthContext/useEth";
import {ButtonComp,RootContainer,SelectComp,TextInpComp} from '../../components/Shared';

const Manufacturer=()=>{
    const { state: { accounts,contract,vaccines} } = useEth();  
    const [selectedVaccine,setSelectedVaccine]=useState(0);
  const [distributor,setDistributor]=useState('');
    const handleSelect=(val)=>{
        setSelectedVaccine(val)
    }
    const handleDistributor=(distr)=>{
         setDistributor(distr)
    }
    const createContainer=async(e)=>{
      try{
        const create=await contract?.methods?.CreateContainer(selectedVaccine)?.send({from:accounts[0]})
      console.log(create)
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
    
    return <RootContainer heading={"Manufacturer"} address={accounts && accounts[0]}>
            <Stack spacing={2} direction="column" mt="2em">
              <SelectComp vaccines={vaccines} selectedVaccine={selectedVaccine} handleSelect={handleSelect} />
              <ButtonComp text={'Create Container'} onClick={createContainer} />
              <TextInpComp placeholder={'Enter Distributor Address'} distributor={distributor} handleDistributor={handleDistributor}/>
              <ButtonComp text={'Register Distributor'} onClick={registerDistributor}/>
            </Stack>
          </RootContainer>
}

export default Manufacturer;