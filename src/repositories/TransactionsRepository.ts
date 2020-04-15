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
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        return transaction.value;
      }

      return 0;
    });

    const outcomes = this.transactions.map(transaction => {
      if (transaction.type === 'outcome') {
        return transaction.value;
      }

      return 0;
    });

    const incomesTotal = incomes.reduce((total, value) => total + value, 0);
    const outcomesTotal = outcomes.reduce((total, value) => total + value, 0);

    const total = incomesTotal - outcomesTotal;

    const balance = {
      income: incomesTotal,
      outcome: outcomesTotal,
      total,
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
