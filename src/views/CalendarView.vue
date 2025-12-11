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

    <div class="container section" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div v-if="loading" class="calendar-skeleton">
        <div class="skeleton-toolbar">
          <div class="skeleton-nav"></div>
          <div class="skeleton-filters">
            <div v-for="n in 6" :key="n" class="skeleton-filter"></div>
          </div>
        </div>
        <div class="skeleton-calendar-grid">
          <div v-for="n in 42" :key="n" class="skeleton-calendar-cell"></div>
        </div>
      </div>
      
      <template v-else>
        <!-- Toolbar -->
        <div class="calendar-toolbar">
          <div class="month-nav">
            <button @click="prevMonth" class="btn-icon" aria-label="Mes anterior" title="Ir al mes anterior">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <h2 class="current-month">{{ currentMonthName }} {{ currentYear }}</h2>
            <button @click="nextMonth" class="btn-icon" aria-label="Mes siguiente" title="Ir al mes siguiente">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
            <button @click="goToToday" class="btn btn-sm btn-outline" title="Volver al día actual">Hoy</button>
          </div>

          <div class="filters">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              class="filter-chip"
              :class="[{ 'filter-chip--active': activeFilter === filter.value }, `filter-chip--${filter.value}`]"
              @click="activeFilter = filter.value"
              :title="filter.tooltip"
            >
              <span class="filter-icon" :class="`filter-icon--${filter.value}`">
                <svg v-if="filter.value === 'all'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <svg v-else-if="filter.value === 'exams'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
                <svg v-else-if="filter.value === 'procedures'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
                <svg v-else-if="filter.value === 'events'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                <svg v-else-if="filter.value === 'holidays'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <svg v-else-if="filter.value === 'news'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                  <path d="M18 14h-8"/>
                  <path d="M15 18h-5"/>
                  <path d="M10 6h8v4h-8z"/>
                </svg>
              </span>
              <span>{{ filter.label }}</span>
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
            'month-day--other-month': !day.isCurrentMonth,
            'month-day--has-events': getEventsForDay(day.dateStr).length > 0
          }"
          @click="openDayModal(day)"
          role="button"
          tabindex="0"
          :aria-label="`Ver eventos del día ${day.dayNumber}`"
          :title="getEventsForDay(day.dateStr).length > 0 ? `${getEventsForDay(day.dateStr).length} evento${getEventsForDay(day.dateStr).length > 1 ? 's' : ''} - Haz clic para ver detalles` : day.isCurrentMonth ? 'Sin eventos programados' : ''"
        >
          <div class="day-header-cell">
            <div class="day-number">{{ day.dayNumber }}</div>
            <div v-if="getEventsForDay(day.dateStr).length > 0" class="event-count">
              {{ getEventsForDay(day.dateStr).length }}
            </div>
          </div>
          
          <div class="day-events-stack">
            <div 
              v-for="event in getEventsForDay(day.dateStr).slice(0, 2)" 
              :key="event.id"
              class="event-pill"
              :class="[
                `event-pill--${event.category}`,
                { 'event-pill--past': !day.isCurrentMonth || (day.dateStr < formatDateStr(new Date())) }
              ]"
              :title="event.title"
            >
              <span class="event-indicator" :class="[
                `event-indicator--${event.category}`,
                { 'event-indicator--past': !day.isCurrentMonth || (day.dateStr < formatDateStr(new Date())) }
              ]"></span>
              <span class="event-title">{{ event.title }}</span>
            </div>
            <div v-if="getEventsForDay(day.dateStr).length > 2" class="event-more">
              +{{ getEventsForDay(day.dateStr).length - 2 }} más
            </div>
          </div>
        </div>
      </div>
      </template>
    </div>

    <!-- Day Modal -->
    <DayEventsModal 
      :selected-day="selectedDay" 
      :events="selectedDay ? getEventsForDay(selectedDay.dateStr) : []"
      @close="selectedDay = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import eventsData from '@/data/calendar-events.json'
import noticiasData from '@/data/noticias.json'
import type { TimelineEvent } from '@/types'
import DayEventsModal from '@/components/calendar/DayEventsModal.vue'

// Setup
const router = useRouter()
useMeta({ title: 'Calendario - FCyT UMSS' })

function useMeta(arg0: { title: string }) {
  document.title = arg0.title
}

const currentDate = ref(new Date())
const activeFilter = ref('all')
const selectedDay = ref<any>(null)
const loading = ref(true)

onMounted(() => {
  // Simulate calendar data loading
  setTimeout(() => { loading.value = false }, 500)
})

const filters = [
  { label: 'Todos', value: 'all', tooltip: 'Mostrar todos los eventos del calendario' },
  { label: 'Exámenes', value: 'exams', tooltip: 'Filtrar solo exámenes y evaluaciones' },
  { label: 'Trámites', value: 'procedures', tooltip: 'Filtrar trámites administrativos y académicos' },
  { label: 'Eventos', value: 'events', tooltip: 'Filtrar eventos académicos y actividades' },
  { label: 'Feriados', value: 'holidays', tooltip: 'Filtrar días feriados y no laborables' },
  { label: 'Noticias', value: 'news', tooltip: 'Filtrar publicaciones de noticias importantes' }
]

const weekDaysNames = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']

