import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useHistory } from 'react-router-dom'
import CardMedia from '@mui/material/CardMedia'
import { web3Store } from '../stores/web3Store'

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
  const history = useHistory()

  function handleClick() {
    if (buyer == web3Store.account) {
        history.push('/buy/' + seller)
    } else {
        history.push('/sell/' + buyer)
    }
  }
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
