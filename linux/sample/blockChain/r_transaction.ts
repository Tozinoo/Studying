/**
 * r_transaction.ts
 * @module SpiderCoin
 */

/**
 * Transaction Input
 */
interface TxIn {
    txOutId: string;
    txOutIndex: number;
    signature: string;
}
/**
 * Transaction Output
 */
class TxOut {
    public address: string;
    public amount: number;

    constructor(address: string, amount: number) {
        this.address = address;
        this.amount = amount;
    }
}
/**
 * Transaction
 */
interface Transaction {
    id: number;
    txIns: TxIn[];
    txOuts: TxOut[];
}

/**
 *
 * @param tx Transaction
 */
const getTransactionId = (tx: Transaction): string => {
    const txInContent: string = tx.txIns
        .map((txIn: TxIn) => txIn.txOutId + txIn.txOutIndex)
        .reduce((a, b) => a + b, "");
    const txOutContent: string = tx.txOuts
        .map((txOut: TxOut) => txOut.address + txOut.amount)
        .reduce((a, b) => a + b, "");
    const id: string = txInContent + txOutContent;
    return id;
};

const generateTransaction = (): Transaction[] => {
    const txIns: any[] = [];
    const txOuts: any[] = [];
    const tx: Transaction[] = [];

    for (let i = 0; i < 5; i++) {
        const txInId: string = "Id: " + i;
        const txInIndex: number = i;
        txIns.push({ txOutId: txInId, txOutIndex: txInIndex });

        const txOutAddress: string = "address: " + i;
        const txOutAmount: number = 30;
        txOuts.push({ address: txOutAddress, amount: txOutAmount });

        const txtx: Transaction = {
            id: i,
            txIns: txIns[i],
            txOuts: txOuts[i],
        };
        tx.push(txtx);
    }
    return tx;
};

const tx: Transaction[] = generateTransaction();
for (let i = 0; i < tx.length; i++) {
    console.log(getTransactionId(tx[i]));
}

// const txOut1: TxOut = new TxOut("TxOut:0101", 10);
// const txIn1: TxIn = {
//     txOutId: "TxIn,TxOutId:1010",
//     txOutIndex: 1,
//     signature: "",
// };

// const tx: Transaction = {
//     id: 1,
//     txIns: [txIn1],
//     txOuts: [txOut1],
// };

// console.log(getTransactionId(tx));
