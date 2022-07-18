import {useState,useEffect} from 'react';
import { FormControl,Select,MenuItem,OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';



function getStyles(theme) {
    return {
      fontWeight:theme.typography.fontWeightMedium,
      fontSize:"1.2rem"
    };
  }
const SelectComp=({vaccines=[],selectedVaccine,handleSelect})=>{
    const theme = useTheme();
    const [vaccinesList,setVaccinesList]=useState([]);
    console.log(selectedVaccine)
    useEffect(()=>{
      setVaccinesList(vaccines)
    },[vaccines])
   return <FormControl >
       <label id="demo-simple-select-label" style={{fontSize:"1.2rem", marginBottom:"0.3em",color:"#002352"}} >Select Vaccine</label>
         <Select 
         displayEmpty
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={selectedVaccine}
             sx={{fontSize:"1.2rem"}}
             input={<OutlinedInput />}
             label="Age"
             onChange={(e)=>handleSelect(e.target.value)}
             
         >
           {vaccinesList && vaccinesList?.map((vac,i)=>(
               <MenuItem style={getStyles(theme)}
               value={vac.id}>{vac.name}</MenuItem>
           ))} 
            
       </Select>
       </FormControl>
}
export default SelectComp;