// Merge logic
const allEvents: TimelineEvent[] = [
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
  
  // Filter days for mobile when a filter is active
  const isMobile = window.innerWidth < 768
  if (isMobile && activeFilter.value !== 'all') {
    const todayStr = formatDateStr(new Date())
    return days.filter(day => {
      // Always show today
      if (day.dateStr === todayStr) return true
      // Only show days with events matching the current filter
      const dayEvents = getEventsForDay(day.dateStr)
      return dayEvents.length > 0
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

function openDayModal(day: any) {
  if (!day.isCurrentMonth) return
  selectedDay.value = day
}

function handleEventClick(event: TimelineEvent) {
  if (event.category === 'news' && event.newsId) {
    router.push(`/noticias/${event.newsId}`)
  } else if (event.ctaLink && event.ctaLink !== '#') {
    window.open(event.ctaLink, '_blank')
  }
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

function goToNews(id: number) {
  router.push(`/noticias/${id}`)
}

</script>

<style scoped>
/* Page Header */
.page-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
  color: white;
  padding: 40px 0;
  margin-bottom: 40px;
  min-height: 220px;
  display: flex;
  align-items: center;
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
  border: 2px solid var(--color-neutral-light);
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-chip:hover {
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-chip--active {
  font-weight: 600;
}

.filter-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.filter-icon svg {
  width: 14px;
  height: 14px;
}

/* Filter colors matching event categories */
.filter-chip--all .filter-icon {
  background: #E2E8F0;
}

.filter-chip--exams .filter-icon {
  background: #FEF3C7;
}

.filter-chip--exams.filter-chip--active {
  background: #FEF3C7;
  border-color: #F59E0B;
  color: #92400E;
}

.filter-chip--procedures .filter-icon {
  background: #DBEAFE;
}

.filter-chip--procedures.filter-chip--active {
  background: #DBEAFE;
  border-color: #3B82F6;
  color: #1E40AF;
}

.filter-chip--events .filter-icon {
  background: #D1FAE5;
}

.filter-chip--events.filter-chip--active {
  background: #D1FAE5;
  border-color: #10B981;
  color: #065F46;
}

.filter-chip--holidays .filter-icon {
  background: #F1F5F9;
}

.filter-chip--holidays.filter-chip--active {
  background: #F1F5F9;
  border-color: #64748B;
  color: #475569;
}

.filter-chip--news .filter-icon {
  background: #F3F0FF;
}

.filter-chip--news.filter-chip--active {
  background: #F3F0FF;
  border-color: #9333EA;
  color: #7C3AED;
}

.filter-chip--all.filter-chip--active {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
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
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.month-day {
  background: white;
  height: 110px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.month-day:hover {
  background: #F8FAFC;
  box-shadow: inset 0 0 0 2px var(--color-primary-light);
}

.month-day--other-month {
  background: #FAFAFA;
  color: #AAA;
  cursor: default;
  opacity: 0.5;
}

.month-day--other-month:hover {
  background: #FAFAFA;
  box-shadow: none;
}

.month-day--today {
  background: #F0F9FF;
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

.month-day--has-events {
  font-weight: 500;
}

.day-header-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  min-height: 24px;
}

.day-number {
  font-weight: 600;
  font-size: 14px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.month-day--today .day-number {
  background: var(--color-primary);
  color: white;
}

.event-count {
  background: var(--color-primary-light);
  color: var(--color-primary);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.day-events-stack {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
  overflow: hidden;
}

.event-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: left;
  font-size: 11px;
  padding: 4px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  pointer-events: none;
  border-left: 3px solid transparent;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.event-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-more {
  font-size: 10px;
  color: #64748B;
  font-weight: 600;
  padding: 4px 6px;
  text-align: center;
  margin-top: auto;
  background: #F1F5F9;
  border-radius: 4px;
}

.event-pill--exams { 
  background: #FEF3C7; 
  color: #92400E; 
  border-left-color: #F59E0B;
}
.event-indicator--exams { background: #F59E0B; }

.event-pill--procedures { 
  background: #DBEAFE; 
  color: #1E40AF; 
  border-left-color: #3B82F6;
}
.event-indicator--procedures { background: #3B82F6; }

.event-pill--news { 
  background: #F3F0FF; 
  color: #7C3AED; 
  border-left-color: #9333EA;
}
.event-indicator--news { background: #9333EA; }

.event-pill--holidays { 
  background: #F1F5F9; 
  color: #475569; 
  border-left-color: #64748B;
}
.event-indicator--holidays { background: #64748B; }

.event-pill--events { 
  background: #D1FAE5; 
  color: #065F46; 
  border-left-color: #10B981;
}
.event-indicator--events { background: #10B981; }

/* Past events - more subtle colors */
.event-pill--past {
  opacity: 0.5;
  filter: grayscale(0.4);
}

.event-indicator--past {
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .month-day {
    height: 90px;
    padding: 6px;
  }
  
  .day-number {
    font-size: 12px;
    width: 20px;
    height: 20px;
  }
  
  .event-count {
    font-size: 10px;
    padding: 1px 4px;
  }
  
  .event-pill {
    font-size: 10px;
    padding: 3px 4px;
    gap: 4px;
  }
  
  .event-indicator {
    width: 5px;
    height: 5px;
  }
  
  .weekday-header {
    font-size: 11px;
    height: 32px;
  }
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

/* Skeleton Styles */
.calendar-skeleton {
  animation: fadeIn 0.3s ease;
}

.skeleton-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  gap: var(--spacing-4);
}

.skeleton-nav {
  height: 40px;
  width: 300px;
  background-color: #E2E8F0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.skeleton-nav::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.skeleton-filters {
  display: flex;
  gap: var(--spacing-2);
  flex-wrap: wrap;
}

.skeleton-filter {
  height: 36px;
  width: 100px;
  background-color: #E2E8F0;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.skeleton-filter::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

.skeleton-calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-2);
}

.skeleton-calendar-cell {
  height: 110px;
  background-color: #E2E8F0;
  border: 1px solid #CBD5E1;
  border-radius: 8px;
  padding: var(--spacing-2);
  position: relative;
  overflow: hidden;
}

.skeleton-calendar-cell::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
