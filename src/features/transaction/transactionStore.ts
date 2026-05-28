export interface Transaction {
  id: string;
  amount: number;  // 正数=收入，负数=支出
  category: string;
  note?: string;
  date: string;
}

let transactions: Transaction[] = [];

export function addTransaction(amount: number, category: string, note?: string): Transaction {
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    amount,
    category,
    note,
    date: new Date().toISOString().split('T')[0]
  };
  transactions = [newTransaction, ...transactions];
  return newTransaction;
}

export function getTransactions(): Transaction[] {
  return [...transactions];
}

export function getBalance(): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalIncome(): number {
  return transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpense(): number {
  return transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
}

export function clearTransactions(): void {
  transactions = [];
}