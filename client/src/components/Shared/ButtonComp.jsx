import { Button } from "@mui/material";
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

const ButtonComp=({text,style="",greyBtn=false,color="primary",startIcon="",endIcon="", onClick=()=>{}})=>{
   return greyBtn?<ColorButton  sx={style && style} startIcon={startIcon && startIcon} endIcon={endIcon && endIcon} variant="contained" onClick={onClick}>{text}</ColorButton>:
                  <Button startIcon={startIcon && startIcon} color={color} variant="contained" sx={{fontSize:"1.2rem"}} onClick={onClick}>{text}</Button>
}
export default ButtonComp;