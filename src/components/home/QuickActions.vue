<template>
  <section class="quick-actions section" aria-label="Accesos rápidos">
    <div class="container">
      <h2 class="section-title">Accesos Rápidos</h2>
      
      <div class="actions-grid">
        <RouterLink 
          v-for="action in actions" 
          :key="action.id"
          :to="action.path"
          class="action-card"
          :style="{ '--action-delay': action.id }"
        >
          <div class="action-card__icon">
            <span class="action-card__emoji">{{ action.icon }}</span>
          </div>
          <div class="action-card__content">
            <h3 class="action-card__title">{{ action.title }}</h3>
            <p class="action-card__description">{{ action.description }}</p>
          </div>
          <div class="action-card__arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { QuickAction } from '@/types'

const actions: QuickAction[] = [
  {
    id: '1',
    title: 'Calendario Académico',
    icon: '📅',
    path: '/#calendar',
    description: 'Consulta fechas importantes, exámenes y feriados'
  },
  {
    id: '2',
    title: 'Horarios de Clases',
    icon: '🕒',
    path: '/horarios',
    description: 'Revisa los horarios por carrera y semestre'
  },
  {
    id: '3',
    title: 'Examen de Ingreso',
    icon: '📝',
    path: '/admision',
    description: 'Requisitos, fechas y proceso de admisión'
  },
  {
    id: '4',
    title: 'Explorar Carreras',
    icon: '🎓',
    path: '/admision',
    description: 'Conoce las carreras que ofrecemos'
  }
]
</script>

<style scoped>
.quick-actions {
  background-color: var(--color-surface);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 767px) {
  .actions-grid {
    grid-template-columns: 1fr;
  }
}

.action-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  border-radius: var(--radius-xl);
  color: white;
  text-decoration: none;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  animation: slideUp 0.5s ease-out backwards;
  animation-delay: calc(var(--action-delay) * 100ms);
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  text-decoration: none;
  color: white;
}

.action-card:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
}

.action-card__icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
}

.action-card__emoji {
  font-size: 2rem;
}

.action-card__content {
  flex: 1;
  min-width: 0;
}

.action-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-1);
  color: white;
}

.action-card__description {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: var(--line-height-normal);
}

.action-card__arrow {
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition-fast);
}

.action-card:hover .action-card__arrow {
  opacity: 1;
  transform: translateX(0);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
