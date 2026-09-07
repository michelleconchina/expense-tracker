import { Swipeable } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';

import { Expense } from '../types';

export function ExpenseRow({
  expense,
  onDelete,
}: {
  expense: Expense;
  onDelete: (id: number) => void;
}) {
  return (
    <Swipeable
      renderRightActions={() => (
        <View style={styles.deleteAction}>
          <Text style={styles.deleteText}>Delete</Text>
        </View>
      )}
      onSwipeableOpen={() => onDelete(expense.id)}
      rightThreshold={40}
    >
      <View style={styles.row}>
        <View>
          <Text style={styles.description}>{expense.description}</Text>
          <Text style={styles.category}>
            {expense.category} · {expense.date}
          </Text>
        </View>
        <Text style={styles.amount}>₱{expense.amount.toFixed(2)}</Text>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  description: {
    fontSize: 16,
  },
  category: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  deleteAction: {
    backgroundColor: '#C0392B',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});
