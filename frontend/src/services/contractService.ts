import { web3Store } from "../stores/web3Store"

class ContractService {

  getContract = (abi: any, address: string) => {
    const library = web3Store.instance
    return new library.eth.Contract(abi, address)
  }

  encodeParameters = (types: any, value: any): string => {
    const library = web3Store.instance
    return library.eth.abi.encodeParameters(types, value)
  }
}

export const contractService = new ContractService()
