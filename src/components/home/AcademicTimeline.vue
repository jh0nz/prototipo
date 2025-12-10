<template>
  <section id="calendar" class="timeline section" aria-label="Calendario Académico">
    <div class="container">
      <h2 class="section-title">Calendario Académico</h2>
      
      <!-- Filter Chips -->
      <div class="timeline__filters" role="group" aria-label="Filtrar eventos">
        <button 
          v-for="filter in filters" 
          :key="filter.value"
          class="chip"
          :class="{ 'chip-active': activeFilter === filter.value, 'chip-secondary': activeFilter !== filter.value }"
          @click="setFilter(filter.value)"
          :aria-pressed="activeFilter === filter.value"
        >
          <span v-if="filter.icon" class="chip-icon">{{ filter.icon }}</span>
          {{ filter.label }}
        </button>
      </div>

      <!-- Timeline -->
      <div class="timeline__list" role="list">
        <TransitionGroup name="timeline-item">
          <article 
            v-for="event in filteredEvents" 
            :key="event.id"
            class="timeline-event"
            :class="{ 
              'timeline-event--urgent': event.isUrgent,
              [`timeline-event--${event.type}`]: true 
            }"
            role="listitem"
            @click="openEventModal(event)"
          >
            <div class="timeline-event__indicator">
              <div class="timeline-event__dot"></div>
              <div class="timeline-event__line"></div>
            </div>
            
            <div class="timeline-event__card">
              <div class="timeline-event__header">
                <time class="timeline-event__date" :datetime="event.date">
                  <span class="date-day">{{ formatDay(event.date) }}</span>
                  <span class="date-month">{{ formatMonth(event.date) }}</span>
                </time>
                <span class="timeline-event__badge" :class="`badge--${event.type}`">
                  {{ getTypeBadge(event.type) }}
                </span>
              </div>
              
              <div class="timeline-event__body">
                <h3 class="timeline-event__title">{{ event.title }}</h3>
                <p v-if="event.description" class="timeline-event__description">
                  {{ event.description }}
                </p>
              </div>
              
              <div class="timeline-event__footer">
                <span v-if="event.time" class="timeline-event__meta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ event.time }}
                </span>
                <span v-if="event.location" class="timeline-event__meta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {{ event.location }}
                </span>
                <span class="timeline-event__expand">
                  Ver más
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </span>
              </div>
            </div>
          </article>
        </TransitionGroup>
        
        <!-- Empty State -->
        <div v-if="filteredEvents.length === 0" class="timeline-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          <p>No hay eventos para este filtro</p>
        </div>
      </div>

      <!-- Event Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div 
            v-if="selectedEvent" 
            class="event-modal-overlay"
            @click.self="closeEventModal"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="`event-title-${selectedEvent.id}`"
          >
            <div class="event-modal">
              <div class="event-modal__header" :class="`event-modal__header--${selectedEvent.type}`">
                <div>
                  <span class="event-modal__badge">{{ getTypeBadge(selectedEvent.type) }}</span>
                  <h3 :id="`event-title-${selectedEvent.id}`" class="event-modal__title">
                    {{ selectedEvent.title }}
                  </h3>
                </div>
                <button @click="closeEventModal" class="event-modal__close" aria-label="Cerrar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <div class="event-modal__body">
                <div class="event-modal__info">
                  <div class="event-modal__info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <div>
                      <span class="info-label">Fecha</span>
                      <span class="info-value">{{ formatFullDate(selectedEvent.date) }}</span>
                    </div>
                  </div>
                  
                  <div v-if="selectedEvent.time" class="event-modal__info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    <div>
                      <span class="info-label">Hora</span>
                      <span class="info-value">{{ selectedEvent.time }}</span>
                    </div>
                  </div>
                  
                  <div v-if="selectedEvent.location" class="event-modal__info-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div>
                      <span class="info-label">Ubicación</span>
                      <span class="info-value">{{ selectedEvent.location }}</span>
                    </div>
                  </div>
                </div>
                
                <p v-if="selectedEvent.description" class="event-modal__description">
                  {{ selectedEvent.description }}
                </p>
              </div>
              
              <div class="event-modal__footer">
                <button @click="closeEventModal" class="btn btn-secondary">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TimelineEvent, EventType } from '@/types'

const activeFilter = ref<string>('all')
const selectedEvent = ref<TimelineEvent | null>(null)

