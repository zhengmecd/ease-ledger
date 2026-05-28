import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { getBalance, getTotalIncome, getTotalExpense } from './features/transaction/transactionStore';
import { useState, useEffect } from 'react';

function App() {
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const refreshStats = () => {
  setBalance(getBalance());
  setTotalIncome(getTotalIncome());
  setTotalExpense(getTotalExpense());
};

useEffect(() => {
  refreshStats();
  
  const handleUpdate = () => {
    refreshStats();
  };
  
  window.addEventListener('transaction-updated', handleUpdate);
  return () => window.removeEventListener('transaction-updated', handleUpdate);
}, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>记账本</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', background: '#f5f5f5', margin: '0 20px', borderRadius: '10px' }}>
        <div>
          <div>总收入</div>
          <div style={{ color: 'green', fontSize: '20px' }}>+{totalIncome}</div>
        </div>
        <div>
          <div>总支出</div>
          <div style={{ color: 'red', fontSize: '20px' }}>{totalExpense}</div>
        </div>
        <div>
          <div>余额</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{balance}</div>
        </div>
      </div>
      
      <TransactionForm />
      <TransactionList />
    </div>
  );
  useEffect(() => {
  refreshStats();
  
  const handleUpdate = () => {
    refreshStats();
    // 强制刷新交易列表
    window.dispatchEvent(new Event('storage'));
  };
  
  window.addEventListener('transaction-updated', handleUpdate);
  return () => window.removeEventListener('transaction-updated', handleUpdate);
}, []);
}

export default App;