import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const WeightConverter = () => {
  const [kg, setKg] = useState('');
  const [unitFrom, setUnitFrom] = useState<'kg' | 'lbs'>('kg');

  const getConversion = () => {
    if (!kg) return { value: '', label: '' };
    const num = parseFloat(kg);
    if (isNaN(num)) return { value: '', label: 'Invalid input' };

    if (unitFrom === 'kg') {
      const pounds = (num * 2.20462).toFixed(2);
      return { value: pounds, label: 'Pounds' };
    } else {
      const kilograms = (num / 2.20462).toFixed(2);
      return { value: kilograms, label: 'Kilograms' };
    }
  };

  const conversion = getConversion();
  const toggleUnit = () => {
    setUnitFrom(unitFrom === 'kg' ? 'lbs' : 'kg');
    setKg('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weight Converter</Text>
      </View>

      <View style={styles.converterSection}>
        <View style={styles.unitBox}>
          <Text style={styles.unitLabel}>From</Text>
          <Text style={styles.unitName}>{unitFrom.toUpperCase()}</Text>
        </View>

        <TouchableOpacity style={styles.toggleButton} onPress={toggleUnit}>
          <Text style={styles.toggleText}>⇄</Text>
        </TouchableOpacity>

        <View style={styles.unitBox}>
          <Text style={styles.unitLabel}>To</Text>
          <Text style={styles.unitName}>
            {unitFrom === 'kg' ? 'LBS' : 'KG'}
          </Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kg}
        onChangeText={setKg}
        placeholder={`Enter weight in ${unitFrom.toUpperCase()}`}
        placeholderTextColor="#999"
      />

      {conversion.value && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Converted Value</Text>
          <View style={styles.resultContent}>
            <Text style={styles.resultValue}>{conversion.value}</Text>
            <Text style={styles.resultUnit}>{conversion.label}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={() => setKg('')}>
        <Text style={styles.resetButtonText}>Clear</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  converterSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  unitBox: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f0f4f8',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  unitLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#1a4d2e',
  },
  unitName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  toggleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    backgroundColor: '#0a7ea4',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: '#1a4d2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 24,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  resultContainer: {
    borderWidth: 2,
    borderColor: '#0a7ea4',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
    backgroundColor: '#e8f4f8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1a4d2e',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0a7ea4',
  },
  resultUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
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

export default WeightConverter;
