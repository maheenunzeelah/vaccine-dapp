import { Container } from '@mui/system';
import { Box,Typography} from '@mui/material';

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

const RootContainer=({heading,address,children})=>{
    console.log(children)
    return <Container  maxWidth="md"  fluid sx={{paddingTop:"2em"}}  ><Box component="form"  sx={styles.root}>
        <Typography variant='h3' align='center' >{heading}</Typography>
            <Typography variant="h5" sx={{wordBreak:"break-all"}}>Address: {address}</Typography>
        {children}
    </Box></Container>
}    
export default RootContainer;