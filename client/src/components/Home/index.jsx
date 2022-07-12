import img from '../../assets/covid2.jpg';
import { Box, Stack,Button, Typography } from '@mui/material';
import {  blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

  const ColorButton = styled(Button)(({ theme }) => ({
    color: blueGrey[100],
    backgroundColor: blueGrey[900],
    fontSize: "1.15rem",
    '&:hover': {
      backgroundColor: blueGrey[800],
    },
  }));
const styles={
    root: {
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        // backgroundColor: "rgba(0,0,0,0.1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: 'transparent',
        display: "flex", justifyContent: "flex-start", alignItems: 'flex-start'
    },
        head: {
            color: "black",
            textAlign: "center",
            margin:"6em 4em 6em 4em",
            padding: "6em",
            backgroundColor: "rgba(240, 240, 240,0.5)"

        },
        sub:{
            fontWeight:"bold",
            fontSize:"1em"
        }
  }
const Home=()=>{

  return  <Box sx={styles.root}>
            <Box sx={styles.head}>
                <Typography variant="h3" mb={2} >Welcome to <br />Vaccination Dapp</Typography>
                <Stack spacing={1} direction="column">
                    <Typography variant='button' sx={styles.sub}  >Continue as</Typography>
                 <ColorButton variant="contained">Manufacturer</ColorButton>
                 <ColorButton variant="contained">Distributor</ColorButton>
                 <ColorButton variant="contained">Container</ColorButton>
                 <ColorButton variant="contained">Vaccine Center</ColorButton>


      {/* <BootstrapButton variant="contained" disableRipple>
        Bootstrap
      </BootstrapButton> */}
    </Stack>
            </Box>
            </Box>
}
export default Home;