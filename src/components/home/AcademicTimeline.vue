<template>
  <section id="calendar" class="weekly-calendar section" aria-label="Calendario Semanal">
    <div class="calendar-content">
      <div class="calendar-header">
        <h2 class="section-title">{{ currentMonthName }} {{ currentYear }}</h2>
        <div class="calendar-controls">
          <button @click="prevWeek" class="btn-control" aria-label="Semana anterior" title="Semana anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button @click="nextWeek" class="btn-control" aria-label="Semana siguiente" title="Semana siguiente">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          
          <button @click="goToToday" class="btn-today" title="Ir al día actual">Hoy</button>
          
          <div class="divider-vertical"></div>
          
          <RouterLink to="/calendario" class="btn-icon-link" title="Ver Calendario Mensual Completo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span class="sr-only">Ver completo</span>
          </RouterLink>
        </div>
      </div>

      <!-- Desktop Grid / Mobile List -->
      <div class="calendar-grid">
        <div 
          v-for="day in weekDays" 
          :key="day.dateStr" 
          class="calendar-day"
          :class="{ 
            'calendar-day--today': day.isToday,
            'calendar-day--past': day.isPast,
            'calendar-day--has-events': getEventsForDay(day.dateStr).length > 0
          }"
          @click="openDayModal(day)"
          tabindex="0"
          role="button"
          :aria-label="`Ver detalles del día ${day.dayName} ${day.dayNumber}`"
          :title="`Ver detalles del ${day.dayName} ${day.dayNumber}`"
          @keydown.enter="openDayModal(day)"
          @keydown.space.prevent="openDayModal(day)"
        >
          <div class="day-header">
            <span class="day-name">{{ day.dayName }}</span>
            <div class="day-number-wrapper">
              <span class="day-number">{{ day.dayNumber }}</span>
            </div>
          </div>

          <div class="day-events">
            <!-- Non-interactive dots -->
            <div 
              v-for="event in getEventsForDay(day.dateStr)" 
              :key="event.id"
              class="event-dot"
              :class="`event-dot--${event.category}`"
              :title="`${event.title} - ${getCategoryLabel(event.category)}`"
            ></div>
          </div>
          
          <!-- Interaction Indicator -->
          <div class="day-interaction-indicator" title="Ver detalles">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="calendar-legend">
        <div class="legend-item" v-for="(label, key) in categories" :key="key" :title="`Eventos tipo: ${label}`">
          <span class="legend-dot" :class="`event-dot--${key}`"></span>
          <span class="legend-label">{{ label }}</span>
        </div>
      </div>

      <!-- Day Modal (Minimalist & Accessible) -->
      <Teleport to="body">
        <Transition name="fade">
          <div v-if="selectedDay" class="event-modal-overlay" @click.self="selectedDay = null">
            <div class="event-modal day-modal">
              <div class="event-modal__header-minimal">
                <div class="header-date-group">
                  <span class="header-day-number">{{ selectedDay.date.getDate() }}</span>
                  <div class="header-date-text">
                    <span class="header-day-name">{{ selectedDay.dayName }}</span>
                    <span class="header-month-year">{{ selectedDay.date.toLocaleDateString('es-BO', { month: 'long', year: 'numeric' }) }}</span>
                  </div>
                </div>
                <button @click="selectedDay = null" class="close-btn-minimal" aria-label="Cerrar" title="Cerrar detalle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div class="event-modal__body day-modal__body">
                <div v-if="getEventsForDay(selectedDay.dateStr).length === 0" class="no-events-minimal">
                  <p>Sin actividades programadas</p>
                </div>
                
                <div class="events-timeline">
                   <div 
                    v-for="event in getEventsForDay(selectedDay.dateStr)" 
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
                          @click="goToNews(event.newsId || 0)"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import eventsData from '@/data/calendar-events.json'
import noticiasData from '@/data/noticias.json'
import type { TimelineEvent } from '@/types'

// State
const router = useRouter()
const currentDate = ref(new Date()) // Start with today
const selectedDay = ref<any | null>(null)

// Merge events and news
const calendarEvents: TimelineEvent[] = [
  ...(eventsData as TimelineEvent[]),
  ...noticiasData.map((news: any) => ({
    id: 10000 + news.id,
    newsId: news.id,
    date: news.date,
    title: news.title,
    description: news.excerpt,
    ctaLabel: news.cta,
    ctaLink: news.ctaLink,
    type: 'news' as const,
    category: 'news' as const,
    location: undefined,
    time: undefined,
    isUrgent: false
  }))
]

const categories = {
  exams: 'Exámenes',
  procedures: 'Trámites',
  events: 'Eventos',
  holidays: 'Feriados',
  news: 'Noticias'
}

// Utils
const getStartOfWeek = (date: Date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is sunday (Monday start)
  const result = new Date(d.setDate(diff))
  result.setHours(0, 0, 0, 0) // Reset time to compare dates correctly
  return result
}

const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const formatDateStr = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Computed
const startOfWeekDate = computed(() => getStartOfWeek(currentDate.value))

