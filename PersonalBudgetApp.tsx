import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Expense {
  id: number;
  desc: string;
  amount: number;
}

const PersonalBudgetApp = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    setBalance(income - totalExpenses);
  }, [income, expenses]);

  const addExpense = () => {
    if (description && amount) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        setExpenses([...expenses, { id: Date.now(), desc: description, amount: parsedAmount }]);
        setDescription('');
        setAmount('');
      }
    }
  };

  const fetchBankTransactions = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      const newExpenses = data.slice(0, 3).map((item: any, index: number) => ({
        id: Date.now() + index,
        desc: `Transaction ${item.id}`,
        amount: Math.random() * 100,
      }));
      setExpenses(prevExpenses => [...prevExpenses, ...newExpenses]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const renderExpense = ({ item }: { item: Expense }) => (
    <View style={styles.expenseItem}>
      <View style={styles.expenseContent}>
        <Text style={styles.expenseDesc} numberOfLines={2}>{item.desc}</Text>
        <Text style={styles.expenseAmount}>₦{item.amount.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteExpense(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const isLowBalance = balance < 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budget App</Text>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>💰 Income</Text>
          <Text style={styles.summaryAmount}>₦{income.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>📊 Expenses</Text>
          <Text style={styles.summaryAmount}>₦{totalExpenses.toFixed(2)}</Text>
        </View>
        <View style={[styles.balanceBox, { backgroundColor: isLowBalance ? '#ffebee' : '#f0f8f4' }]}>
          <Text style={styles.summaryLabel}>Balance</Text>
          <Text style={[styles.balanceAmount, { color: isLowBalance ? '#d32f2f' : '#0a7ea4' }]}>₦{balance.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.sectionLabel}>Monthly Income</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter monthly income"
          keyboardType="numeric"
          value={income.toString()}
          onChangeText={(text) => setIncome(parseFloat(text) || 0)}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.expenseInputSection}>
        <Text style={styles.sectionLabel}>Add Expense</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={addExpense}>
          <Text style={styles.buttonText}>➕ Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={fetchBankTransactions}>
          <Text style={styles.buttonText}>🔄 Fetch</Text>
        </TouchableOpacity>
      </View>

      {expenses.length > 0 && (
        <View>
          <Text style={styles.sectionLabel}>Recent Expenses</Text>
          <FlatList
            data={expenses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderExpense}
            scrollEnabled={false}
            style={styles.expenseList}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  summaryCard: {
    borderWidth: 2,
    borderColor: '#0a7ea4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    backgroundColor: '#e8f4f8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  summaryItem: {
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1a4d2e',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  balanceBox: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 20,
  },
  expenseInputSection: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000000',
  },
  input: {
    height: 52,
    borderWidth: 2,
    borderColor: '#1a4d2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a7ea4',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  expenseList: {
    marginBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
    backgroundColor: '#f5f5f5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  expenseContent: {
    flex: 1,
    marginRight: 12,
  },
  expenseDesc: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a7ea4',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});

export default PersonalBudgetApp;