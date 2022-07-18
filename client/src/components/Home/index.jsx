import img from '../../assets/covid2.jpg';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ButtonComp } from '../Shared';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "../../css/index.css";
const styles={
    // root: {
    //     // backgroundImage: `url(${img})`,
    //     // backgroundSize: "cover",
    //     // opacity:0.1,
    //     // backgroundColor: "rgba(0,0,0,0.1)",
        
    //     position: "fixed",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     width: "100%",
    //     height: "100%",
    //     backgroundRepeat: "no-repeat",
    //     backgroundColor: 'transparent',
    //     display: "flex",
    //     justifyContent: "flex-start",
    //     alignItems: 'flex-start'
    // },
        head: {
            // color: "black",
            position:"relative",
            textAlign: "center",
            margin:"8em 4em 6em 7em",
            width:"450px",
            // maxWidth:"0%",
            minWidth:"30%",
            padding: "6em 2em",
            display:"flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: "rgba(240, 240, 240,0.6)",
            

        },
        sub:{
            fontWeight:"bold",
            fontSize:"2em"
        }
  }
const Home=()=>{
  const navigate=useNavigate();
  const BUTTONS=[
    {
     text:'Manufacturer',
     path:'/manufacturer'
    },
    {
      text:'Distributor',
      path:'/distributor'
     },
     {
      text:'Container',
      path:'/container'
     },
     {
      text:'Vaccine Center',
      path:'/vaccine_center'
     },
     {
      text:'Track Containers',
      path:'/track_container'
     }
]
  return  <Box className="root">
            <Box sx={styles.head}>
                <Typography  sx={{fontWeight:"bold",fontFamily:"Cabin, sans-serif", fontSize:"3rem"}} mb={3} >Welcome to <br />Vaccination Dapp</Typography>
                <Stack spacing={1} sx={{width:"60%", minWidth:"100%"}} direction="column">
                    {/* <Typography  sx={styles.sub}  >Continue as</Typography> */}
                    {BUTTONS.map((btn,index)=>{
                      return <ButtonComp key={index}
                                         endIcon={<ArrowForwardIcon sx={{ fontSize:"1em"}}/>}
                                         style={{width:"100%",
                                         justifyContent:"space-between"}}
                                         greyBtn onClick={()=>navigate(btn.path)} 
                                         text={btn.text}/>
                    })}
                    {/* <ButtonComp endIcon={<ArrowForwardIcon sx={{   fontSize:"1em"}}/>} style={{width:"100%",justifyContent:"space-between"}} greyBtn onClick={()=>navigate('/distributor')} text={"Distributor"}/>
                    <ButtonComp endIcon={<ArrowForwardIcon sx={{  fontSize:"1em"}}/>} greyBtn onClick={()=>navigate('/manufacturer')} text={"Container"}/>
                    <ButtonComp endIcon={<ArrowForwardIcon sx={{  fontSize:"1em"}}/>} greyBtn onClick={()=>navigate('/manufacturer')} text={"Vaccine Center"}/> */}



      {/* <BootstrapButton variant="contained" disableRipple>
        Bootstrap
      </BootstrapButton> */}
    </Stack>
            </Box>
            </Box>
}
export default Home;