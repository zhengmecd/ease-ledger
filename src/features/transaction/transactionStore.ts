export interface Transaction {
  id: string;
  amount: number;
  category: string;
  note?: string;
  date: string;
}

// 从 localStorage 加载数据
function loadTransactions(): Transaction[] {
  const stored = localStorage.getItem('transactions');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

// 保存数据到 localStorage
function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 初始化内存数据
let transactions: Transaction[] = loadTransactions();

export function addTransaction(amount: number, category: string, note?: string): Transaction {
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    amount,
    category,
    note,
    date: new Date().toISOString().split('T')[0]
  };
  transactions = [newTransaction, ...transactions];
  saveTransactions(transactions);
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
  saveTransactions(transactions);
}

export function deleteTransaction(id: string): void {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions(transactions);
}