import { FormControl,Select,MenuItem,OutlinedInput } from '@mui/material';

const SelectComp=()=>{
return <FormControl sx={{width:200}}>
       <label id="demo-simple-select-label" style={{fontSize:"1.2rem", marginBottom:"0.3em",color:"#002352"}} >Select Vaccine</label>
         <Select 
         displayEmpty
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={selectedVaccine}
             sx={{fontSize:"1.2rem"}}
             input={<OutlinedInput />}
             label="Age"
             onChange={(e)=>handleSelect(e)}
             
         >
           {vaccines &&vaccines.map(vac=>(
               <MenuItem style={getStyles(vac,theme)}
               value={vac.id}>{vac.name}</MenuItem>
           ))} 
            
       </Select>
       </FormControl>
}
