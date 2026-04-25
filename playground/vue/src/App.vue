<script setup lang="ts">
import UserCard from './components/UserCard.vue'
import CounterButton from './components/CounterButton.vue'

const users = [
  { name: 'Alice', email: 'alice@example.com', isActive: true },
  { name: 'Bob', email: 'bob@example.com', isActive: false },
]

function handleSelect(email: string): void {
  console.log('Selected:', email)
}
</script>

<template>
  <div>
    <h1>Vue Playground</h1>
    <CounterButton />
    <UserCard
      v-for="user in users"
      :key="user.email"
      :name="user.name"
      :email="user.email"
      :is-active="user.isActive"
      @select="handleSelect"
    />
  </div>
</template>
