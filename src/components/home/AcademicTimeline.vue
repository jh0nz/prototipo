```html
<template>
  <section id="calendar" class="weekly-calendar section" aria-label="Calendario Semanal">
    <div class="calendar-content">
      <div class="calendar-header">
        <h2 class="section-title">Agenda Semanal</h2>
        <div class="calendar-controls">
          <RouterLink to="/calendario" class="btn-icon-link" title="Ver Calendario Mensual">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </RouterLink>
          <div class="divider-vertical"></div>
          <button @click="prevWeek" class="btn-control" aria-label="Semana anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span class="current-month">{{ currentMonthName }}</span>
          <button @click="nextWeek" class="btn-control" aria-label="Semana siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="goToToday" class="btn-today">Hoy</button>
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
            'calendar-day--past': day.isPast
          }"
          @click="openDayModal(day)"
        >
          <div class="day-header">
            <span class="day-name">{{ day.dayName }}</span>
            <div class="day-number-wrapper">
              <span class="day-number">{{ day.dayNumber }}</span>
            </div>
          </div>

          <div class="day-events">
            <button 
              v-for="event in getEventsForDay(day.dateStr)" 
              :key="event.id"
              class="event-dot"
              :class="`event-dot--${event.type}`"
              :title="event.title"
              type="button"
              :aria-label="`Ver detalle de ${event.title}`"
              @click="openEventModal(event)"
            >
              <span class="sr-only">{{ event.title }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Event List for Selected Day or Today (Compact View) -->
      <div class="events-list-compact">
         <!-- Showing logic could be sophisticated, but keeping stick to grid request -->
      </div>


      <!-- Day Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="selectedDay" class="event-modal-overlay" @click.self="selectedDay = null">
            <div class="event-modal day-modal">
              <div class="event-modal__header">
                <div class="header-content">
                  <h3>{{ selectedDay.dayName }}</h3>
                  <span class="header-date">{{ formatDateFull(selectedDay.dateStr) }}</span>
                </div>
                <button @click="selectedDay = null" class="close-btn">&times;</button>
              </div>
              <div class="event-modal__body day-modal__body">
                <div v-if="getEventsForDay(selectedDay.dateStr).length === 0" class="no-events">
                  No hay eventos programados para este día.
                </div>
                
                <div 
                  v-for="event in getEventsForDay(selectedDay.dateStr)" 
                  :key="event.id"
                  class="day-event-item"
                  :class="`day-event-item--${event.type}`"
                >
                  <div class="event-pill" :class="`event-pill--${event.category}`">{{ getCategoryLabel(event.category) }}</div>
                  <h4>{{ event.title }}</h4>
                  <p class="event-time" v-if="event.time">{{ event.time }}</p>
                  <p class="event-desc">{{ event.description }}</p>
                  <a
                    v-if="event.ctaLink"
                    :href="event.ctaLink"
                    class="modal-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ event.ctaLabel || 'Más información' }}
                  </a>
                  <div class="modal-tags" v-if="event.location">
                    <span class="tag-location">📍 {{ event.location }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Single Event Modal (Optional/Legacy if clicking specific event) -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="selectedEvent" class="event-modal-overlay" @click.self="selectedEvent = null">
            <div class="event-modal">
              <div class="event-modal__header" :class="`header--${selectedEvent.type}`">
                <h3>{{ selectedEvent.title }}</h3>
                <button @click="selectedEvent = null" class="close-btn">&times;</button>
              </div>
              <div class="event-modal__body">
                <p class="modal-date">{{ formatDateFull(selectedEvent.date) }}</p>
                <div v-if="selectedEvent.type === 'news'" class="news-tag">Noticia</div>
                <p v-if="selectedEvent.time" class="modal-time">Hora: {{ selectedEvent.time }}</p>
                <p>{{ selectedEvent.description }}</p>
                <a
                  v-if="selectedEvent.ctaLink"
                  :href="selectedEvent.ctaLink"
                  class="modal-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ selectedEvent.ctaLabel || 'Ver detalles de la convocatoria' }}
                </a>
                
                <div class="modal-tags" v-if="selectedEvent.location">
                  <span class="tag-location">📍 {{ selectedEvent.location }}</span>
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
import eventsData from '@/data/calendar-events.json'
import noticiasData from '@/data/noticias.json'
import type { TimelineEvent } from '@/types'

// State
const currentDate = ref(new Date()) // Start with today
const selectedEvent = ref<TimelineEvent | null>(null)
const selectedDay = ref<any | null>(null)

// Merge events and news
const calendarEvents: TimelineEvent[] = [
  ...(eventsData as TimelineEvent[]),
  ...noticiasData.map((news: any) => ({
    id: 10000 + news.id,
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

function isUpcoming(dateStr: string) {
  const todayStr = formatDateStr(new Date())
  if (dateStr <= todayStr) return false
  
  // Upcoming is within next 5 days
  const d = new Date(dateStr)
  const today = new Date()
  today.setHours(0,0,0,0)
  const diffTime = d.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) 
  return diffDays <= 5
}

function openEventModal(event: TimelineEvent) {
  // Open day modal focused on this day
  const dayName = new Date(event.date + 'T12:00:00').toLocaleDateString('es-BO', { weekday: 'short' }).toUpperCase()
  selectedDay.value = {
    dateStr: event.date,
    dayName: dayName
  }
}

function openDayModal(day: any) {
  selectedDay.value = day
}

function formatDateFull(dateStr: string) {
  // Fix timezone issue by parsing parts manually
  const parts = dateStr.split('-').map(Number)
  const year = parts[0] || 0
  const month = parts[1] || 0
  const day = parts[2] || 0
  
  if (!year || !month || !day) return dateStr
  
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' })
}

const getCategoryLabel = (category: string) => {
  const map: Record<string, string> = {
    exams: 'Examen',
    procedures: 'Trámite',
    events: 'Evento',
    holidays: 'Feriado',
    news: 'Noticia'
  }
  return map[category] || 'Evento'
}
</script>

<style scoped>
.weekly-calendar {
  background-color: var(--color-surface);
  padding-bottom: var(--spacing-12);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  flex-wrap: wrap;
  gap: var(--spacing-4);
}

.section-title {
  margin: 0;
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  background: var(--color-surface-variant);
  padding: 4px;
  border-radius: var(--radius-full);
}

.btn-control {
  width: 36px;
  height: 36px;
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
  background-color: var(--color-primary-light);
  color: var(--color-primary);
}

.btn-today {
  padding: 0 var(--spacing-4);
  height: 36px;
  border: none;
  background: white;
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

/* ... (previous styles) ... */

.weekly-calendar {
  background-color: var(--color-surface);
  height: 100%; /* Fill height in grid */
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
}

.calendar-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  background: var(--color-surface-variant);
  padding: 4px;
  border-radius: var(--radius-full);
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
  background-color: white;
  color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.divider-vertical {
  width: 1px;
  height: 20px;
  background-color: var(--color-neutral);
  margin: 0 4px;
  opacity: 0.3;
}

.current-month {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  min-width: 80px;
  text-align: center;
}

/* Updated Grid for Side-by-Side View */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  background-color: var(--color-neutral-light);
  border: 1px solid var(--color-neutral-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-top: var(--spacing-4);
}

.calendar-day {
  background-color: white;
  min-height: 80px; /* Reduced height for compact view */
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.calendar-day--today {
  background-color: #F0F9FF;
}

.day-name {
  font-size: 10px;
  font-weight: bold;
  color: var(--color-secondary);
  margin-bottom: 2px;
}

.day-number {
  font-size: 14px;
  font-weight: bold;
}

.calendar-day--today .day-number {
  color: var(--color-primary);
}

/* Dot Indicators instead of Cards for Compact View */
/* Dot Indicators */
.day-events {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  padding: 4px;
}

.event-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: block;
  box-shadow: 0 0 0 1px white;
  padding: 0;
}

.event-dot:hover,
.event-dot:focus-visible {
  transform: scale(1.4);
  z-index: 10;
  box-shadow: 0 0 0 2px rgba(14,165,233,0.3);
}

.event-dot--info { background-color: var(--color-info); }
.event-dot--success { background-color: var(--color-success); }
.event-dot--warning { background-color: var(--color-warning); }
.event-dot--urgent { background-color: var(--color-error); }
.event-dot--news { background-color: #8B5CF6; }

@media (max-width: 1024px) {
  .weekly-calendar {
    padding-bottom: 0;
  }
}


/* Modal Simple */
.event-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  padding: var(--spacing-4);
}

.event-modal {
  background: white;
  width: 100%;
  max-width: 400px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.event-modal__header {
  padding: var(--spacing-4);
  background: var(--color-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header--urgent { background: var(--color-error); }
.header--warning { background: var(--color-warning); }
.header--news { background: #8B5CF6; }

.event-modal__header h3 {
  margin: 0;
  font-size: var(--font-size-lg);
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.event-modal__body {
  padding: var(--spacing-4);
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: var(--spacing-3);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.modal-link::after {
  content: '↗';
  font-size: 0.85em;
}

.modal-link:hover {
  text-decoration: underline;
}

.modal-date {
  font-weight: bold;
  color: var(--color-secondary);
  text-transform: capitalize;
  margin-bottom: var(--spacing-2);
}

.modal-tags {
  margin-top: var(--spacing-4);
  padding-top: var(--spacing-2);
  border-top: 1px solid var(--color-neutral-light);
}

.tag-location {
  font-size: var(--font-size-sm);
  color: var(--color-secondary);
}

.news-tag {
  display: inline-block;
  background: #F3F0FF;
  color: #8B5CF6;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: bold;
  margin-bottom: var(--spacing-2);
}

/* Responsive */
@media (max-width: 768px) {
  .calendar-grid {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }

  .calendar-day {
    min-height: auto;
    flex-direction: row;
    align-items: flex-start;
    gap: var(--spacing-4);
    background-color: white;
    border: 1px solid var(--color-neutral-light);
  }

  .calendar-day--today {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
  }
  
  .calendar-day--past {
    background-color: var(--color-surface-variant);
    opacity: 0.8;
  }

  .day-header {
    width: 60px;
    border-bottom: none;
    border-right: 1px solid rgba(0,0,0,0.05);
    margin: 0;
    padding-right: var(--spacing-2);
    min-height: 60px;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
  
  .day-number {
    font-size: var(--font-size-xl);
  }
  
  .day-events {
    padding-top: var(--spacing-1);
    padding-bottom: var(--spacing-1);
  }
  
  .event-card {
    border: 1px solid var(--color-neutral-light);
    box-shadow: none;
    border-left-width: 3px;
    margin-bottom: 0;
  }
}

/* Add Event Pill Styles from CalendarView */
.event-pill {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: var(--spacing-2);
}
.event-pill--exams { background: #FEF3C7; color: #92400E; }
.event-pill--procedures { background: #DBEAFE; color: #1E40AF; }
.event-pill--news { background: #F3F0FF; color: #7C3AED; }
.event-pill--holidays { background: #F1F5F9; color: #475569; }
.event-pill--events { background: #D1FAE5; color: #065F46; }

/* Day Modal Styles */
.day-modal {
  max-width: 500px;
}
.no-events {
  text-align: center;
  color: #64748B;
  padding: var(--spacing-4);
  background: var(--color-background);
  border-radius: var(--radius-md);
}
.day-event-item {
  background: var(--color-surface);
  border: 1px solid var(--color-neutral-light);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-4);
  transition: all var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.day-event-item:hover {
  border-color: var(--color-primary-light);
  box-shadow: var(--shadow-sm);
}
.day-event-item h4 {
  margin: var(--spacing-1) 0 var(--spacing-2) 0;
  color: var(--color-neutral-dark);
  font-size: 1rem;
}
.day-event-item .event-time {
  font-size: 0.85rem;
  color: var(--color-secondary);
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  display: flex;
  align-items: center;
  gap: 4px;
}
.day-event-item .event-time::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
}
.day-event-item .event-desc {
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: var(--spacing-2);
  line-height: 1.5;
}
.event-chip-tag {
  display: none; /* Deprecated in favor of event-pill */
}
</style>
