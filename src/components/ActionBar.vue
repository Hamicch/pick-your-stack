<script setup lang="ts">
import { ref } from 'vue'
import { useStack } from '@/composables/useStack'

const { count, generatePrompt } = useStack()
const showPrompt = ref(false)
</script>

<template>
  <div v-if="count > 0 && showPrompt" class="prompt-overlay">
    <div class="prompt-box">
      <div class="prompt-header">
        <span class="prompt-title">AI Prompt Preview</span>
        <button class="close-btn" @click="showPrompt = false">&times;</button>
      </div>
      <pre class="prompt-preview">{{ generatePrompt() }}</pre>
    </div>
  </div>
</template>

<style scoped>
.prompt-overlay {
  position: fixed;
  inset: 0;
  background: rgba(38, 37, 31, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.prompt-box {
  background: var(--paper);
  border: 2px solid var(--ink);
  box-shadow: 8px 8px 0 var(--ink);
  max-width: 640px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
}

.prompt-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 2px solid var(--paper-sunken);
}

.prompt-title {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink);
}

.close-btn {
  font-size: 20px;
  line-height: 1;
  color: var(--ink-muted);
  background: none;
  border: none;
  padding: 0 4px;
}
.close-btn:hover {
  color: var(--red);
}

.prompt-preview {
  padding: 20px;
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--ink-soft);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