const filters = [
  { label: 'Todos', value: 'all', icon: '📋' },
  { label: 'Exámenes', value: 'exams', icon: '📝' },
  { label: 'Trámites', value: 'procedures', icon: '📄' },
  { label: 'Feriados', value: 'holidays', icon: '🎉' },
  { label: 'Eventos', value: 'events', icon: '🎓' }
]

const events: TimelineEvent[] = [
  {
    id: 1,
    date: '2025-07-29',
    title: 'Inicio venta de matrícula 2-2025',
    description: 'Apertura del proceso de venta de matrículas para el semestre 2-2025. Se recomienda realizar el pago lo antes posible para asegurar su inscripción.',
    type: 'warning',
    category: 'procedures',
    location: 'Ventanilla de Tesorería'
  },
  {
    id: 2,
    date: '2025-08-15',
    title: 'Publicación de Cronograma Exámenes Mesa',
    description: 'Se publica el cronograma oficial de exámenes de mesa para el semestre 2-2025.',
    type: 'info',
    category: 'exams'
  },
  {
    id: 3,
    date: '2025-08-18',
    title: 'Inicio de Clases 2-2025',
    description: 'Inicio oficial del semestre académico 2-2025. Todos los estudiantes deben estar inscritos previamente.',
    type: 'info',
    category: 'events',
    time: '07:30'
  },
  {
    id: 4,
    date: '2025-10-13',
    title: 'Primeros Parciales Inician',
    description: 'Inicio del período de primeros exámenes parciales. Consulte el horario específico de cada materia.',
    type: 'warning',
    category: 'exams'
  },
  {
    id: 5,
    date: '2025-11-01',
    title: 'Fin Primeros Parciales',
    description: 'Finalización del período de primeros exámenes parciales.',
    type: 'success',
    category: 'exams'
  },
  {
    id: 6,
    date: '2025-12-01',
    title: 'Segundos Parciales Inician',
    description: 'Inicio del período de segundos exámenes parciales.',
    type: 'warning',
    category: 'exams'
  },
  {
    id: 7,
    date: '2025-12-13',
    title: 'Fin Segundos Parciales',
    description: 'Finalización del período de segundos exámenes parciales.',
    type: 'success',
    category: 'exams'
  },
  {
    id: 8,
    date: '2025-12-15',
    title: 'Exámenes Finales Inician',
    description: 'Inicio del período de exámenes finales. Evento crítico - prepare con anticipación.',
    type: 'urgent',
    category: 'exams',
    isUrgent: true
  },
  {
    id: 9,
    date: '2025-12-25',
    title: 'FERIADO - NAVIDAD',
    description: 'Feriado nacional. No hay clases ni actividades administrativas.',
    type: 'info',
    category: 'holidays'
  },
  {
    id: 10,
    date: '2025-12-27',
    title: 'Fin Semestre 2-2025',
    description: 'Finalización oficial del semestre académico 2-2025.',
    type: 'urgent',
    category: 'events',
    isUrgent: true
  }
]

const filteredEvents = computed(() => {
  if (activeFilter.value === 'all') {
    return events
  }
  return events.filter(event => event.category === activeFilter.value)
})

function setFilter(value: string) {
  activeFilter.value = value
}

function openEventModal(event: TimelineEvent) {
  selectedEvent.value = event
  document.body.style.overflow = 'hidden'
}

function closeEventModal() {
  selectedEvent.value = null
  document.body.style.overflow = ''
}

function formatDay(dateString: string): string {
  return new Date(dateString).getDate().toString().padStart(2, '0')
}

function formatMonth(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-BO', { month: 'short' }).toUpperCase()
}

function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-BO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getTypeBadge(type: EventType): string {
  const badges: Record<EventType, string> = {
    info: 'Información',
    success: 'Completado',
    warning: 'Próximo',
    urgent: '¡Urgente!'
  }
  return badges[type]
}
</script>

<style scoped>
.timeline {
  background-color: var(--color-surface-variant);
}

/* Filter Chips */
.timeline__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-8);
}

.chip-icon {
  margin-right: var(--spacing-1);
}

/* Timeline List */
.timeline__list {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

/* Timeline Event */
.timeline-event {
  display: flex;
  gap: var(--spacing-4);
  cursor: pointer;
}

.timeline-event__indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 24px;
  flex-shrink: 0;
}

.timeline-event__dot {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-full);
  background-color: var(--color-secondary);
  border: 3px solid var(--color-surface-variant);
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.timeline-event:hover .timeline-event__dot {
  transform: scale(1.2);
}

