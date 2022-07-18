import * as React from 'react';
import { Container } from '@mui/system';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const steps = ['Not Ready','Ready for delivery','On Track','Delivery Ended','Received','Violated'];
const CustomStepper = styled(Step)(() => ({
    "& .MuiStepLabel-label, & .MuiStepIcon-text":{
        fontSize: "1.2rem",

    }
    
  }));
export default function HorizontalStepperWithError({step}) {
console.log(step,"setp")
  const isStepFailed = (ind) => {
    if(step === 5 && ind==5)
    return true
    return false
  };

  return (
    <Container maxWidth="md" fluid mt="4em"  >
      <Stepper  activeStep={step}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Violation
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <CustomStepper  key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </CustomStepper>
          );
        })}
      </Stepper>
    </Container>
  );
}
