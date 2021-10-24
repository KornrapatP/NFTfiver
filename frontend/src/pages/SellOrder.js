import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { transactionContractService } from '../services'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

export const SellOrder = () => {
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
  const [file, setFile] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [counterOffer, setCounterOffer] = useState(0)
  useEffect(() => {
    async function setDeals() {
      const d = await transactionContractService.getActiveDeals(
        params.buyer,
        account,
      )
      setDetails(d)
    }
    setDeals()
  }, [account])

  const handleSubmitWork = async () => {
    if (file) {
      let response = await transactionContractService.addImage({
        name: file.name,
        description: file.name,
        image: file,
        type: file.type
      })
      // response = response.replace("metadata.json", file.name)
      response = response.replace("ipfs://", "https://ipfs.io/ipfs/")
      console.log("debug : " + response)      

      const getImageURLFromBlockchain = () => {
        fetch(response)
          .then(response => response.json())
          .then(data => {
            let URL = data.image
            URL = URL.replace("ipfs://", "https://ipfs.io/ipfs/")            
            setImageURL(URL)
          })
          .catch(error => console.log);
      }
      getImageURLFromBlockchain()
      
      // const registerWork = async () => {
      //   fetch(imageURL)
      //     .then(resp => resp.json())
      //     .then(data => {
      //       console.log(data)
      //       console.log("Called?")
      //     })
      //     .catch(error => console.log);
      // }
      // registerWork()
    }
  }

  useEffect(() => {
    if (imageURL) {
      const registerWork = async () => {
        fetch(imageURL)
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
            console.log("Called?")
          })
          .catch(error => console.log);
      }
      registerWork()

      const submitWork = async () => {
        await transactionContractService.submitWork(params.buyer, imageURL)
      }
      submitWork()
    }
  }, [imageURL])
  console.log(details)
  const handleCounterOrder = async () => {
    await transactionContractService.counterOffer(params.buyer, counterOffer)
  }

  const handleAcceptOffer = async () => {
      await transactionContractService.acceptOffer(params.buyer)
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
                buyer: {params.buyer}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                seller: {account}
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
                <input type="number" value={counterOffer} onChange={(event) => {setCounterOffer(event.target.value)}}></input>
                <button onClick={handleCounterOrder}>Counter Offer</button><br />
                <button onClick={handleAcceptOffer}>Accept Offer</button><br />
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleSubmitWork}> Submit Work to blockchain!</button>
                
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
