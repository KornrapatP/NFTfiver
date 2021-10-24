import { React } from 'react'
import { Grid } from '@material-ui/core'
import { ArtistList } from './ArtistList'
import { ActiveDeals } from './ActiveDeals'
export const Buy = (props) => {
  return (
    <div
      style={{ display: 'flex', height: 1000, backgroundColor: 'red', flexDirection: 'row' }}
    >
      <div style={{ height: '100%', backgroundColor: 'white', flex:1  }}>
          <ArtistList></ArtistList>
      </div>
      <div style={{ height: '100%', backgroundColor: 'green', flex:1 }}>
          <ActiveDeals isBuyer={true}></ActiveDeals>
      </div>
    </div>
  )
  return (
    <div
      style={{ display: 'flex', height: 1000, backgroundColor: 'red', flexDirection: 'row' }}
    >
      {active ?
        <>
          <div style={{ height: '100%', backgroundColor: 'white', flex:1  }}>
              <ArtistList></ArtistList>
          </div>
          <div style={{ height: '100%', backgroundColor: 'green', flex:1 }}>
              <ActiveDeals></ActiveDeals>
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
