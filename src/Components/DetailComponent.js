import React from 'react';
import TypographyComponent from './Typography';
import BoxComponent from './Box';

export default function DetailComponent(props) {
  return (
    <BoxComponent>
      <TypographyComponent
      fontSize='20px'
      fontWeight='600'
      color='var(--primary)'
      fontFamily='var(--main)'
      >{props.title}</TypographyComponent>
      <TypographyComponent
      fontSize='18px'
      fontWeight='400'
      color='var(--paragraph)'
      fontFamily='var(--main)'
      >{props.details}</TypographyComponent>
    </BoxComponent>
  );
}