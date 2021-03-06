import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import { transactionContractService } from '../services'

export const Seller = ({
  wallet_address,
  services,
  description,
  work,
}) => {

  var images = []
  for (var i = 0; i < work.length; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    images.push(<div><CardMedia component="img" height="140" src={work[i]} /> <br/></div>);
}

  const [amount, setAmount] = useState("")
  const [rq, setRq] = useState("")
  const handleRequest = async () => {
    await transactionContractService.offer(rq, wallet_address, amount)
  }
  return (
    <Card className="m-2" sx={{ minWidth: 275 }}>
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
          Work: {work.length} previous work found!
        </Typography>
      
        {images}
        
      </CardContent>
      <CardActions>
        <textarea className="border-2 border-grey mr-1" rows="2" cols="40" placeholder="Request" value={rq} onChange={(event) => {setRq(event.target.value)}}></textarea>
        <textarea className="border-2 border-grey mr-1" rows="2" cols="10" placeholder="Amount $" value={amount} onChange={(event) => {setAmount(event.target.value)}}></textarea>
        <button className="bg-blue-500 text-white font-bold py-1 px-2 h-12 rounded" onClick={handleRequest}>Offer</button>
      </CardActions>
    </Card>
  )
}
