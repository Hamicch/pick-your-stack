import { reactive, computed } from 'vue'
import { track } from '@vercel/analytics'
import { categories, type Tool, type Category } from '@/data/categories'

interface Selection {
  category: Category
  tool: Tool
}

const selections = reactive<Map<string, Selection>>(new Map())

export function useStack() {
  function select(categoryId: string, tool: Tool) {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return
    if (selections.get(categoryId)?.tool.id === tool.id) {
      selections.delete(categoryId)
      track('tool_deselected', { category: category.label, tool: tool.name })
    } else {
      selections.set(categoryId, { category, tool })
      track('tool_selected', { category: category.label, tool: tool.name })
    }
  }

  function isSelected(categoryId: string, toolId: string): boolean {
    return selections.get(categoryId)?.tool.id === toolId
  }

  function getSelection(categoryId: string): Tool | undefined {
    return selections.get(categoryId)?.tool
  }

  const selectedList = computed<Selection[]>(() => {
    return Array.from(selections.values())
  })

  const count = computed(() => selections.size)

  function clearAll() {
    track('stack_cleared', { count: selections.size })
    selections.clear()
  }

  function generatePrompt(): string {
    if (selections.size === 0) return ''
    const lines = selectedList.value.map(
      s => `- ${s.category.label}: ${s.tool.name}`
    )
    return `I'm building a new project with the following tech stack. For each tool, explain what it does, how it connects to the others, and flag any tradeoffs or gotchas worth knowing.

${lines.join('\n')}

Structure your response as:
1. A one-paragraph overview of the architecture
2. A breakdown of each layer (frontend, backend, data, infra, services) showing how the tools interact
3. A "Watch out for" section listing integration pitfalls, version compatibility issues, or operational gotchas`
  }

  return {
    select,
    isSelected,
    getSelection,
    selectedList,
    count,
    clearAll,
    generatePrompt,
  }
}
