import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { erc20Service, transactionService } from '../services'
import { web3Store } from '../stores/web3Store'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { transactionContractService } from '../services'
import { useWeb3React } from '@web3-react/core'
import { Artwork } from '../views/Artwork'
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`
export const ActiveDeals = ({isBuyer}) => {
  const [dealPartners, setDealPartners] = useState([])
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [dealList, setDealList] = useState([])

  useEffect(() => {
    if (active) {
      async function setPartners() {
        setDealPartners(await transactionContractService.getDealPartners(account))
      }
      setPartners()
    }
  }, [active, account])

  useEffect(() => {
    async function setDeals() {
      const d = await Promise.all(dealPartners.map(async (x) => {
        if (isBuyer) {
          return await transactionContractService.getActiveDeals(account, x)
        } else {
          return await transactionContractService.getActiveDeals(x, account)
        }
      }))


      setDealList(d)
    }
    setDeals()
  }, [dealPartners])

  return (
    <GridWrapper>
      {dealList.map(function(d, idx){
        if (d.description != "") {
          console.log(dealPartners[idx])
          return (<Artwork buyer={isBuyer ? account : dealPartners[idx]} seller={isBuyer ? dealPartners[idx] : account} amountETH = {d.amountETH} description = {d.description} buyerAccepted = {d.buyerAccepted} sellerAccepted = {d.sellerAccepted} uri = {d.uri}/>)
        }
        console.log(dealPartners[idx])
        return null
       })}
    </GridWrapper>
  )
}
