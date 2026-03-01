import { useState, useCallback, useEffect } from 'react';

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initialValue = 0): UseCounterReturn {
  const [count, setCount] = useState(initialValue);

  // Violation: Missing dependency in useCallback
  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Missing 'count' if it were used

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  // Violation: Missing dependency in useCallback
  const reset = useCallback(() => {
    setCount(initialValue);
  }, []); // Missing 'initialValue'

  // Violation: Missing dependency in useEffect
  useEffect(() => {
    console.log('Count changed:', count);
  }, []); // Missing 'count'

  // Violation: Direct state mutation (commented out to avoid unused var error)
  // const badIncrement = (): void => {
  //   count += 1; // Direct mutation
  // };

  return {
    count,
    increment,
    decrement,
    reset,
  };
}

export { useCounter };
