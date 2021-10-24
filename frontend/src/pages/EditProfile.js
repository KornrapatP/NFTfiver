import { Input, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from "@web3-react/core"
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
export const EditProfile = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  
  useEffect(() => {
    console.log("Loaded")
    const getInfo = () => {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet_address: account })
      };
      fetch("http://127.0.0.1:8000/seller/getInfo?wallet_address=chris")
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log);
    }
    getInfo()

  }, [active, account])

  const [a, setA] = useState('a')
  const handleChange = (event) => {
    setA(event.target.value)
  }
  return (
    <GridWrapper>
      <h2>Edit {account} Page</h2>
      <p>State at ceiling lay on arms while you're using the keyboard so this human feeds me.</p>
      <p>I am a kitty cat, sup, feed me, no cares in the world</p>
      <p>Meow meow, I tell my human purr for no reason but to chase after</p>
      <TextField value={a} onChange={handleChange}></TextField>
    </GridWrapper>
  )
}