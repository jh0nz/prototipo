<template>
  <section id="calendar" class="weekly-calendar section" aria-label="Calendario Semanal">
    <div class="container">
      <div class="calendar-header">
        <h2 class="section-title">Agenda Semanal</h2>
        <div class="calendar-controls">
          <button @click="prevWeek" class="btn-control" aria-label="Semana anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <span class="current-month">{{ currentMonthName }} {{ currentYear }}</span>
          <button @click="nextWeek" class="btn-control" aria-label="Semana siguiente">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        >
          <div class="day-header">
            <span class="day-name">{{ day.dayName }}</span>
            <div class="day-number-wrapper">
              <span class="day-number">{{ day.dayNumber }}</span>
              <span v-if="day.isToday" class="day-today-label">HOY</span>
            </div>
          </div>

          <div class="day-events">
            <div 
              v-for="event in getEventsForDay(day.dateStr)" 
              :key="event.id"
              class="event-card"
              :class="{ 
                'event-card--past': day.isPast,
                'event-card--urgent': event.isUrgent || (isUpcoming(day.dateStr) && !day.isPast)
              }"
              @click="openEventModal(event)"
            >
              <div class="event-card__indicator" :class="`indicator--${event.type}`"></div>
              <div class="event-card__content">
                <div class="event-card__header">
                  <span class="event-time" v-if="event.time">{{ event.time }}</span>
                  <span class="event-badge" v-if="event.type === 'urgent'">!</span>
                </div>
                <h4 class="event-title">{{ event.title }}</h4>
                <div v-if="isUpcoming(day.dateStr) && !day.isPast" class="event-alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Próximo
                </div>
              </div>
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
                <p v-if="selectedEvent.time" class="modal-time">Hora: {{ selectedEvent.time }}</p>
                <p>{{ selectedEvent.description }}</p>
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
import type { TimelineEvent } from '@/types'

// State
const currentDate = ref(new Date()) // Start with today
const selectedEvent = ref<TimelineEvent | null>(null)
const events = eventsData as TimelineEvent[]

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
  return events.filter(e => e.date === dateStr)
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
  selectedEvent.value = event
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

.current-month {
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-lg);
  min-width: 150px;
  text-align: center;
  text-transform: capitalize;
}

/* Calendar Grid */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--spacing-2);
}

.calendar-day {
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-md);
  min-height: 200px;
  padding: var(--spacing-2);
  border: 2px solid transparent;
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
}

.calendar-day--today {
  background-color: white;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 10;
  transform: scale(1.02);
}

.calendar-day--past {
  opacity: 0.7;
  background-color: #f8f9fa;
}

.day-header {
  text-align: center;
  margin-bottom: var(--spacing-4);
  padding: var(--spacing-2) 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.day-name {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-secondary);
  margin-bottom: 2px;
}

.day-number-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.day-number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-dark);
  line-height: 1;
}

.day-today-label {
  font-size: 10px;
  background-color: var(--color-primary);
  color: white;
  padding: 1px 6px;
  border-radius: var(--radius-full);
  margin-top: 4px;
  font-weight: bold;
}

.day-events {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  flex: 1;
}

/* Event Card */
.event-card {
  background: white;
  border-radius: var(--radius-sm);
  padding: var(--spacing-2);
  box-shadow: var(--shadow-sm);
  border-left: 3px solid var(--color-primary);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  gap: var(--spacing-2);
}

.indicator--info { border-left-color: var(--color-info); }
.indicator--warning { border-left-color: var(--color-warning); }
.indicator--urgent { border-left-color: var(--color-error); }
.indicator--success { border-left-color: var(--color-success); }

.event-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.event-card--past {
  filter: grayscale(1);
  opacity: 0.6;
}

.event-card--urgent {
  background-color: #FFF5F5;
  border-left-color: var(--color-error);
}

.event-card__content {
  flex: 1;
  min-width: 0;
}

.event-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.event-time {
  font-size: 10px;
  color: var(--color-secondary);
  font-weight: bold;
}

.event-badge {
  background: var(--color-error);
  color: white;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

.event-title {
  font-size: 11px;
  font-weight: var(--font-weight-medium);
  margin: 0;
  line-height: 1.3;
  color: var(--color-neutral-dark);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-alert {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  color: var(--color-error);
  font-weight: bold;
  margin-top: 4px;
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
</style>
