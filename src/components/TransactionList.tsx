import { useState, useEffect } from 'react';
import { getTransactions, Transaction } from '../features/transaction/transactionStore';

export function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const refresh = () => {
    setTransactions([...getTransactions()]);
  };

  useEffect(() => {
    refresh();
    
    const handleUpdate = () => {
      refresh();
    };
    
    window.addEventListener('transaction-updated', handleUpdate);
    return () => window.removeEventListener('transaction-updated', handleUpdate);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h3>交易记录</h3>
      {transactions.length === 0 ? (
        <p>暂无记录</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {transactions.map(t => (
            <li key={t.id} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.category}</span>
              <span style={{ color: t.amount > 0 ? 'green' : 'red' }}>
                {t.amount > 0 ? `+${t.amount}` : t.amount}
              </span>
              <span style={{ fontSize: '12px', color: '#999' }}>{t.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}