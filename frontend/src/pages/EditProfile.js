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
  const [services, setServices] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    console.log("Loaded")
    const getInfo = () => {      
      fetch("http://127.0.0.1:8000/seller/getInfo?wallet_address="+"chris")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setServices(data.services)
          setDescription(data.description)
        })
        .catch(error => console.log);
    }
    getInfo()

  }, [active, account])

  const [a, setA] = useState('a')
  const handleChangeServices = (event) => {
    setServices(event.target.value)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  return (
    <div>
      <h2>Edit Page</h2> <br/>
      <p> Crypto Wallet Address : {account} </p> <br/>
      Services offered :    
      <input value={services} onChange={handleChangeServices}></input><br/>
      Description :       
      <input value={description} onChange={handleChangeDescription}></input><br/>
    </div>
  )
}