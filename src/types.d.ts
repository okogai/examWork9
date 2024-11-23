export interface ICategory {
  type: string;
  name: string;
}

export interface ICategoryFromDB extends ICategory {
  id: string;
}

export interface Transaction {
  amount: number;
  date: string;
  categoryId: string;
  type: string;
}

export interface TransactionFromDB extends Transaction {
  id: string;
}
