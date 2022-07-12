import { Button } from "@mui/material";

const ButtonComp=({text,onClick=()=>{}})=>{
 return <Button variant="contained" sx={{fontSize:"1.2rem"}} onClick={onClick}>{text}</Button>
}
export default ButtonComp;