import { useState } from 'react';
import { Box, Stack,Button, Typography,TextField,FormControl,Select,MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import useEth from "../../contexts/EthContext/useEth";
import { Container } from '@mui/system';
import OutlinedInput from '@mui/material/OutlinedInput';
const BootstrapInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      fontSize:"1.2rem"
    },
    '.MuiOutlinedInput-root.MuiInputBase-root':{
      marginTop:"4em"
    }

  }));
  




function getStyles(vaccines,theme) {
    return {
      fontWeight:theme.typography.fontWeightMedium,
      fontSize:"1.2rem"
    };
  }
const styles={
    root: {
        backgroundColor: "rgba(0,0,0,0.1)",
        lineHeight:"1.2em",
        padding:"4em 4em",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        display: "flex",
        flexWrap:"wrap",
        flexDirection:"column"
    }};
const Manufacturer=()=>{
    const theme = useTheme();
    const { state: { artifact, web3,accounts,contract,vaccines} } = useEth();  
    const [selectedVaccine,setSelectedVaccine]=useState(0);
 
    const createContainer=async(e)=>{
      try{
        const create=contract?.methods?.CreateContainer(selectedVaccine)?.send({from:accounts[0]})
        create.then(res=>console.log(res))
      }
      catch(err){
        console.log(err)
      }
      
    }
    const handleSelect=(e)=>{
        setSelectedVaccine(e.target.value)
    }
    console.log(accounts,contract)
    return <Container  maxWidth="md"  fluid sx={{paddingTop:"2em"}}  ><Box component="form"  sx={styles.root}>
            
            <Typography variant='h3' align='center' >Manufacturer</Typography>
            <Typography variant="h5" sx={{wordBreak:"break-all"}}>Address: {accounts && accounts[0]}</Typography>
            <Stack spacing={2} direction="column" mt="2em">
            <FormControl sx={{width:200}}>
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
           
            <Button variant="contained" sx={{fontSize:"1.2rem"}} onClick={()=>createContainer()}>Create Container</Button>
            <FormControl  >
            <BootstrapInput  sx={{fontSize:"1.2rem"}} size="normal"  placeholder='Enter Distributor Address' id="outlined-basic" variant="outlined" />
            </FormControl>
            <Button variant="contained" sx={{fontSize:"1.2rem"}}>Register Distributor</Button>

            </Stack>
    </Box></Container>
}

export default Manufacturer;