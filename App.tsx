import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AddExpenseForm } from './components/AddExpenseForm';
import { ExpenseRow } from './components/ExpenseRow';
import { DayTotal, WeekTrend } from './components/WeekTrend';
import { API_BASE_URL } from './config';
import { Expense, ExpenseSummary, NewExpense } from './types';

const today = new Date().toISOString().slice(0, 10);

function groupByDay(expenses: Expense[]) {
  const byDate = new Map<string, Expense[]>();
  for (const expense of expenses) {
    const group = byDate.get(expense.date) ?? [];
    group.push(expense);
    byDate.set(expense.date, group);
  }
  return Array.from(byDate.entries())
    .sort(([a], [b]) => (a < b ? 1 : -1))
    .map(([date, data]) => ({
      title: date,
      total: data.reduce((sum, e) => sum + e.amount, 0),
      data,
    }));
}

function lastSevenDays(expenses: Expense[]): DayTotal[] {
  const days: DayTotal[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    const total = expenses
      .filter((e) => e.date === date)
      .reduce((sum, e) => sum + e.amount, 0);
    days.push({ date, total });
  }
  return days;
}

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [todayTotal, setTodayTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExpenses = useCallback(() => {
    return fetch(`${API_BASE_URL}/api/expenses`)
      .then((response) => response.json())
      .then(setExpenses);
  }, []);

  const loadTodayTotal = useCallback(() => {
    return fetch(`${API_BASE_URL}/api/expenses/summary?date=${today}`)
      .then((response) => response.json())
      .then((summary: ExpenseSummary) => setTodayTotal(summary.total));
  }, []);

  useEffect(() => {
    Promise.all([loadExpenses(), loadTodayTotal()])
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [loadExpenses, loadTodayTotal]);

  function handleAdd(newExpense: NewExpense) {
    fetch(`${API_BASE_URL}/api/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    })
      .then(() => Promise.all([loadExpenses(), loadTodayTotal()]))
      .catch((err) => setError(err.message));
  }

  function handleDelete(id: number) {
    fetch(`${API_BASE_URL}/api/expenses/${id}`, { method: 'DELETE' })
      .then(() => Promise.all([loadExpenses(), loadTodayTotal()]))
      .catch((err) => setError(err.message));
  }

  const sections = useMemo(() => groupByDay(expenses), [expenses]);
  const weekTrend = useMemo(() => lastSevenDays(expenses), [expenses]);

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.title}>Expenses</Text>
        <Text style={styles.total}>
          Today: {todayTotal !== null ? `₱${todayTotal.toFixed(2)}` : '—'}
        </Text>

        {!loading && <WeekTrend days={weekTrend} />}

        <AddExpenseForm onSubmit={handleAdd} />

        {error && <Text style={styles.errorMessage}>Error: {error}</Text>}

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color="#2E6F5C" />
          </View>
        ) : (
          <SectionList
            sections={sections}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ExpenseRow expense={item} onDelete={handleDelete} />
            )}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionTotal}>
                  ₱{section.total.toFixed(2)}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.centered}>
                <Text style={styles.emptyText}>No expenses yet.</Text>
                <Text style={styles.emptySubtext}>
                  Add your first one above.
                </Text>
              </View>
            }
            stickySectionHeadersEnabled={false}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 16,
    marginHorizontal: 16,
  },
  total: {
    fontSize: 16,
    color: '#2E6F5C',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F5F8F6',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#55635E',
  },
  sectionTotal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#55635E',
  },
  errorMessage: {
    color: '#C0392B',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#999',
  },
});
