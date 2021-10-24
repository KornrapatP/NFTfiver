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

export const Seller = ({
  wallet_address,
  services,
  description,
  work,
}) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Wallet Address: {wallet_address}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Services: {services}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Description: {description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Work: {work}
        </Typography>
        <CardMedia
          component="img"
          height="140"
          src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"
        />
      </CardContent>
      <CardActions>
        <textarea className="border-2 border-grey" rows="3" cols="10" placeholder="Request"></textarea><button className="bg-blue-500 text-white font-bold py-1 px-2 rounded">Search</button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}
