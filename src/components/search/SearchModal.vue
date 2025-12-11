<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="search-overlay"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-label="Buscar en el sitio"
      >
        <div class="search-modal">
          <!-- Search Input -->
          <div class="search-input-wrapper">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="search"
              class="search-input"
              placeholder="Buscar carreras, fechas, horarios..."
              @keydown.escape="close"
              @keydown.down.prevent="focusNextSuggestion"
              @keydown.up.prevent="focusPrevSuggestion"
              @keydown.enter="selectFocusedSuggestion"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
            />
            <button @click="close" class="search-close" aria-label="Cerrar búsqueda">
              <kbd class="hide-mobile">ESC</kbd>
              <svg class="hide-desktop" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Search Results -->
          <div class="search-results" id="search-suggestions" role="listbox">
            <!-- Recent Searches -->
            <div v-if="!searchQuery && recentSearches.length > 0" class="search-section">
              <div class="search-section-header">
                <span class="search-section-title">Búsquedas recientes</span>
                <button @click="clearRecent" class="search-section-btn">Limpiar</button>
              </div>
              <ul class="suggestion-list">
                <li 
                  v-for="term in recentSearches" 
                  :key="term"
                  class="suggestion-item"
                  @click="executeSearch(term)"
                >
                  <svg class="suggestion-leading-icon suggestion-leading-icon--muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{{ term }}</span>
                </li>
              </ul>
            </div>

            <!-- Suggestions -->
            <div v-if="searchQuery && suggestions.length > 0" class="search-section">
              <div class="search-section-header">
                <span class="search-section-title">Sugerencias</span>
              </div>
              <ul class="suggestion-list" role="listbox">
                <li 
                  v-for="(suggestion, index) in suggestions" 
                  :key="suggestion.id"
                  class="suggestion-item"
                  :class="{ 'suggestion-item--focused': focusedIndex === index }"
                  @click="goToSuggestion(suggestion)"
                  @mouseenter="focusedIndex = index"
                  role="option"
                  :aria-selected="focusedIndex === index"
                >
                  <span class="suggestion-leading-icon" aria-hidden="true">
                    <span v-if="suggestion.icon" class="mdi" :class="suggestion.icon"></span>
                    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="M21 21l-4.35-4.35"/>
                    </svg>
                  </span>
                  <div class="suggestion-content">
                    <div class="suggestion-header">
                      <span class="suggestion-title">{{ suggestion.title }}</span>
                      <span class="suggestion-source">{{ suggestion.source }}</span>
                    </div>
                    <p v-if="suggestion.snippet" class="suggestion-snippet" v-html="formatSnippet(suggestion.snippet)"></p>
                    <span class="suggestion-type">{{ getTypeLabel(suggestion.type) }}</span>
                  </div>
                  <svg class="suggestion-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </li>
              </ul>
            </div>

            <!-- No Results -->
            <div v-if="searchQuery && suggestions.length === 0" class="search-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>No se encontraron resultados para "{{ searchQuery }}"</p>
              <span>Intenta con otra búsqueda</span>
            </div>

            <!-- Quick Actions -->
            <div v-if="!searchQuery" class="search-section">
              <div class="search-section-header">
                <span class="search-section-title">Accesos rápidos</span>
              </div>
              <ul class="suggestion-list">
                <li 
                  v-for="action in quickActions" 
                  :key="action.path"
                  class="suggestion-item"
                  @click="goTo(action.path)"
                >
                  <span class="suggestion-leading-icon" aria-hidden="true">
                    <span class="mdi" :class="action.icon"></span>
                  </span>
                  <span>{{ action.title }}</span>
                  <svg class="suggestion-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </li>
              </ul>
            </div>
          </div>

          <!-- Keyboard Hints -->
          <div class="search-hints hide-mobile">
            <span><kbd>↑↓</kbd> Navegar</span>
            <span><kbd>↵</kbd> Seleccionar</span>
            <span><kbd>ESC</kbd> Cerrar</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/search'
import type { SearchSuggestion } from '@/types'

const router = useRouter()
const searchStore = useSearchStore()
const { isOpen, query: storeQuery, suggestions, recentSearches } = storeToRefs(searchStore)

const searchInput = ref<HTMLInputElement | null>(null)
const focusedIndex = ref(-1)

const searchQuery = computed({
  get: () => storeQuery.value,
  set: (value: string) => searchStore.setQuery(value)
})

const quickActions = [
  { title: 'Calendario Académico', path: '/calendario', icon: 'mdi-calendar-month' },
  { title: 'Horarios de Clases', path: '/horarios', icon: 'mdi-table-clock' },
  { title: 'Admisión y Requisitos', path: '/admision', icon: 'mdi-account-check-outline' },
  { title: 'Contacto y Soporte', path: '/contacto', icon: 'mdi-lifebuoy' }
]

function getTypeLabel(type: SearchSuggestion['type']): string {
  const labels: Record<SearchSuggestion['type'], string> = {
    page: 'Página',
    event: 'Evento',
    career: 'Carrera',
    news: 'Noticia',
    document: 'Documento',
    schedule: 'Horario',
    authority: 'Autoridad'
  }
  return labels[type] || type
}

