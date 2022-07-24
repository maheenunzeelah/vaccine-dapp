import { Box,CircularProgress} from '@mui/material';

const Spinner=()=>{
    return (
        <Box sx={{ height:"100vh",display: 'flex',justifyContent:"center",alignContent:"center" ,alignItems:"center"}}><CircularProgress/></Box>
    )
}
export default Spinner;