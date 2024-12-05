import React from "react";
import BoxComponent from "./Box";
import TypographyComponent from "./Typography";
import InputComponent from "./InputComponent";
import ImageComponent from "./ImageComponent";
import ButtonComponent from "./Button";
import { useLocation } from 'react-router-dom';

export default function LocationForm() {
  const location = useLocation();
  const title = location.state?.title || 'Add Location';

  return (
    <BoxComponent
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        backgroundImage: `url('Images/bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <BoxComponent
        margin="50px"
        padding="30px 15px"
        borderRadius='10px'
        width="40%"
        gap='10px'
        // height="135vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        backgroundColor='var(--light)'
        // boxShadow='1px 1px 1px 1px var(--dull)'
      >
        <TypographyComponent
          fontSize="40px"
          color="var(--dull)"
          fontFamily="var(--main)"
          fontWeight="600"
          marginBottom='20px'
        >
          {title}
        </TypographyComponent>
        <BoxComponent width='90%'>
        <InputComponent variant="outlined" label="Name" /></BoxComponent>
        <ImageComponent />
        <ButtonComponent
          variant="contained"
          backgroundColor="var(--primary)"
          sx={{
            width: "90%",
            padding: "10px",
          }}
        >
          Submit
        </ButtonComponent>
      </BoxComponent>
    </BoxComponent>
  );
}