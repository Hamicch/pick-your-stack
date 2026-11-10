<script setup lang="ts">
import type { Category } from '@/data/categories'
import { useStack } from '@/composables/useStack'
import ToolCard from './ToolCard.vue'

defineProps<{
  category: Category
}>()

const { select, isSelected } = useStack()
</script>

<template>
  <section class="category-card">
    <div class="category-header">
      <span class="kicker">{{ category.subtitle }}</span>
      <h2 class="category-label">{{ category.label }}</h2>
    </div>
    <div class="tool-list">
      <ToolCard
        v-for="tool in category.tools"
        :key="tool.id"
        :tool="tool"
        :selected="isSelected(category.id, tool.id)"
        @select="select(category.id, tool)"
      />
    </div>
  </section>
</template>

<style scoped>
.category-card {
  border: 2px solid var(--ink);
  background: var(--paper);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  break-inside: avoid;
}

.category-header {
  padding: 16px 16px 12px;
  border-bottom: 2px solid var(--paper-sunken);
}

.kicker {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
  display: block;
  margin-bottom: 4px;
}

.category-label {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--ink);
}

.tool-list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
