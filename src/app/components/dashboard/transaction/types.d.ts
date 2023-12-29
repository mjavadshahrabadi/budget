export interface ITransactionRow {
    id: string;
    type: string;
    cartId: string;
    date: string;
    amount: number;
    description: string;
    actions: boolean;
    createdAt: string;
    updatedAt: string;
}
