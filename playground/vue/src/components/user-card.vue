<script setup lang="ts">
interface Props {
  name: string;
  email: string;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: true,
});

const emit = defineEmits<{
  select: [userId: string];
}>();

function handleClick(): void {
  emit('select', props.email);
}
</script>

<template>
  <div
    class="user-card"
    :class="{ active: isActive }"
    @click="handleClick"
  >
    <h3>{{ name }}</h3>
    <p>{{ email }}</p>
  </div>
</template>

<style scoped>
.user-card {
  padding: 1rem;
  border: 1px solid #ccc;
}

.user-card.active {
  border-color: green;
}
</style>
