export interface ICategory {
  type: string;
  name: string;
}

export interface ICategoryFromDB extends ICategory {
  id: string;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  categoryId: string;
}
