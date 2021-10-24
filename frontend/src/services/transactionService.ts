class TransactionService {
  sendTx = async (tx: any, from: any, value: any) => {
    const sentTx = tx.send({ from, value })
    const txHash = (await new Promise((resolve) =>
      sentTx.on('transactionHash', (txHash: any) => {
        resolve(txHash)
      }),
    )) as string
    return txHash
  }
}

export const transactionService = new TransactionService()
