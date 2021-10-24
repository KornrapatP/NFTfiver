# NFTfiver

## Welcome to our CalHacks project!
add description

## Technical Description
This project is made up of 3 main parts: the frontend located in the 'frontend' folder, backend in the 'FreelanceNFTs' folder, and the smart contracts in the 'contracts' folder. 

The frontend is made using the React framework along with styling tools such as tailwindcss and materialUI. Main pages of the frontend is located in the 'erc/pages' folder, smaller components in 'src/view', web-wide data in 'src/stores', contract interface using web3 in 'services', and relevant constants in 'src/constants'.

The backend.........

The smart contract is written in solidity using remix and is deployed on Kovan test net. The addresses can be found in the frontend constants. There are 2 contracts that were deployed. The first is NFTMetadataMintable modified from openzepplin used in minting NFT with metadata. The transaction contract is used in price negotiation between buyers and sellers and trustless transaction of the agreed on value and the NFT. Security checks are done the contract level and not frontend-backend level. The reason behind using remix as opposed to brownie or hardhat is due to the small size of the contracts.

## Running the demo
- clone this repository
- `yarn`
- `yarn start`

make sure you are running on node version 12 `nvm use 12`
