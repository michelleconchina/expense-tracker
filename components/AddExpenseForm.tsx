import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { NewExpense } from '../types';

export function AddExpenseForm({
  onSubmit,
}: {
  onSubmit: (expense: NewExpense) => void;
}) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const canSubmit = amount.trim() !== '' && !Number.isNaN(Number(amount));

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({
      amount: Number(amount),
      description: description.trim(),
      category: category.trim(),
      date: new Date().toISOString().slice(0, 10),
    });
    setAmount('');
    setDescription('');
    setCategory('');
  }

  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.amountInput]}
        placeholder="Amount"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={[styles.input, styles.flexInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={[styles.input, styles.flexInput]}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Pressable
        style={[styles.addButton, !canSubmit && styles.addButtonDisabled]}
        onPress={handleSubmit}
        disabled={!canSubmit}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  amountInput: {
    width: 70,
  },
  flexInput: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#2E6F5C',
    borderRadius: 6,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  addButtonDisabled: {
    opacity: 0.4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
