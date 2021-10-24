import React from 'react';
import styled from 'styled-components';


export const Artwork = ({buyer, seller, description, amountETH, buyerAccepted, sellerAccepted, uri}) => {
    console.log(buyer)
  return (
  <div style={{height: "30%", width: "33%", backgroundColor: "white", borderColor:"black"}}>
      <p>buyer: {buyer}</p>
      <p>seller: {seller}</p>
      <p>description: {description}</p>
      <p>current offer: {amountETH} wei</p>
      <p>buyerAccepted: {buyerAccepted ? 'TRUE' : 'FALSE'}</p>
      <p>sellerAccepted: {sellerAccepted ? 'TRUE' : "FALSE"}</p>
      {uri && <image src={uri}></image>}
  </div>
)
}