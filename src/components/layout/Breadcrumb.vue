<template>
  <nav 
    class="breadcrumb" 
    :class="{ 'breadcrumb--expanded': isExpanded }"
    aria-label="Navegación de ruta"
  >
    <div class="breadcrumb__container container">
      <!-- Mobile: Mostrar padre → actual (máximo 2 niveles) -->
      <div class="breadcrumb__mobile hide-desktop">

        
        <div class="breadcrumb__path">
          <!-- Mostrar padre si existe -->
          <template v-if="mobileBreadcrumbs.length > 1">
            <RouterLink 
              v-if="mobileBreadcrumbs[0]?.path"
              :to="mobileBreadcrumbs[0].path"
              class="breadcrumb__parent"
              @click="isExpanded = false"
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
          
          <!-- Actual (siempre visible - click para expandir) -->
          <button 
            class="breadcrumb__current-mobile btn-reset"
            @click="isExpanded = !isExpanded"
            aria-label="Cambiar sección"
          >
            {{ mobileBreadcrumbs[mobileBreadcrumbs.length - 1]?.label }}
            <svg class="breadcrumb__chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
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
          <button
            v-else-if="sections.length > 0 && index === breadcrumbs.length - 1"
            class="breadcrumb__dropdown-trigger"
            @click="isExpanded = !isExpanded"
            aria-label="Cambiar sección"
            :aria-expanded="isExpanded"
          >
            {{ item.label }}
            <svg 
              class="breadcrumb__chevron" 
              :class="{ 'breadcrumb__chevron--expanded': isExpanded }"
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"/>
            </svg>
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

      <!-- Sections Dropdown (Mobile & Desktop) -->
      <Transition name="slide-down">
        <div v-if="isExpanded && sections.length > 0" class="breadcrumb__sections">
          <button
            v-for="section in sections"
            :key="section.id"
            @click="handleSectionClick(section.id)"
            class="breadcrumb__section"
            :class="{ 'breadcrumb__section--active': activeSection === section.id }"
          >
            {{ section.label }}
            <svg v-if="activeSection === section.id" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: auto;">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
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

/* Desktop default (Compact) */
.breadcrumb__container {
  min-height: 22px;
  display: flex;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
  position: relative; /* Anchor for dropdown */
}

@media (max-width: 767px) {
  /* Mobile override (Touch friendly) */
  .breadcrumb__container {
    min-height: 40px !important;
    padding-top: 4px;
    padding-bottom: 4px;
  }
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
  font-size: 13px; /* Slightly smaller than sm (14px) */
  color: var(--color-secondary);
  text-decoration: none;
  padding: 2px 8px; /* Larger click box */
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  margin: 0 -2px; /* Slight margin offset to compensate padding */
}

.breadcrumb__link:hover {
  color: var(--color-primary);
  background-color: var(--color-neutral-light); /* Box effect on hover */
  text-decoration: none;
}

.breadcrumb__link--button {
  font-weight: var(--font-weight-medium);
}

.breadcrumb__current-text {
  font-size: 13px;
  color: var(--color-neutral-dark);
  font-weight: var(--font-weight-semibold);
  padding: 0 var(--spacing-1);
}

.breadcrumb__dropdown-trigger {
  font-size: 13px;
  color: var(--color-neutral-dark);
  font-weight: var(--font-weight-semibold);
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all var(--transition-fast);
  font-family: inherit;
  margin: 0 -4px; /* Align box */
}

.breadcrumb__dropdown-trigger:hover {
  background-color: var(--color-neutral-light);
  color: var(--color-primary);
}

.breadcrumb__dropdown-trigger[aria-expanded="true"] {
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.breadcrumb__chevron {
  opacity: 0.5;
  transition: transform var(--transition-normal);
  flex-shrink: 0;
}

.breadcrumb__dropdown-trigger:hover .breadcrumb__chevron,
.breadcrumb__dropdown-trigger[aria-expanded="true"] .breadcrumb__chevron {
  opacity: 1;
}

.breadcrumb__chevron--expanded {
  transform: rotate(180deg);
}

/* Mobile Breadcrumb */
.breadcrumb__mobile {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  width: 100%;
  padding: 0;
}



.breadcrumb__path {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  flex: 1;
  min-width: 0;
}

.breadcrumb__current-mobile {
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px; /* Touch target visual box */
  border-radius: var(--radius-sm);
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.breadcrumb__current-mobile:hover,
.breadcrumb__current-mobile:active {
  background-color: var(--color-neutral-light);
}

.breadcrumb__chevron {
  opacity: 0.5;
  flex-shrink: 0;
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
  padding: 4px 8px; /* Larger touch target */
  margin: 0 -4px; /* Offset margin to align text visually but keep box */
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}
.breadcrumb__parent:hover {
  background-color: var(--color-secondary-light);
  text-decoration: none;
}

/* Sections Dropdown */
.breadcrumb__sections {
  position: absolute;
  top: 100%;
  left: 0;
  /* right: 0; Removed to allow auto width in desktop */
  min-width: 240px;
  max-width: 100%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-neutral-light);
  border-top: none;
  box-shadow: var(--shadow-lg);
  max-height: 60vh;
  overflow-y: auto;
  z-index: var(--z-dropdown);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

@media (max-width: 767px) {
  .breadcrumb__sections {
    right: 0; /* Full width on mobile */
    min-width: auto;
    border-left: none;
    border-right: none;
  }
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

/* Dot styles removed */

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
}

</style>
