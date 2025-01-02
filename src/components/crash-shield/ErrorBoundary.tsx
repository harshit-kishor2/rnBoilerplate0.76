import React, {ErrorInfo, ReactNode} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';

interface IErrorBoundaryProps {
  children: ReactNode;
  onError: (error: Error, stackTrace: string, type: string) => void;
  errorCode: string;
}

interface IErrorBoundaryState {
  error: Error | null;
  stackTrace: string | null;
}

interface ICrashFallbackScreenProps {
  errorCode: string;
  error?: Error | null;
  stackTrace: string | null;
  onReset: () => void;
}

const CrashFallbackScreen: React.FC<ICrashFallbackScreenProps> = ({
  errorCode,
  error,
  stackTrace,
  onReset
}) => (
  <View style={styles.fallbackContainer}>
    <Text style={styles.fallbackTitle}>Oops! Something went wrong.</Text>
    <Text style={styles.errorText}>{error?.message ?? 'Unknown Error'}</Text>
    <Text style={styles.errorCode}>Error Code: {errorCode}</Text>
    {stackTrace && (
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.errorInfo}>{stackTrace}</Text>
      </ScrollView>
    )}
    <Button title="Try Again" onPress={onReset} />
  </View>
);

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state = {error: null, stackTrace: null};

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      stackTrace: errorInfo.componentStack ?? '',
    });
    this.props.onError(error, errorInfo?.componentStack ?? '', 'Error Boundary');
  }

  // Reset the error back to null
  resetError = () => this.setState({error: null, stackTrace: null});

  // To avoid unnecessary re-renders
  // shouldComponentUpdate(nextProps: IErrorBoundaryProps, nextState: IErrorBoundaryState): boolean {
  //   return nextState.error !== this.state.error;
  // }


  // Render an error UI if there's an error; otherwise, render children
  render() {
    const {children, errorCode} = this.props;
    const {error, stackTrace} = this.state;
    if (error) {
      return <CrashFallbackScreen errorCode={errorCode ?? 'Unknown'} error={error} stackTrace={stackTrace} onReset={this.resetError} />;
    }
    return children;
  }
}

export default ErrorBoundary;



const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  fallbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#721c24',
  },
  errorText: {
    fontSize: 14,
    color: '#721c24',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorCode: {
    fontSize: 12,
    color: '#495057',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorInfo: {
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    maxHeight: 400, // Adjust height based on your UI design
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
