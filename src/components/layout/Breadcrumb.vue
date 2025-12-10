<template>
  <nav 
    class="breadcrumb" 
    :class="{ 'breadcrumb--expanded': isExpanded }"
    aria-label="Navegación de ruta"
  >
    <div class="breadcrumb__container container">
      <!-- Mobile: Mostrar padre → actual (máximo 2 niveles) -->
      <div class="breadcrumb__mobile hide-desktop">
        <button 
          v-if="sections.length > 0"
          class="breadcrumb__toggle"
          @click="isExpanded = !isExpanded"
          :aria-expanded="isExpanded"
          aria-label="Mostrar secciones"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
        
        <div class="breadcrumb__path">
          <!-- Mostrar padre si existe -->
          <template v-if="mobileBreadcrumbs.length > 1">
            <RouterLink 
              v-if="mobileBreadcrumbs[0]?.path"
              :to="mobileBreadcrumbs[0].path"
              class="breadcrumb__parent"
            >
              {{ mobileBreadcrumbs[0]?.label }}
            </RouterLink>
            <span class="breadcrumb__parent" v-else>
              {{ mobileBreadcrumbs[0]?.label }}
            </span>
            
            <svg class="breadcrumb__arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </template>
          
          <!-- Actual (siempre visible) -->
          <span class="breadcrumb__current-mobile">
            {{ mobileBreadcrumbs[mobileBreadcrumbs.length - 1]?.label }}
          </span>
        </div>
      </div>

      <!-- Desktop: Mostrar ruta completa -->
      <ol class="breadcrumb__list hide-mobile">
        <li 
          v-for="(item, index) in breadcrumbs" 
          :key="index"
          class="breadcrumb__item"
        >
          <RouterLink 
            v-if="item.path && !item.isActive"
            :to="item.path"
            class="breadcrumb__link"
          >
            {{ item.label }}
          </RouterLink>
          <button
            v-else-if="item.hash && !item.isActive"
            @click="navigateToSection(item.hash.substring(1))"
            class="breadcrumb__link breadcrumb__link--button"
          >
            {{ item.label }}
          </button>
          <span 
            v-else
            class="breadcrumb__current-text"
            :aria-current="item.isActive ? 'location' : undefined"
          >
            {{ item.label }}
          </span>
          
          <svg 
            v-if="index < breadcrumbs.length - 1"
            class="breadcrumb__separator" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </li>
      </ol>

      <!-- Sections Dropdown (Mobile) -->
      <Transition name="slide-down">
        <div v-if="isExpanded && sections.length > 0" class="breadcrumb__sections hide-desktop">
          <button
            v-for="section in sections"
            :key="section.id"
            @click="handleSectionClick(section.id)"
            class="breadcrumb__section"
            :class="{ 'breadcrumb__section--active': activeSection === section.id }"
          >
            <span class="breadcrumb__section-dot"></span>
            {{ section.label }}
          </button>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBreadcrumb } from '@/composables/useBreadcrumb'

const { breadcrumbs, sections, activeSection, navigateToSection } = useBreadcrumb()
const isExpanded = ref(false)

const currentBreadcrumb = computed(() => {
  return breadcrumbs.value[breadcrumbs.value.length - 1] || { label: '' }
})

// Mobile: mostrar máximo 2 niveles (padre → actual)
const mobileBreadcrumbs = computed(() => {
  const items = breadcrumbs.value
  if (items.length <= 2) return items
  // Si hay más de 2, mostrar los últimos 2 (padre → actual)
  return items.slice(-2)
})

function handleSectionClick(sectionId: string) {
  navigateToSection(sectionId)
  isExpanded.value = false
}
</script>

<style scoped>
.breadcrumb {
  position: sticky;
  top: 64px;
  z-index: calc(var(--z-sticky) - 1);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-neutral-light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all var(--transition-normal);
}

.breadcrumb__container {
  min-height: 36px;
  display: flex;
  align-items: center;
  padding-top: var(--spacing-1);
  padding-bottom: var(--spacing-1);
}

/* Desktop Breadcrumb */
.breadcrumb__list {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  list-style: none;
  flex-wrap: wrap;
  padding: var(--spacing-3) 0;
}

.breadcrumb__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.breadcrumb__link {
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
  text-decoration: none;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.breadcrumb__link:hover {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
  text-decoration: none;
}

.breadcrumb__link--button {
  font-weight: var(--font-weight-medium);
}

.breadcrumb__current-text {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-dark);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-1) var(--spacing-2);
}

.breadcrumb__separator {
  color: var(--color-neutral);
  flex-shrink: 0;
}

/* Mobile Breadcrumb */
.breadcrumb__mobile {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  width: 100%;
  padding: 0;
}

.breadcrumb__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: var(--color-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.breadcrumb__toggle:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.breadcrumb__path {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  flex: 1;
  min-width: 0;
}

.breadcrumb__parent {
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
}

.breadcrumb__parent:hover {
  text-decoration: underline;
}

.breadcrumb__arrow {
  color: var(--color-neutral);
  flex-shrink: 0;
}

.breadcrumb__current-mobile {
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
}

/* Sections Dropdown */
.breadcrumb__sections {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-neutral-light);
  box-shadow: var(--shadow-lg);
  max-height: 60vh;
  overflow-y: auto;
  z-index: var(--z-dropdown);
}

.breadcrumb__section {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  width: 100%;
  padding: var(--spacing-4) var(--spacing-5);
  background: none;
  border: none;
  text-align: left;
  font-size: var(--font-size-base);
  color: var(--color-neutral-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
}

.breadcrumb__section:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.breadcrumb__section--active {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: var(--font-weight-semibold);
}

.breadcrumb__section-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: currentColor;
  opacity: 0.5;
  flex-shrink: 0;
}

.breadcrumb__section--active .breadcrumb__section-dot {
  opacity: 1;
}

/* Transitions */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all var(--transition-normal);
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 767px) {
  .breadcrumb {
    top: 64px;
  }
  
  .breadcrumb__container {
    min-height: 36px;
  }
}
</style>
