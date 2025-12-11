<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="selectedDay" class="event-modal-overlay" @click.self="$emit('close')">
        <div class="event-modal day-modal">
          <div class="event-modal__header-minimal">
            <div class="header-date-group">
              <span class="header-day-number">{{ selectedDay.date.getDate() }}</span>
              <div class="header-date-text">
                <span class="header-day-name">{{ selectedDay.date.toLocaleDateString('es-BO', { weekday: 'short' }).toUpperCase() }}</span>
                <span class="header-month-year">{{ selectedDay.date.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' }) }}</span>
              </div>
            </div>
            <button @click="$emit('close')" class="close-btn-minimal" aria-label="Cerrar" title="Cerrar detalle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="event-modal__body day-modal__body">
            <div v-if="events.length === 0" class="no-events-minimal">
              <p>Sin actividades programadas</p>
            </div>
            
            <div class="events-timeline">
              <div 
                v-for="event in events" 
                :key="event.id"
                class="timeline-event"
              >
                <div class="timeline-marker" :class="`bg-${event.category}`" :title="getCategoryLabel(event.category)"></div>
                <div class="timeline-content">
                  <div class="timeline-meta">
                    <span class="event-badge" :class="`bg-${event.category}-soft text-${event.category}`">
                      {{ getCategoryLabel(event.category) }}
                    </span>
                    <span class="timeline-time" v-if="event.time">{{ event.time }}</span>
                  </div>
                  <h4 class="timeline-title">{{ event.title }}</h4>
                  <p class="timeline-desc">{{ event.description }}</p>
                  
                  <div class="timeline-actions" v-if="event.ctaLink || event.location || event.category === 'news'">
                    <button
                      v-if="event.category === 'news'"
                      @click="handleNewsClick(event.newsId || 0)"
                      class="action-link"
                      title="Leer noticia completa"
                    >
                      Leer noticia completa
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                    <a
                      v-else-if="event.ctaLink"
                      :href="event.ctaLink"
                      class="action-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      :title="event.ctaLabel || 'Más información'"
                    >
                      {{ event.ctaLabel || 'Más información' }}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="7" y1="17" x2="17" y2="7"/>
                        <polyline points="7 7 17 7 17 17"/>
                      </svg>
                    </a>
                    <span class="location-tag" v-if="event.location" :title="`Ubicación: ${event.location}`">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {{ event.location }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { TimelineEvent } from '@/types'

interface Props {
  selectedDay: any | null
  events: TimelineEvent[]
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()

const categories = {
  exams: 'Exámenes',
  procedures: 'Trámites',
  events: 'Eventos',
  holidays: 'Feriados',
  news: 'Noticias'
}

const getCategoryLabel = (category: string) => {
  return categories[category as keyof typeof categories] || 'Evento'
}

function handleNewsClick(id: number) {
  router.push(`/noticias/${id}`)
}
</script>

<style scoped>
/* Modal Minimalist */
.event-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: var(--spacing-4);
}

.event-modal {
  background: white;
  width: 100%;
  max-width: 420px;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl);
  overflow: hidden;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

/* Header Minimal */
.event-modal__header-minimal {
  padding: var(--spacing-6);
  padding-bottom: var(--spacing-2);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-date-group {
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-3);
  color: var(--color-primary);
}

.header-day-number {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;
}

.header-date-text {
  display: flex;
  flex-direction: column;
  padding-bottom: 4px;
}

.header-day-name {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-secondary);
  line-height: 1.2;
}

.header-month-year {
  font-size: 0.875rem;
  color: var(--color-secondary);
  font-weight: 500;
}

.close-btn-minimal {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-secondary);
  padding: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn-minimal:hover {
  background-color: var(--color-surface-variant);
  color: var(--color-neutral-dark);
}

/* Body */
.day-modal__body {
  padding: var(--spacing-6);
  padding-top: var(--spacing-2);
  overflow-y: auto;
}

.no-events-minimal {
  padding: var(--spacing-8);
  text-align: center;
  color: var(--color-secondary);
  background: var(--color-surface-variant);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-2);
}

.events-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  margin-top: var(--spacing-2);
  position: relative;
}

/* Connecting Line */
.events-timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 0;
  left: 6px;
  width: 2px;
  background-color: var(--color-neutral-light);
  border-radius: 2px;
}

.timeline-event {
  position: relative;
  padding-left: 24px;
}

.timeline-marker {
  position: absolute;
  top: 6px;
  left: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px white; /* Gap effect */
  z-index: 1;
}

.timeline-content {
  background: white;
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-1);
}

.event-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  letter-spacing: 0.5px;
}

/* Badge colors (Soft backgrounds) */
.bg-exams-soft { background-color: #FFFBEB; }
.text-exams { color: #B45309; }

.bg-procedures-soft { background-color: #EFF6FF; }
.text-procedures { color: #1D4ED8; }

.bg-events-soft { background-color: #ECFDF5; }
.text-events { color: #047857; }

.bg-holidays-soft { background-color: #F1F5F9; }
.text-holidays { color: #475569; }

.bg-news-soft { background-color: #F5F3FF; }
.text-news { color: #7C3AED; }

/* Colors for Dots and Markers */
.bg-exams { background-color: #F59E0B; }
.bg-procedures { background-color: #3B82F6; }
.bg-events { background-color: #10B981; }
.bg-holidays { background-color: #64748B; }
.bg-news { background-color: #8B5CF6; }

.timeline-time {
  font-size: 12px;
  color: var(--color-secondary);
  font-weight: 500;
}

.timeline-title {
  font-size: 1rem;
  margin: 0 0 4px 0;
  color: var(--color-neutral-dark);
  line-height: 1.4;
}

.timeline-desc {
  font-size: 0.875rem;
  color: var(--color-secondary);
  margin: 0 0 var(--spacing-3) 0;
  line-height: 1.6;
}

.timeline-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  align-items: center;
}

.action-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.action-link:hover {
  text-decoration: underline;
}

.location-tag {
  font-size: 12px;
  color: var(--color-secondary);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
