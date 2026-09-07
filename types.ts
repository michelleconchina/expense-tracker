// Mirrors ExpenseTracker.Api/Models/Expense.cs. The API serializes to
// camelCase JSON and DateOnly as an ISO date string ("2026-09-05").
export interface Expense {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}
