<template>
  <div class="calendar-page">
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Calendario Académico y Eventos</h1>
        <p class="page-header__subtitle">
          Consulta todas las actividades, exámenes, trámites y noticias de la facultad
        </p>
      </div>
    </header>

    <div class="container section">
      <!-- Toolbar -->
      <div class="calendar-toolbar">
        <div class="month-nav">
          <button @click="prevMonth" class="btn-icon" aria-label="Mes anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <h2 class="current-month">{{ currentMonthName }} {{ currentYear }}</h2>
          <button @click="nextMonth" class="btn-icon" aria-label="Mes siguiente">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
          <button @click="goToToday" class="btn btn-sm btn-outline">Hoy</button>
        </div>

        <div class="filters">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            class="filter-chip"
            :class="{ 'filter-chip--active': activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            {{ filter.icon }} {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Month Grid -->
      <div class="month-grid">
        <!-- Weekday Headers -->
        <div class="weekday-header" v-for="day in weekDaysNames" :key="day">{{ day }}</div>

        <!-- Days -->
        <div 
          v-for="(day, index) in calendarDays" 
          :key="index"
          class="month-day"
          :class="{ 
            'month-day--today': day.isToday,
            'month-day--other-month': !day.isCurrentMonth
          }"
        >
          <div class="day-number">{{ day.dayNumber }}</div>
          
          <div class="day-events-stack">
            <button 
              v-for="event in getEventsForDay(day.dateStr)" 
              :key="event.id"
              class="event-pill"
              :class="`event-pill--${event.category}`"
              @click="openEventModal(event)"
              :title="event.title"
            >
              {{ event.title }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Event Modal -->
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import eventsData from '@/data/calendar-events.json'
import noticiasData from '@/data/noticias.json'
import type { TimelineEvent } from '@/types'

// Setup
useMeta({ title: 'Calendario - FCyT UMSS' })

function useMeta(arg0: { title: string }) {
  document.title = arg0.title
}

const currentDate = ref(new Date())
const activeFilter = ref('all')
const selectedEvent = ref<TimelineEvent | null>(null)

const filters = [
  { label: 'Todos', value: 'all', icon: '📅' },
  { label: 'Exámenes', value: 'exams', icon: '📝' },
  { label: 'Trámites', value: 'procedures', icon: '📄' },
  { label: 'Eventos', value: 'events', icon: '🎓' },
  { label: 'Feriados', value: 'holidays', icon: '🎉' },
  { label: 'Noticias', value: 'news', icon: '📰' }
]

const weekDaysNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']

// Merge logic
const allEvents: TimelineEvent[] = [
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

const filteredEvents = computed(() => {
  if (activeFilter.value === 'all') return allEvents
  return allEvents.filter(e => e.category === activeFilter.value)
})

// Calendar Logic
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleDateString('es-BO', { month: 'long' }).replace(/^\w/, c => c.toUpperCase())
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  
  const startDayOfWeek = firstDayOfMonth.getDay() // 0 (Sun) - 6 (Sat)
  const daysInMonth = lastDayOfMonth.getDate()
  
  const days = []
  
  // Previous month fill
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
     const d = new Date(year, month - 1, prevMonthLastDay - i)
     days.push({
       date: d,
       dateStr: formatDateStr(d),
       dayNumber: d.getDate(),
       isCurrentMonth: false,
       isToday: false
     })
  }
  
  // Current month
  const todayStr = formatDateStr(new Date())
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i)
    const dStr = formatDateStr(d)
    days.push({
      date: d,
      dateStr: dStr,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: dStr === todayStr
    })
  }
  
  // Next month fill to complete 42 (6 rows) or 35 (5 rows)
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i)
    days.push({
       date: d,
       dateStr: formatDateStr(d),
       dayNumber: i,
       isCurrentMonth: false,
       isToday: false
     })
  }
  
  return days
})

function getEventsForDay(dateStr: string) {
  return filteredEvents.value.filter(e => e.date === dateStr)
}

function formatDateStr(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

function goToToday() {
  currentDate.value = new Date()
}

function openEventModal(event: TimelineEvent) {
  selectedEvent.value = event
}

function formatDateFull(dateStr: string) {
  const parts = dateStr.split('-').map(Number)
  const year = parts[0] || 0
  const month = parts[1] || 0
  const day = parts[2] || 0
  
  if (!year || !month || !day) return dateStr
  
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' })
}
</script>

<style scoped>
/* Page Header */
.page-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
  color: white;
  padding: 40px 0;
  margin-bottom: 40px;
}

.page-header__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
  color: white;
}

.page-header__subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0;
  max-width: 600px;
}

.calendar-page {
  padding-bottom: var(--spacing-12);
}

.calendar-toolbar {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

@media (min-width: 768px) {
  .calendar-toolbar {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.month-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.current-month {
  margin: 0;
  min-width: 200px;
  text-align: center;
  text-transform: capitalize;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: 50%;
  transition: background-color var(--transition-fast);
}

.btn-icon:hover {
  background-color: var(--color-neutral-light);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
}

.filter-chip {
  background: white;
  border: 1px solid var(--color-neutral-light);
  padding: 6px 12px;
  border-radius: var(--radius-full);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: 6px;
}

.filter-chip:hover {
  border-color: var(--color-primary);
}

.filter-chip--active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-color: var(--color-primary);
  font-weight: 600;
}

/* Month Grid */
.month-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: var(--color-neutral-light);
  gap: 1px;
  border: 1px solid var(--color-neutral-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.weekday-header {
  background: white;
  padding: var(--spacing-3);
  text-align: center;
  font-weight: bold;
  font-size: 13px;
  color: var(--color-secondary);
}

.month-day {
  background: white;
  min-height: 120px;
  padding: var(--spacing-2);
  display: flex;
  flex-direction: column;
}

.month-day--other-month {
  background: #FAFAFA;
  color: #AAA;
}

.month-day--today {
  background: #F0F9FF;
}

.day-number {
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.month-day--today .day-number {
  background: var(--color-primary);
  color: white;
}

.day-events-stack {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.event-pill {
  border: none;
  text-align: left;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
  transition: opacity 0.2s;
}

.event-pill:hover {
  opacity: 0.8;
}

.event-pill--exams { background: #FEF3C7; color: #92400E; }
.event-pill--procedures { background: #DBEAFE; color: #1E40AF; }
.event-pill--news { background: #F3F0FF; color: #7C3AED; }
.event-pill--holidays { background: #F1F5F9; color: #475569; }
.event-pill--events { background: #D1FAE5; color: #065F46; }

/* Modal Styles Reuse */
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

@media (max-width: 768px) {
  .month-grid {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  
  .weekday-header {
    display: none;
  }
  
  .month-day {
    min-height: auto;
    border-bottom: 1px solid var(--color-neutral-light);
  }
  
  .month-day--other-month {
    display: none; /* Hide other month days on mobile list view */
  }
  
  .day-number {
    margin-bottom: var(--spacing-2);
  }
}
</style>
