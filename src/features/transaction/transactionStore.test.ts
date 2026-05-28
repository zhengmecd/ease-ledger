import { describe, it, expect, beforeEach } from 'vitest';
import { 
  addTransaction, 
  getTransactions, 
  getBalance, 
  getTotalIncome, 
  getTotalExpense,
  clearTransactions 
} from './transactionStore';

describe('记账核心逻辑', () => {
  beforeEach(() => {
    clearTransactions();
  });

  it('添加支出后余额减少', () => {
    addTransaction(-50, '餐饮');
    expect(getBalance()).toBe(-50);
  });

  it('添加收入后余额增加', () => {
    addTransaction(200, '工资');
    expect(getBalance()).toBe(200);
  });

  it('多条交易余额累计正确', () => {
    addTransaction(-30, '交通');
    addTransaction(100, '红包');
    expect(getBalance()).toBe(70);
  });

  it('总收入计算正确', () => {
    addTransaction(-50, '餐饮');
    addTransaction(200, '工资');
    addTransaction(-20, '购物');
    expect(getTotalIncome()).toBe(200);
  });

  it('总支出计算正确', () => {
    addTransaction(-50, '餐饮');
    addTransaction(200, '工资');
    addTransaction(-20, '购物');
    expect(getTotalExpense()).toBe(-70);
  });

  it('获取所有交易记录', () => {
    addTransaction(-50, '餐饮');
    addTransaction(200, '工资');
    const transactions = getTransactions();
    expect(transactions).toHaveLength(2);
    expect(transactions[0].amount).toBe(200); // 最新的在前面
  });
});