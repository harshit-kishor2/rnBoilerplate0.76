import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

interface Props {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  onReset: () => void;
}

const ErrorDetails: React.FC<Props> = ({error, errorInfo, onReset}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops! Something went wrong.</Text>

      {error && <Text style={styles.message}>{error.toString()}</Text>}

      {errorInfo && (
        <Text style={styles.errorInfo}>
          {errorInfo.componentStack?.toString()}
        </Text>
      )}

      <Button title="Try Again" onPress={onReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorInfo: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ErrorDetails;
