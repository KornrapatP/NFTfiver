// import React from 'react'
// import styled from 'styled-components'

// export const Artwork = ({
//   buyer,
//   seller,
//   description,
//   amountETH,
//   buyerAccepted,
//   sellerAccepted,
//   uri,
// }) => {
//   console.log(buyer)
//   return (
//     <div
//       style={{
//         height: '30%',
//         width: '33%',
//         backgroundColor: 'white',
//         borderColor: 'black',
//       }}
//     >
//       <p>buyer: {buyer}</p>
//       <p>seller: {seller}</p>
//       <p>description: {description}</p>
//       <p>current offer: {amountETH} wei</p>
//       <p>buyerAccepted: {buyerAccepted ? 'TRUE' : 'FALSE'}</p>
//       <p>sellerAccepted: {sellerAccepted ? 'TRUE' : 'FALSE'}</p>
//       {uri && <image src={uri}></image>}
//     </div>
//   )
// }

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)

export const Artwork = ({
      buyer,
      seller,
      description,
      amountETH,
      buyerAccepted,
      sellerAccepted,
      uri,
    }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            buyer: {buyer}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        seller: {seller}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        description: {description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        current offer: {amountETH} wei
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        buyerAccepted: {buyerAccepted ? 'TRUE' : 'FALSE'}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        sellerAccepted: {sellerAccepted ? 'TRUE' : 'FALSE'}
        </Typography>
        <CardMedia
        component="img"
        height="140"
        src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"
      />
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
