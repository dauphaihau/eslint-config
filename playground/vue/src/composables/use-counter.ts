import { ref } from 'vue';

export function useCounter(initialValue = 0): {
  count: ReturnType<typeof ref<number>>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
} {
  const count = ref(initialValue);

  function increment(): void {
    count.value++;
  }

  function decrement(): void {
    count.value--;
  }

  function reset(): void {
    count.value = initialValue;
  }

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
