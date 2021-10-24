import { Input, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from "@web3-react/core"
import { Seller } from './Seller'

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
export const SearchSellers = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])
  const [valueChanged, setValueChanged] = useState(false)
  const [clickSearch, setClickSearch] = useState(false)
  const [count, setCount] = useState(result.length)

  const handleSetInfo = (event) => {
    setValueChanged(false)
    setClickSearch(true)
    const setInfo = () => {
      fetch("http://127.0.0.1:8000/seller/searchForSellers?query=" + search)
        .then(response => response.json())
        .then(data => {
          console.log(data.result)
          setResult(data.result)
          setCount(data.result.length)
        })
        .catch(error => console.log);
    }
    setInfo()
  }

  const handleChangeSearch = (event) => {
    setSearch(event.target.value)
    setValueChanged(true)
  }

  return (
    <div>
      <h2>Search</h2>
      <textarea className="border-2 border-black" rows="1" cols="50" placeholder="Terms: eg icon" value={search} onChange={handleChangeSearch}></textarea><br />
      <>
        {valueChanged ? <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleSetInfo}>Search</button> : <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" onClick={handleSetInfo}>Search</button>}
      </>
      {clickSearch ? <><h2>Found {count} results</h2>{result.map(function(d, idx){return <Seller wallet_address={d.wallet_address} services={d.services} description = {d.description} work={d.work}/>})}</> : null}
    </div>
  )
}