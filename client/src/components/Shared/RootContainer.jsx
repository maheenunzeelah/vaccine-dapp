import { Container } from '@mui/system';
import { Box,Typography,Stack} from '@mui/material';
import {ButtonComp} from '.'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
const styles={
    root: {
        backgroundColor: "rgba(0,0,0,0.1)",
        lineHeight:"1.2em",
        padding:"4em 4em",
        marginTop:"1em",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        display: "flex",
        flexWrap:"wrap",
        flexDirection:"column"
    }};

const RootContainer=({heading,address,children})=>{
    const navigate=useNavigate();
    
  
    return <Container  maxWidth="md"  fluid sx={{paddingTop:"2em", marginBottom:"2em"}}  >
        <ButtonComp text={"back"} greyBtn  onClick={()=>navigate('/')} startIcon={<ArrowBackIcon/>} />
        <Box component="form"  sx={styles.root}>
        <Typography variant='h3' align='center' >{heading}</Typography>
        <Typography variant="h5" sx={{wordBreak:"break-all"}}>Address: {address}</Typography>
        <Stack spacing={2} direction="column" mt="2em">
        {children}
        </Stack>
    </Box>
    </Container>
}    
export default RootContainer;