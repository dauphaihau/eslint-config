<script setup lang="ts">
import { useCounter } from '../composables/use-counter';

const { count, increment, decrement, reset } = useCounter(0);
</script>

<template>
  <div class="counter">
    <button @click="decrement">
      -
    </button>
    <span>{{ count }}</span>
    <button @click="increment">
      +
    </button>
    <button @click="reset">
      Reset
    </button>
  </div>
</template>
