<script setup lang="ts">
import type { Tool } from '@/data/categories'

defineProps<{
  tool: Tool
  selected: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <button
    class="tool-card"
    :class="{ selected }"
    @click="$emit('select')"
  >
    <img
      :src="tool.logo"
      :alt="tool.name"
      class="tool-logo"
      loading="lazy"
    />
    <span class="tool-name">{{ tool.name }}</span>
  </button>
</template>

<style scoped>
.tool-card {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--paper-sunken);
  border-radius: 0;
  background: var(--paper);
  transition: transform 140ms var(--ease-out),
              box-shadow 140ms var(--ease-out),
              border-color 140ms var(--ease-out),
              background 80ms;
}

.tool-card:hover {
  border-color: var(--ink);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lift);
}

.tool-card:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.tool-card.selected {
  border-color: var(--red);
  background: var(--paper-raised);
  box-shadow: 4px 4px 0 var(--red);
}

.tool-card.selected:hover {
  box-shadow: 6px 6px 0 var(--red);
}

.tool-logo {
  width: 28px;
  height: 28px;
  object-fit: contain;
  flex-shrink: 0;
}

.tool-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