function close() {
  searchStore.close()
  focusedIndex.value = -1
}

function goTo(path: string) {
  router.push(path)
  close()
}

function goToSuggestion(suggestion: SearchSuggestion) {
  searchStore.addToRecent(suggestion.title)
  goTo(suggestion.path)
}

function executeSearch(term: string) {
  searchStore.setQuery(term)
}

function clearRecent() {
  searchStore.clearRecent()
}

function focusNextSuggestion() {
  if (suggestions.value.length === 0) return
  focusedIndex.value = (focusedIndex.value + 1) % suggestions.value.length
}

function focusPrevSuggestion() {
  if (suggestions.value.length === 0) return
  focusedIndex.value = focusedIndex.value <= 0 
    ? suggestions.value.length - 1 
    : focusedIndex.value - 1
}

function selectFocusedSuggestion() {
  const suggestion = suggestions.value[focusedIndex.value]
  if (focusedIndex.value >= 0 && suggestion) {
    goToSuggestion(suggestion)
  }
}

function formatSnippet(snippet?: string): string {
  if (!snippet) return ''
  const tokens = searchQuery.value.trim().split(/\s+/).filter(Boolean)
  let formatted = escapeHtml(snippet)

  if (!tokens.length) {
    return formatted
  }

  tokens.forEach(token => {
    try {
      const regex = new RegExp(`(${escapeRegExp(token)})`, 'ig')
      formatted = formatted.replace(regex, '<mark>$1</mark>')
    } catch {
      /* ignore invalid regex tokens */
    }
  })

  return formatted
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  return value.replace(/[&<>"']/g, char => entities[char] ?? char)
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Focus input when modal opens
watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
    searchInput.value?.focus()
  }
})

// Reset focused index when query changes
watch(searchQuery, () => {
  focusedIndex.value = -1
})
</script>

<style scoped>
.search-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--spacing-16) var(--spacing-4);
}

@media (max-width: 639px) {
  .search-overlay {
    padding: var(--spacing-4);
  }
}

.search-modal {
  width: 100%;
  max-width: 600px;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  overflow: hidden;
  animation: slideDown var(--transition-normal) ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Search Input */
.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-4) var(--spacing-5);
  border-bottom: 1px solid var(--color-neutral-light);
}

.search-icon {
  color: #6B7280;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: var(--font-size-lg);
  color: var(--color-neutral-dark);
  background: transparent;
}

.search-input::placeholder {
  color: #9CA3AF;
}

.search-close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-2);
}

.search-close kbd {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  color: #6B7280;
  background-color: var(--color-neutral-light);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
}

.search-close svg {
  color: #6B7280;
}

/* Search Results */
.search-results {
  max-height: 400px;
  overflow-y: auto;
}

.search-section {
  padding: var(--spacing-4) 0;
}

.search-section:not(:last-child) {
  border-bottom: 1px solid var(--color-neutral-light);
}

.search-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--spacing-5) var(--spacing-2);
}

.search-section-title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.search-section-btn {
  font-size: var(--font-size-xs);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
}

.search-section-btn:hover {
  text-decoration: underline;
}

/* Suggestion List */
.suggestion-list {
  list-style: none;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-5);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.suggestion-item:hover,
.suggestion-item--focused {
  background-color: var(--color-neutral-light);
}

.suggestion-leading-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  background-color: var(--color-neutral-light);
  color: var(--color-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.suggestion-leading-icon--muted {
  background-color: transparent;
  color: #6B7280;
}

.suggestion-leading-icon .mdi {
  font-size: 1.25rem;
}

.suggestion-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.suggestion-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--spacing-2);
}

.suggestion-title {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-dark);
}

.suggestion-source {
  font-size: var(--font-size-xs);
  color: #1F2937;
  background-color: var(--color-neutral-light);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.suggestion-snippet {
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: #4B5563;
  line-height: 1.4;
}

.suggestion-snippet mark {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  padding: 0 2px;
}

.suggestion-type {
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
}

.suggestion-arrow {
  color: #9CA3AF;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.suggestion-item:hover .suggestion-arrow,
.suggestion-item--focused .suggestion-arrow {
  opacity: 1;
}

/* Empty State */
.search-empty {
  padding: var(--spacing-10);
  text-align: center;
  color: #6B7280;
}

.search-empty svg {
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.search-empty p {
  font-size: var(--font-size-base);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-2);
}

.search-empty span {
  font-size: var(--font-size-sm);
}

/* Keyboard Hints */
.search-hints {
  display: flex;
  justify-content: center;
  gap: var(--spacing-6);
  padding: var(--spacing-3) var(--spacing-5);
  background-color: var(--color-surface-variant);
  border-top: 1px solid var(--color-neutral-light);
}

.search-hints span {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-xs);
  color: #6B7280;
}

.search-hints kbd {
  font-family: var(--font-family);
  font-size: var(--font-size-xs);
  color: #6B7280;
  background-color: var(--color-neutral-light);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  min-width: 24px;
  text-align: center;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: all var(--transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .search-modal,
.modal-leave-to .search-modal {
  transform: translateY(-20px) scale(0.95);
}
</style>
