import React from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import {erc20Service}  from '../services';
import { web3Store } from '../stores/web3Store';
import useWindowDimensions from '../hooks/useWindowDimensions';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`; 
export const ArtistList = () => {
  const dimensions = useWindowDimensions()
  const handleClick = async () => {
    console.log(web3Store.account)
    await erc20Service.approve("0xd33dAF998318647F17fbcdB302f69e6159857bfe", web3Store.account)
  }
  return (<GridWrapper>
    <Button onClick={() => handleClick()}>ArtistList Page</Button>
  </GridWrapper>
)
}