.timeline-event--info .timeline-event__dot { background-color: var(--color-secondary); }
.timeline-event--success .timeline-event__dot { background-color: var(--color-success); }
.timeline-event--warning .timeline-event__dot { background-color: var(--color-accent); }
.timeline-event--urgent .timeline-event__dot { 
  background-color: var(--color-primary); 
  animation: urgentPulse 2s ease-in-out infinite;
}

.timeline-event__line {
  flex: 1;
  width: 2px;
  background-color: var(--color-neutral-light);
  margin: var(--spacing-1) 0;
}

.timeline-event:last-child .timeline-event__line {
  display: none;
}

/* Event Card */
.timeline-event__card {
  flex: 1;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border-left: 4px solid transparent;
}

.timeline-event:hover .timeline-event__card {
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.timeline-event--info .timeline-event__card { border-left-color: var(--color-secondary); }
.timeline-event--success .timeline-event__card { border-left-color: var(--color-success); }
.timeline-event--warning .timeline-event__card { border-left-color: var(--color-accent); }
.timeline-event--urgent .timeline-event__card { border-left-color: var(--color-primary); }

.timeline-event__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-3);
}

.timeline-event__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-surface-variant);
  padding: var(--spacing-2) var(--spacing-3);
  border-radius: var(--radius-md);
  min-width: 56px;
}

.date-day {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  color: var(--color-neutral-dark);
}

.date-month {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: #6B7280;
  text-transform: uppercase;
}

.timeline-event__badge {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
}

.badge--info {
  background-color: var(--color-info-light);
  color: var(--color-info);
}

.badge--success {
  background-color: var(--color-success-light);
  color: var(--color-success);
}

.badge--warning {
  background-color: var(--color-warning-light);
  color: #946D00;
}

.badge--urgent {
  background-color: var(--color-error-light);
  color: var(--color-error);
  animation: pulse 2s ease-in-out infinite;
}

.timeline-event__body {
  margin-bottom: var(--spacing-3);
}

.timeline-event__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-1);
}

.timeline-event__description {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.timeline-event__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-4);
}

.timeline-event__meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: #6B7280;
}

.timeline-event__meta svg {
  color: #9CA3AF;
}

.timeline-event__expand {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary);
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition-fast);
}

.timeline-event:hover .timeline-event__expand {
  opacity: 1;
  transform: translateX(0);
}

/* Empty State */
.timeline-empty {
  text-align: center;
  padding: var(--spacing-12);
  color: #6B7280;
}

.timeline-empty svg {
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.timeline-empty p {
  margin: 0;
}

/* Timeline Item Transitions */
.timeline-item-enter-active,
.timeline-item-leave-active {
  transition: all var(--transition-normal);
}

.timeline-item-enter-from,
.timeline-item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.timeline-item-move {
  transition: transform var(--transition-normal);
}

/* Event Modal */
.event-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
}

.event-modal {
  width: 100%;
  max-width: 500px;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  overflow: hidden;
  animation: slideUp var(--transition-normal) ease-out;
}

.event-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-4);
  padding: var(--spacing-6);
  color: white;
}

.event-modal__header--info { background-color: var(--color-secondary); }
.event-modal__header--success { background-color: var(--color-success); }
.event-modal__header--warning { background: linear-gradient(135deg, #F5B700, #D9A200); }
.event-modal__header--urgent { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover)); }

.event-modal__badge {
  display: inline-block;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-2);
}

.event-modal__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: white;
  margin: 0;
}

.event-modal__close {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity var(--transition-fast);
  padding: var(--spacing-1);
}

.event-modal__close:hover {
  opacity: 1;
}

.event-modal__body {
  padding: var(--spacing-6);
}

.event-modal__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.event-modal__info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
}

.event-modal__info-item svg {
  color: var(--color-secondary);
  flex-shrink: 0;
  margin-top: 2px;
}

.event-modal__info-item > div {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: var(--font-size-xs);
  color: #6B7280;
  margin-bottom: 2px;
}

.info-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-dark);
}

.event-modal__description {
  font-size: var(--font-size-sm);
  color: #6B7280;
  line-height: var(--line-height-relaxed);
  margin: 0;
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-neutral-light);
}

.event-modal__footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-4) var(--spacing-6);
  background-color: var(--color-surface-variant);
  border-top: 1px solid var(--color-neutral-light);
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

.modal-enter-from .event-modal,
.modal-leave-to .event-modal {
  transform: translateY(20px) scale(0.95);
}
</style>
