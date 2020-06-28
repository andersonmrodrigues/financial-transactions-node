import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    if (!this.transactions) {
      throw Error('No transactions');
    }
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        return sum + transaction.value;
      }
      return sum;
    }, 0);

    const outcomeSum = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') {
        return sum + transaction.value;
      }
      return sum;
    }, 0);

    const balance: Balance = {
      income: incomeSum,
      outcome: outcomeSum,
      total: incomeSum - outcomeSum,
    };
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
