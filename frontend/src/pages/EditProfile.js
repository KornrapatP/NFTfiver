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

  return (
    <div>
      <h2>Edit Page</h2> <br />
      <p> Crypto Wallet Address: {account} </p>
      <span className="pr-2">Services offered: </span>
      <input value={services} className="text-black" onChange={handleChangeServices}></input><br /><br />
      <span className="pr-2">Description: </span>
      <textarea value={description} className="text-black" onChange={handleChangeDescription}></textarea><br />
      <div className="mt-4">
        {valueChanged ? <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleSetInfo}>Search</button> : <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" disabled>Search</button>}
      </div>
    </div>
  )
}