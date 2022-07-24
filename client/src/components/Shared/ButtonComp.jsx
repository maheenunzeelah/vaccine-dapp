import { Button } from "@mui/material";
import {  blueGrey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { CircularProgress } from "@mui/material";
const ColorButton = styled(Button)(({ theme }) => ({
    color: blueGrey[100],
    backgroundColor: blueGrey[900],
    fontSize: "1.15rem",
    '&:hover': {
      backgroundColor: blueGrey[800],
    },
  }));

const ButtonComp=({text,style="",greyBtn=false,color="primary",startIcon="",endIcon="", onClick=()=>{},...props})=>{
   return greyBtn?<><ColorButton {...props} sx={style && style} startIcon={startIcon && startIcon} endIcon={endIcon && endIcon} variant="contained" onClick={onClick}>{text}</ColorButton>
           {props.loader && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
</>
   :
              <> <Button  {...props} startIcon={startIcon && startIcon} color={color} variant="contained" sx={{fontSize:"1.2rem"}} onClick={onClick}>{text}</Button>
                {props.loader && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
</>
}
export default ButtonComp;