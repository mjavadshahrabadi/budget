export interface ITransactionRow {
    transactionId: string;
    type: string;
    creditCartNumber: string;
    date: string;
    amount: number;
    description: string;
    actions: boolean;
}