const weekDays = computed(() => {
  const days = []
  const start = startOfWeekDate.value
  const today = new Date()
  const todayStr = formatDateStr(today)

  for (let i = 0; i < 7; i++) {
    const d = addDays(start, i)
    const dateStr = formatDateStr(d)
    const isToday = dateStr === todayStr
    // Past is strictly before today
    const isPast = dateStr < todayStr
    
    days.push({
      date: d,
      dateStr,
      dayNumber: d.getDate(),
      dayName: d.toLocaleDateString('es-BO', { weekday: 'short' }).toUpperCase(),
      isToday,
      isPast
    })
  }
  return days
})

const currentMonthName = computed(() => {
  return startOfWeekDate.value.toLocaleDateString('es-BO', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())
})

const currentYear = computed(() => {
  return startOfWeekDate.value.getFullYear()
})

// Methods
function prevWeek() {
  currentDate.value = addDays(currentDate.value, -7)
}

function nextWeek() {
  currentDate.value = addDays(currentDate.value, 7)
}

function goToToday() {
  currentDate.value = new Date()
}

function getEventsForDay(dateStr: string) {
  return calendarEvents.filter(e => e.date === dateStr)
}

function openDayModal(day: any) {
  selectedDay.value = day
}

const getCategoryLabel = (category: string) => {
  return categories[category as keyof typeof categories] || 'Evento'
}

function goToNews(id: number) {
  router.push(`/noticias/${id}`)
}
</script>

<style scoped>
.weekly-calendar {
  background-color: var(--color-surface);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.section-title {
  font-size: var(--font-size-xl);
  margin: 0;
  font-weight: 700;
  color: var(--color-on-surface); /* Assuming they want title to be prominent */
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  background: var(--color-surface-variant);
  padding: 4px;
  border-radius: var(--radius-full);
}

.btn-control {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-neutral-dark);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.btn-control:hover {
  background-color: var(--color-primary);
  color: white;
}

.btn-today {
  padding: 0 var(--spacing-4);
  height: 32px;
  border: none;
  background: white;
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-fast);
}

.btn-today:hover {
  background: var(--color-primary-light);
}

.btn-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-secondary);
  border-radius: 50%;
  transition: all var(--transition-fast);
}

.btn-icon-link:hover {
  background-color: var(--color-surface-variant);
  color: var(--color-primary);
}

.divider-vertical {
  width: 1px;
  height: 20px;
  background-color: var(--color-neutral-light);
  margin: 0 4px;
}

/* Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: var(--color-neutral-light);
  border: 1px solid var(--color-neutral-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-top: var(--spacing-2);
  box-shadow: var(--shadow-sm);
}

.calendar-day {
  background-color: white;
  min-height: 100px;
  padding: var(--spacing-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  position: relative;
}

.calendar-day:hover,
.calendar-day:focus-visible {
  background-color: var(--color-surface-variant);
  outline: none;
}

/* Red Highlight for Today */
.calendar-day--today {
  background-color: #FEF2F2; /* Red-50 */
}

.calendar-day--today .day-number,
.calendar-day--today .day-name {
  color: var(--color-error); /* Red Text */
}

.calendar-day--today .day-number {
  background-color: transparent;
  width: auto;
  height: auto;
  border-radius: 0;
  display: block;
}

/* Make day number bigger for today if desired, but user just said 'resalten con color rojo' */
.calendar-day--today .day-number {
  font-weight: 800;
  transform: scale(1.1);
}

.day-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
}

.day-name {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--color-secondary);
  margin-bottom: 2px;
}

.day-number {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-neutral-dark);
}

/* Events Dots */
.day-events {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  justify-content: center;
  padding: 2px;
  flex-grow: 1;
}

.event-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  padding: 0;
}

/* Colors for Dots and Legend */
.event-dot--exams, .bg-exams { background-color: #F59E0B; }
.event-dot--procedures, .bg-procedures { background-color: #3B82F6; }
.event-dot--events, .bg-events { background-color: #10B981; }
.event-dot--holidays, .bg-holidays { background-color: #64748B; }
.event-dot--news, .bg-news { background-color: #8B5CF6; }

/* Indicator */
.day-interaction-indicator {
  margin-top: auto;
  opacity: 0;
  transform: translateY(2px);
  transition: all 0.2s;
  color: var(--color-secondary);
}

.calendar-day:hover .day-interaction-indicator,
.calendar-day:focus-visible .day-interaction-indicator {
  opacity: 1;
  transform: translateY(0);
}

/* Legend */
.calendar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  justify-content: center;
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--color-neutral-light);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: help; /* Hint that it has tooltip */
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-label {
  font-size: 12px;
  color: var(--color-secondary);
  font-weight: 500;
}

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

/* Responsive */
@media (max-width: 768px) {
  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: transparent;
    border: none;
    box-shadow: none;
  }
  
  .calendar-day {
    flex-direction: row;
    min-height: 70px;
    border: 1px solid var(--color-neutral-light);
    border-radius: var(--radius-md);
    padding: var(--spacing-3);
    align-items: center;
    justify-content: space-between;
  }

  .day-header {
    width: auto;
    margin: 0;
    align-items: flex-start;
  }
  
  .day-events {
    justify-content: flex-end;
    margin-right: auto;
    margin-left: var(--spacing-4);
  }
  
  .day-interaction-indicator {
    opacity: 1; /* Always show on mobile since no hover */
    transform: none;
  }
}
</style>
