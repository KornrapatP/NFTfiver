import BigNumber from 'bignumber.js'

import { contractService } from './contractService'
import { transactionService } from './transactionService'

import ERC20 from '../data/contracts/ERC20.json'


import { MAX_UINT256 } from '../constants/constants'
import { web3Store } from '../stores/web3Store'

class Erc20Service {
  getBalance = async (token: string, address: string) => {
    if (!address) return new BigNumber(0)
    const erc20 = contractService.getContract(ERC20.abi, token)

    const balance = await erc20.methods.balanceOf(address).call()

    return new BigNumber(balance)
  }

  getAllowance = async (token: string, owner: string, spender: string) => {
    if (!owner) {
      return new BigNumber(0)
    }
    const erc20 = contractService.getContract(ERC20.abi, token)

    const allowance = await erc20.methods.allowance(owner, spender).call()

    return new BigNumber(allowance)
  }

  getDecimals = async (token: string) => {
    const erc20 = contractService.getContract(ERC20.abi, token)

    const decimals = await erc20.methods.decimals().call()

    return parseInt(decimals)
  }

  approve = async (token: string, spender: string) => {
    const erc20 = contractService.getContract(ERC20.abi, token)

    return await transactionService.sendTx(
      erc20.methods.approve(spender, MAX_UINT256),
      web3Store.account,
      0
    )
  }

  getTotalSupply = async (token: string): Promise<{ totalSupply: BigNumber; decimals: string }> => {
    const erc20 = contractService.getContract(ERC20.abi, token)
    const [totalSupply, decimals] = await Promise.all([
      erc20.methods.totalSupply().call(),
      erc20.methods.decimals().call(),
    ])

    return { totalSupply: new BigNumber(totalSupply), decimals }
  }
}

export const erc20Service = new Erc20Service()
