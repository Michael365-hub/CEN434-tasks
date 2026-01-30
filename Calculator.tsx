import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | string>('');

  const calculate = (operation: string) => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult('Enter valid numbers');
      return;
    }

    let res: number | string;
    switch (operation) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': res = b !== 0 ? a / b : 'Error: Divide by 0'; break;
      default: res = '';
    }
    setResult(res);
  };

  const reset = () => {
    setNum1('');
    setNum2('');
    setResult('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calculator</Text>
      </View>
      
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={num1}
          onChangeText={setNum1}
          placeholder="First number"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={num2}
          onChangeText={setNum2}
          placeholder="Second number"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.operationButton} onPress={() => calculate('+')}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operationButton} onPress={() => calculate('-')}>
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operationButton} onPress={() => calculate('*')}>
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.operationButton} onPress={() => calculate('/')}>
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      {result !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Result:</Text>
          <Text style={styles.resultText}>
            {typeof result === 'number' ? result.toFixed(2) : result}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  inputSection: {
    marginBottom: 24,
    gap: 12,
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: '#1a4d2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: '#f5f5f5',
    color: '#000000',
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
    gap: 12,
  },
  operationButton: {
    flex: 1,
    height: 60,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  resultContainer: {
    borderWidth: 2,
    borderColor: '#0a7ea4',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#f0f8ff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a4d2e',
  },
  resultText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  resetButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#1a4d2e',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default Calculator;
