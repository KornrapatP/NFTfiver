import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { web3Store } from '../stores/web3Store'
import { ActiveDeals } from './ActiveDeals'
import { ArtistList } from './ArtistList'
import { EditProfile } from './EditProfile'
import { useWeb3React } from "@web3-react/core"
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
  `
export const Buy = (props) => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  return (
    <div
      style={{
        display: 'flex',
        height: 1000,
        flexDirection: 'row',
      }}
    >
      {active ?
        <>
          <div style={{ height: '100%', backgroundColor: 'white', flex:1  }}>
              <ArtistList></ArtistList>
          </div>
          <div style={{ height: '100%', backgroundColor: 'green', flex:1 }}>
              <ActiveDeals isBuyer = {true}></ActiveDeals>
          </div>
       </>
        :
        <div style={{width:"100%"}}>
          <br></br>
          <center>         
          <h2> Please register your crpyto wallet with MetaMask.</h2>
          </center>
        </div>
      }
    </div>
  )
}



