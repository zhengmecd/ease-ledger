import { useState } from 'react';
import { addTransaction } from '../features/transaction/transactionStore';
window.dispatchEvent(new Event('transaction-updated'));
export function TransactionForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('餐饮');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount) || numAmount === 0) return;
  
  const finalAmount = type === 'expense' ? -Math.abs(numAmount) : Math.abs(numAmount);
  addTransaction(finalAmount, category);
  
  // 清空表单
  setAmount('');
  
  // 触发自定义事件，通知其他组件刷新
  window.dispatchEvent(new CustomEvent('transaction-updated'));
  
  // 去掉这行：window.location.reload();
};

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
      <div style={{ marginBottom: '10px' }}>
        <button 
          type="button" 
          onClick={() => setType('expense')}
          style={{ background: type === 'expense' ? '#ff4444' : '#eee', color: type === 'expense' ? 'white' : 'black' }}
        >
          支出
        </button>
        <button 
          type="button" 
          onClick={() => setType('income')}
          style={{ background: type === 'income' ? '#44ff44' : '#eee', marginLeft: '10px' }}
        >
          收入
        </button>
      </div>
      
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="金额"
        style={{ padding: '8px', marginRight: '10px' }}
      />
      
      <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '8px', marginRight: '10px' }}>
        <option>餐饮</option>
        <option>交通</option>
        <option>购物</option>
        <option>娱乐</option>
        <option>工资</option>
        <option>其他</option>
      </select>
      
      <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none' }}>
        添加
      </button>
    </form>
  );
}