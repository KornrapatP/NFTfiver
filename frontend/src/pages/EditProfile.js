import { Input, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from "@web3-react/core"
import { transactionContractService } from '../services';
import {File} from 'nft.storage'
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
  const [valueChanged, setValueChanged] = useState(false)
  const [file, setFile] = useState(null)
  useEffect(() => {
    console.log("Loaded")
    const getInfo = () => {
      fetch("http://127.0.0.1:8000/seller/getInfo?wallet_address=" + account)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setServices(data.services)
          setDescription(data.description)
          setValueChanged(false)
        })
        .catch(error => console.log);
    }
    getInfo()

  }, [active, account])

  const handleChangeServices = (event) => {
    setServices(event.target.value)
    setValueChanged(true)
  }
  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
    setValueChanged(true)
  }
  const handleSetInfo = (event) => {
    setValueChanged(false)
    const setInfo = () => {
      fetch("http://127.0.0.1:8000/seller/setInfo?wallet_address=" + account + "&services=" + services + "&description=" + description)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setServices(data.services)
          setDescription(data.description)
          setValueChanged(false)
        })
        .catch(error => console.log);
    }
    setInfo()
  }

  const handleChangeFile = async (event) => {
    setFile(event.target.value)
    const files = Array.from(event.target.files)
    console.log(files)
    console.log('In here')
    console.log()
    if (file) {  
      console.log(file)    
      console.log(await transactionContractService.addImage({
        name : "adasd",
        description : "sfsfgsdf",
        image : files[0],
        type : "image/jpg"
      }))

    }
  }

  return (
    <div>
      <h2>Edit Page</h2> <br />
      <p> Crypto Wallet Address : {account} </p>
      Services offered :
      <input value={services} onChange={handleChangeServices}></input><br /><br />
      Description :
      <textarea value={description} onChange={handleChangeDescription}></textarea><br />
      <button className="disabled:opacity-50" onClick={handleSetInfo} > {valueChanged ? "Submit" : ""} </button><br/>
      <img src="https://ipfs.io/ipfs/bafybeibbmxfn4uggk4zcyhmph3eqrqmsrponsarsw5g2o7d6dcrzkyjtfm/itachi3.jpg"></img> <br/>
      <input type="file" onChange={handleChangeFile}></input>
    </div>
  )
}