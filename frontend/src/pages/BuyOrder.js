import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { transactionContractService } from '../services'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'


export const BuyOrder = () => {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
  } = useWeb3React()
  const params = useParams()
  const [details, setDetails] = useState(null)
  const [newOffer, setNewOffer] = useState(0)
  useEffect(() => {
    async function setDeals() {
      const d = await transactionContractService.getActiveDeals(
        account,
        params.seller,
      )
      setDetails(d)
    }
    setDeals()
  }, [account])

  const handleNewOffer = async () => {
    await transactionContractService.newOffer(params.seller, newOffer)
  }
  const handleAcceptCounterOffer = async () => {
    await transactionContractService.acceptCounterOffer(params.seller)
  }
  const handleAcceptWork = async () => {
    await transactionContractService.acceptWork(params.seller)
  }
  const handleRejectWork = async () => {
    await transactionContractService.rejectWork(params.seller)
  }

  return (
    <div
      style={{
        display: 'flex',
        height: 666,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {details && (
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: 10,
            flexDirection: 'row',
          }}
        >
          <Card sx={{ minWidth: 275 }}>
            <CardContent style={{ flex: 1 }}>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                buyer: {account}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                seller: {params.seller}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                description: {details.description}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                current offer: {details.amountETH} wei
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                buyerAccepted: {details.buyerAccepted ? 'TRUE' : 'FALSE'}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                sellerAccepted: {details.sellerAccepted ? 'TRUE' : 'FALSE'}
              </Typography>
              <div style={{ flexDirection: 'row', width: '100%', height: 100 }}>
                <input type="number" value={newOffer} onChange={(event) => {setNewOffer(event.target.value)}}></input>
                <button onClick={handleNewOffer}>New Offer</button>
                <button onClick={handleAcceptCounterOffer}>Accept Counter Offer</button>
                <button onClick={handleAcceptWork}>Accept Work</button>
                <button onClick={handleRejectWork}>Reject Work</button>
              </div>
              <CardMedia
                component="img"
                height={50}
                src="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
