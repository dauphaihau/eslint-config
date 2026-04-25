<script setup lang="ts">
import UserCard from './components/UserCard.vue';

const userHtml = '<b>user input</b>';
const item = 'shadowed by v-for below';
const items = ['a', 'b', 'c'];
</script>

<template>
  <div>
    <!-- Violation: vue/require-v-for-key — missing :key on v-for -->
    <li v-for="entry in items">{{ entry }}</li>

    <!-- Violation: vue/no-v-html — XSS risk (warn) -->
    <div v-html="userHtml" />

    <!-- Violation: vue/no-use-v-if-with-v-for — v-if and v-for on same element -->
    <li v-for="entry2 in items" v-if="entry2 !== 'a'" :key="entry2">
      {{ entry2 }}
    </li>

    <!-- Violation: vue/no-template-shadow — 'item' shadows the outer script variable -->
    <li v-for="item in items" :key="item">{{ item }}</li>

    <!-- Violation: vue/no-duplicate-attrs — duplicate id attribute -->
    <div id="foo" id="bar" />

    <!-- Violation: vue/html-self-closing — empty element should be self-closed -->
    <span></span>

    <!-- Violation: vue/component-name-in-template-casing — should be <UserCard> -->
    <user-card name="Alice" email="alice@example.com" />
  </div>
</template>
