<script setup lang="ts">
import { categories } from '@/data/categories'
import CategorySection from '@/components/CategorySection.vue'
import StackBar from '@/components/StackBar.vue'
</script>

<template>
  <div class="page">
    <header class="hero">
      <p class="kicker">Build · Compare · Ship</p>
      <h1>Pick Your Stack.</h1>
      <p class="lede">
        Choose one tool per layer. Get an AI-ready prompt and a shareable diagram.
      </p>
    </header>

    <main class="grid">
      <CategorySection
        v-for="cat in categories"
        :key="cat.id"
        :category="cat"
      />
    </main>

    <StackBar />
  </div>
</template>

<style scoped>
.page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 120px;
}

.hero {
  margin-bottom: 48px;
}

.kicker {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-muted);
  margin-bottom: 12px;
}

h1 {
  font-size: clamp(2rem, 1rem + 4vw, 3.5rem);
  font-weight: 900;
  line-height: 1.05;
  margin-bottom: 12px;
}

.lede {
  font-size: 17px;
  color: var(--ink-soft);
  max-width: 48ch;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  align-items: start;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .page {
    padding: 32px 16px 120px;
  }
}
</style>
