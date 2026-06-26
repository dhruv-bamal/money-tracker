export type Category =
  | "Food"
  | "Transport"
  | "Subscriptions"
  | "Shopping"
  | "Bills"
  | "Other";

export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  date: string;
}

export type CategoryTotals = {
  [key in Category]: number;
};

export interface RecurringSubscription {
  merchant: string;
  amount: number;
  count: number;
}
