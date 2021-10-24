import BigNumber from 'bignumber.js'

import { NFTStorage, File } from 'nft.storage'

import { contractService } from './contractService'
import { transactionService } from './transactionService'

import Transaction from '../data/contracts/Transaction.json'

import { MAX_UINT256, TransactionContractAddress } from '../constants/constants'
import { web3Store } from '../stores/web3Store'


const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDNEMjc2NDM5YzY0ZTkwQjQ4M0MwOWU4MjkzOTlCMTcyZTRDN0IwNTYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNTA0NDI2MTc3NCwibmFtZSI6Imtvcm5zX2tleSJ9.B4aIjOdKsCtUvBrSsWRl4GD4Ki4jwoXukOP8_tKtbJU'
const client = new NFTStorage({ token: apiKey })

class TransactionContractService {
    getDealPartners = async (address: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        const retVal:any[] = []
        for (let i = 0; i < 3; i++) {
            try {
                console.log(i)
                retVal.push(await transaction.methods.activeDeals(address,i).call())
            } catch (e) {
                return retVal
            }
        }
    }

    getActiveDeals = async (buyer: string, seller: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        const retVal = await transaction.methods.dealList(buyer, seller).call()
        return retVal
    }

    offer = async (description: string, seller: string, amountETH: number) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.offer(description, seller, amountETH), web3Store.account, 0)
    }

    counterOffer = async (buyer: string, amountETH: number) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.counterOffer(buyer, amountETH), web3Store.account, 0)
    }

    newOffer = async (seller: string, amountETH: number) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.newOffer(seller, amountETH), web3Store.account, 0)
    }

    acceptOffer = async (buyer: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.acceptOffer(buyer), web3Store.account, 0)
    }

    acceptCounterOffer = async (seller: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.acceptCounterOffer(seller), web3Store.account, 0)
    }

    submitWork = async (buyer: string, uri: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.submitWork(buyer, uri), web3Store.account, 0)
    }

    acceptWork = async (seller: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        const { amountETH } = await this.getActiveDeals(web3Store.account, seller)
        await transactionService.sendTx(transaction.methods.acceptWork(seller), web3Store.account, amountETH)
    }

    rejectWork = async (seller: string) => {
        const transaction = contractService.getContract(Transaction, TransactionContractAddress)
        await transactionService.sendTx(transaction.methods.rejectWork(seller), web3Store.account, 0)
    }

    addImage = async (image: any) => {
        const metadata = await client.store(image)
        return metadata.url
    }
}

export const transactionContractService = new TransactionContractService()
