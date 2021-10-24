# NFTfiver

## Welcome to our CalHacks project!
Guide to trying it out for yourself! 
1) Make sure you have all the dependencies and requirements installed. 
2) Open terminal and cd to NFTfiver/FreelanceNFTs/ Use `python manage.py runserver` to launch Django Server. Alternatively, deploy this server in Azure or your preferred choice of cloud backend computing solution.
3) Open terminal and cd to NFTfiver/frontend/ Use yarn to install dependencies, and run `yarn start` to start the frontend server.
4) Download the MetaMask extension on Chrome
5) Connect your addresses and use it to connect on the frontend.
6) Once that is done, you're fully authorized to buy and sell artworks and NFTs on our platform!
7) Feel free to refer to our youtube video to see our demo!

## Technical Description
This project is made up of 3 main parts: the frontend located in the 'frontend' folder, backend in the 'FreelanceNFTs' folder, and the smart contracts in the 'contracts' folder. 

The frontend is made using the React framework along with styling tools such as tailwindcss and materialUI. Main pages of the frontend are located in the 'erc/pages' folder, smaller components in 'src/view', web-wide data in 'src/stores', contract interface using web3 in 'services', and relevant constants in 'src/constants'.

The backend is written in Django as a REST API for the frontend. The Django project can be found in the folder 'FreelanceNFTs' and the webapp corresponding to thee logic is called 'negotiate'. The backend aims to allow the sellers to reference their past work and allows the buyers to discover various sellers on the platform. But we wanted the main logic of the system to stay decentralised and run on the blockchain, so the backend does not store any of the actual files or communication between buyers and sellers. That is all handled by smart contracts.

The smart contract is written in solidity using remix and is deployed on Kovan test net. The addresses can be found in the frontend constants. There are 2 contracts that were deployed. The first is NFTMetadataMintable modified from openzepplin used in minting NFT with metadata. The transaction contract is used in price negotiation between buyers and sellers and trustless transaction of the agreed on value and the NFT. Security checks are done the contract level and not frontend-backend level. The reason behind using remix as opposed to brownie or hardhat is due to the small size of the contracts.

## Running the demo
- clone this repository
- `yarn`
- `yarn start`

make sure you are running on node version 12 `nvm use 12`
