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
            'month-day--other-month': !day.isCurrentMonth,
            'month-day--has-events': getEventsForDay(day.dateStr).length > 0
          }"
          @click="openDayModal(day)"
          role="button"
          tabindex="0"
          :aria-label="`Ver eventos del día ${day.dayNumber}`"
        >
          <div class="day-number">{{ day.dayNumber }}</div>
          
          <div class="day-events-stack">
            <div 
              v-for="event in getEventsForDay(day.dateStr).slice(0, 3)" 
              :key="event.id"
              class="event-pill"
              :class="`event-pill--${event.category}`"
              :title="event.title"
            >
              {{ event.title }}
            </div>
            <div v-if="getEventsForDay(day.dateStr).length > 3" class="event-more">
              +{{ getEventsForDay(day.dateStr).length - 3 }} más
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed } from 'vue'
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
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.month-day:hover {
  background: #F8FAFC;
  transform: scale(1.02);
  z-index: 1;
}

.month-day--other-month {
  background: #FAFAFA;
  color: #AAA;
  cursor: default;
}

.month-day--other-month:hover {
  background: #FAFAFA;
  transform: none;
}

.month-day--today {
  background: #F0F9FF;
  border: 2px solid var(--color-primary);
}

.month-day--has-events {
  font-weight: 500;
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
  text-align: left;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1px;
  pointer-events: none;
}

.event-more {
  font-size: 10px;
  color: #64748B;
  font-weight: 600;
  padding: 2px 6px;
  text-align: center;
  margin-top: 2px;
}

.event-pill--exams { background: #FEF3C7; color: #92400E; }
.event-pill--procedures { background: #DBEAFE; color: #1E40AF; }
.event-pill--news { background: #F3F0FF; color: #7C3AED; }
.event-pill--holidays { background: #F1F5F9; color: #475569; }
.event-pill--events { background: #D1FAE5; color: #065F46; }

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
