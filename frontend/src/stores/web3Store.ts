import Web3 from 'web3'
import { makeAutoObservable } from 'mobx'

export class Web3Store {
  active: boolean
  instance: Web3
  account: string

  constructor() {
    this.active = false
    this.instance = null as any
    this.account = "" as string
    makeAutoObservable(this)
  }

  setInstance = (instance: Web3) => {
    this.instance = instance
  }

  setActive = (value: boolean) => {
    this.active = value
  }

  setAccount = (address: string) => {
    this.account = address
  }

  get status() {
    return {
      active: this.active,
    }
  }
}

export const web3Store = new Web3Store()
