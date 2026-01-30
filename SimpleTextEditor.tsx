import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SimpleTextEditor = () => {
  const [text, setText] = useState('');
  const [savedText, setSavedText] = useState('');

  const saveText = () => setSavedText(text);
  const clearText = () => {
    setText('');
    setSavedText('');
  };

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Text Editor</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{charCount}</Text>
            <Text style={styles.statLabel}>Characters</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{wordCount}</Text>
            <Text style={styles.statLabel}>Words</Text>
          </View>
        </View>
      </View>

      <TextInput
        style={styles.input}
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Type your text here..."
        placeholderTextColor="#999"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={saveText}>
          <Text style={styles.buttonText}>💾 Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearText}>
          <Text style={styles.buttonText}>🗑️ Clear</Text>
        </TouchableOpacity>
      </View>

      {savedText && (
        <View style={styles.savedContainer}>
          <Text style={styles.savedLabel}>📝 Saved Text:</Text>
          <Text style={styles.savedText}>{savedText}</Text>
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
    marginBottom: 16,
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0a7ea4',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a4d2e',
  },
  input: {
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#1a4d2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
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
  savedContainer: {
    borderWidth: 2,
    borderColor: '#0a7ea4',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#e8f4f8',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  savedLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1a4d2e',
  },
  savedText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#000000',
  },
});

export default SimpleTextEditor;
