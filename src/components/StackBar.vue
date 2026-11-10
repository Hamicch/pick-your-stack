<script setup lang="ts">
import { ref } from 'vue'
import { useStack } from '@/composables/useStack'
import { exportStackPng, exportDiagramPng } from '@/utils/export'

const { selectedList, count, clearAll, generatePrompt } = useStack()
const copied = ref(false)
const exporting = ref<string | null>(null)
const expanded = ref(false)

async function copyPrompt() {
  const text = generatePrompt()
  if (!text) return
  await navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

async function downloadStack() {
  exporting.value = 'stack'
  try {
    await exportStackPng(selectedList.value)
  } finally {
    exporting.value = null
  }
}

async function downloadDiagram() {
  exporting.value = 'diagram'
  try {
    await exportDiagramPng(selectedList.value)
  } finally {
    exporting.value = null
  }
}
</script>

<template>
  <div v-if="count > 0" class="bar-wrapper">
    <div v-if="expanded" class="bar-expanded" @click.self="expanded = false">
      <div class="bar-panel">
        <div class="panel-header">
          <span class="panel-title">Your Stack</span>
          <button class="clear-btn" @click="clearAll">Clear All</button>
        </div>
        <ul class="selection-list">
          <li v-for="s in selectedList" :key="s.category.id" class="selection-item">
            <img :src="s.tool.logo" :alt="s.tool.name" class="sel-logo" />
            <div class="sel-text">
              <span class="sel-category">{{ s.category.label }}</span>
              <span class="sel-name">{{ s.tool.name }}</span>
            </div>
          </li>
        </ul>
        <div class="panel-actions">
          <button class="action-btn primary" @click="copyPrompt">
            {{ copied ? 'Copied!' : 'Copy AI Prompt' }}
          </button>
          <button class="action-btn" :disabled="exporting === 'stack'" @click="downloadStack">
            {{ exporting === 'stack' ? 'Exporting…' : 'Stack PNG' }}
          </button>
          <button class="action-btn" :disabled="exporting === 'diagram'" @click="downloadDiagram">
            {{ exporting === 'diagram' ? 'Exporting…' : 'Diagram PNG' }}
          </button>
        </div>
      </div>
    </div>

    <div class="bar-strip" @click="expanded = !expanded">
      <div class="bar-left">
        <span class="bar-badge">{{ count }}</span>
        <span class="bar-label">{{ count === 1 ? 'tool' : 'tools' }} selected</span>
        <div class="bar-logos">
          <img
            v-for="s in selectedList.slice(0, 6)"
            :key="s.tool.id"
            :src="s.tool.logo"
            :alt="s.tool.name"
            class="bar-logo"
          />
          <span v-if="count > 6" class="bar-more">+{{ count - 6 }}</span>
        </div>
      </div>
      <div class="bar-right">
        <button class="action-btn primary small" @click.stop="copyPrompt">
          {{ copied ? 'Copied!' : 'Copy Prompt' }}
        </button>
        <span class="expand-arrow">{{ expanded ? '▼' : '▲' }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

.bar-strip {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: var(--ink);
  color: var(--paper);
  border-top: 2px solid var(--ink);
  cursor: pointer;
  user-select: none;
}

.bar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bar-badge {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  background: var(--red);
  color: #fff;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.bar-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.bar-logos {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 4px;
}

.bar-logo {
  width: 22px;
  height: 22px;
  object-fit: contain;
  background: var(--paper);
  padding: 2px;
}

.bar-more {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-muted);
}

.bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.expand-arrow {
  font-size: 12px;
  opacity: 0.6;
}

.bar-expanded {
  position: fixed;
  inset: 0;
  background: rgba(38, 37, 31, 0.4);
  z-index: 99;
  display: flex;
  align-items: flex-end;
}

.bar-panel {
  width: 100%;
  background: var(--paper);
  border-top: 2px solid var(--ink);
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.panel-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
}

.clear-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-muted);
  background: none;
  border: none;
  padding: 4px 8px;
}
.clear-btn:hover {
  color: var(--red);
}

.selection-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.selection-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--paper-raised);
  border: 2px solid var(--paper-sunken);
}

.sel-logo {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.sel-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.sel-category {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--blue);
}

.sel-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.panel-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 16px;
  border-top: 2px solid var(--paper-sunken);
}

.action-btn {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 10px 18px;
  border: 2px solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  box-shadow: var(--shadow);
  transition: transform 140ms var(--ease-out),
              box-shadow 140ms var(--ease-out),
              background 140ms var(--ease-out),
              color 140ms var(--ease-out);
}

.action-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lift);
  background: var(--ink);
  color: var(--paper);
}

.action-btn:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: var(--shadow);
}

.action-btn.primary {
  background: var(--red);
  color: #fff;
  border-color: var(--red);
  box-shadow: 4px 4px 0 var(--red-deep);
}
.action-btn.primary:hover {
  background: var(--red-deep);
  border-color: var(--red-deep);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--red-deep);
}

.action-btn.small {
  padding: 7px 14px;
  font-size: 11px;
}

@media (max-width: 640px) {
  .bar-logos {
    display: none;
  }

  .bar-strip {
    padding: 12px 16px;
  }

  .selection-list {
    grid-template-columns: 1fr;
  }
}
</style>
