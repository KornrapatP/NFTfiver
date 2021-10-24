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
          <ActiveDeals></ActiveDeals>
      </div>
    </div>
  )
}
