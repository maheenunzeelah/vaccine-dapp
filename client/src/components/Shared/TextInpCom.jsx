import { TextField,FormControl} from '@mui/material';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
      fontSize:"1.2rem"
    },
    '.MuiOutlinedInput-root.MuiInputBase-root':{
      marginTop:"4em"
    }

  }));

const TextInpComp=({placeholder,handleDistributor,distributor})=>{
    return <FormControl  >
    <BootstrapInput  sx={{fontSize:"1.2rem"}} size="normal"  placeholder={placeholder} id="outlined-basic" variant="outlined" value={distributor} onChange={(e)=>handleDistributor(e.target.value)} />
    </FormControl>
}
export default TextInpComp;