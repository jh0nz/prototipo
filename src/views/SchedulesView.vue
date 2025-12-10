<template>
  <div class="schedules-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Horarios de Clases</h1>
        <p class="page-header__subtitle">
          Consulta los horarios de clases por carrera y semestre
        </p>
      </div>
    </header>

    <!-- Filters -->
    <section class="filters section">
      <div class="container">
        <div class="filters__row">
          <!-- Career Select -->
          <div class="filter-group">
            <label for="career-select" class="filter-label">Carrera</label>
            <select 
              id="career-select"
              v-model="selectedCareer"
              class="filter-select"
            >
              <option v-for="career in careers" :key="career.id" :value="career.id">
                {{ career.name }}
              </option>
            </select>
          </div>

          <!-- Semester Select -->
          <div class="filter-group">
            <label for="semester-select" class="filter-label">Semestre</label>
            <select 
              id="semester-select"
              v-model="selectedSemester"
              class="filter-select"
            >
              <option v-for="semester in semesters" :key="semester" :value="semester">
                {{ semester }}° Semestre
              </option>
            </select>
          </div>

          <!-- Export Button -->
          <button class="btn btn-outline" @click="handleExport">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Exportar PDF
          </button>
        </div>
      </div>
    </section>

    <!-- Schedule Table -->
    <section class="schedule section">
      <div class="container">
        <div class="schedule__wrapper">
          <table class="schedule-table" role="grid">
            <thead>
              <tr>
                <th scope="col" class="schedule-table__time-header">Hora</th>
                <th v-for="day in days" :key="day" scope="col">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="timeSlot in timeSlots" :key="timeSlot">
                <td class="schedule-table__time">
                  {{ timeSlot }}
                </td>
                <td 
                  v-for="day in days" 
                  :key="`${day}-${timeSlot}`"
                  class="schedule-table__cell"
                  :class="getCellClass(day, timeSlot)"
                >
                  <div v-if="getScheduleItem(day, timeSlot)" class="schedule-item">
                    <span class="schedule-item__subject">
                      {{ getScheduleItem(day, timeSlot)?.subject }}
                    </span>
                    <span class="schedule-item__professor">
                      {{ getScheduleItem(day, timeSlot)?.professor }}
                    </span>
                    <span class="schedule-item__room">
                      {{ getScheduleItem(day, timeSlot)?.room }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Legend -->
        <div class="schedule__legend">
          <h3>Leyenda de colores por semestre</h3>
          <div class="legend-items">
            <div class="legend-item">
              <span class="legend-color legend-color--1"></span>
              <span>1° Semestre</span>
            </div>
            <div class="legend-item">
              <span class="legend-color legend-color--2"></span>
              <span>2° Semestre</span>
            </div>
            <div class="legend-item">
              <span class="legend-color legend-color--3"></span>
              <span>3° Semestre</span>
            </div>
            <div class="legend-item">
              <span class="legend-color legend-color--4"></span>
              <span>4° Semestre</span>
            </div>
            <div class="legend-item">
              <span class="legend-color legend-color--5"></span>
              <span>5° Semestre +</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToastStore } from '@/stores/toast'
import { usePageSections } from '@/composables/usePageSections'

document.title = 'Horarios - FCyT UMSS'

// Initialize page sections detection
usePageSections()

const toastStore = useToastStore()

const selectedCareer = ref('info')
const selectedSemester = ref(1)

const careers = [
  { id: 'info', name: 'Ingeniería Informática' },
  { id: 'sistemas', name: 'Ingeniería de Sistemas' },
  { id: 'civil', name: 'Ingeniería Civil' },
  { id: 'electronica', name: 'Ingeniería Electrónica' },
  { id: 'industrial', name: 'Ingeniería Industrial' },
  { id: 'quimica', name: 'Ingeniería Química' },
  { id: 'mecanica', name: 'Ingeniería Mecánica' },
  { id: 'electrica', name: 'Ingeniería Eléctrica' }
]

const semesters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

const timeSlots = [
  '07:00 - 08:30',
  '08:45 - 10:15',
  '10:30 - 12:00',
  '12:15 - 13:45',
  '14:00 - 15:30',
  '15:45 - 17:15',
  '17:30 - 19:00'
]

// Sample schedule data
interface ScheduleEntry {
  subject: string
  professor: string
  room: string
  semester: number
}

const scheduleData: Record<string, Record<string, ScheduleEntry>> = {
  'Lunes': {
    '07:00 - 08:30': { subject: 'Cálculo I', professor: 'Ing. García', room: 'Aula 101', semester: 1 },
    '08:45 - 10:15': { subject: 'Programación I', professor: 'Ing. López', room: 'Lab. 201', semester: 1 },
    '10:30 - 12:00': { subject: 'Física I', professor: 'Lic. Mendoza', room: 'Aula 102', semester: 1 },
    '14:00 - 15:30': { subject: 'Álgebra Lineal', professor: 'Ing. Rojas', room: 'Aula 103', semester: 1 }
  },
  'Martes': {
    '07:00 - 08:30': { subject: 'Programación I', professor: 'Ing. López', room: 'Lab. 201', semester: 1 },
    '08:45 - 10:15': { subject: 'Cálculo I', professor: 'Ing. García', room: 'Aula 101', semester: 1 },
    '15:45 - 17:15': { subject: 'Física I (Lab)', professor: 'Lic. Mendoza', room: 'Lab. Física', semester: 1 }
  },
  'Miércoles': {
    '08:45 - 10:15': { subject: 'Álgebra Lineal', professor: 'Ing. Rojas', room: 'Aula 103', semester: 1 },
    '10:30 - 12:00': { subject: 'Introducción a la Ing.', professor: 'Ing. Vargas', room: 'Aula 105', semester: 1 },
    '14:00 - 15:30': { subject: 'Programación I', professor: 'Ing. López', room: 'Lab. 201', semester: 1 }
  },
  'Jueves': {
    '07:00 - 08:30': { subject: 'Cálculo I', professor: 'Ing. García', room: 'Aula 101', semester: 1 },
    '10:30 - 12:00': { subject: 'Física I', professor: 'Lic. Mendoza', room: 'Aula 102', semester: 1 },
    '14:00 - 15:30': { subject: 'Álgebra Lineal', professor: 'Ing. Rojas', room: 'Aula 103', semester: 1 }
  },
  'Viernes': {
    '08:45 - 10:15': { subject: 'Física I', professor: 'Lic. Mendoza', room: 'Aula 102', semester: 1 },
    '10:30 - 12:00': { subject: 'Programación I', professor: 'Ing. López', room: 'Lab. 201', semester: 1 },
    '12:15 - 13:45': { subject: 'Introducción a la Ing.', professor: 'Ing. Vargas', room: 'Aula 105', semester: 1 }
  }
}

function getScheduleItem(day: string, timeSlot: string): ScheduleEntry | null {
  return scheduleData[day]?.[timeSlot] || null
}

function getCellClass(day: string, timeSlot: string): string {
  const item = getScheduleItem(day, timeSlot)
  if (!item) return ''
  return `schedule-table__cell--semester-${Math.min(item.semester, 5)}`
}

function handleExport() {
  toastStore.info('La función de exportar PDF estará disponible próximamente')
}
</script>

<style scoped>
.schedules-page {
  min-height: 100vh;
}

/* Page Header */
.page-header {
  padding: var(--spacing-6) 0 var(--spacing-8);
  background: linear-gradient(135deg, var(--color-secondary) 0%, #002D7A 100%);
  color: white;
  margin-bottom: var(--spacing-4);
}

.page-header__title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  color: white;
}

.page-header__subtitle {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  max-width: 600px;
  margin: 0;
}

/* Filters */
.filters {
  background-color: var(--color-surface);
  padding: var(--spacing-6) 0;
}

.filters__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  align-items: flex-end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  min-width: 200px;
}

.filter-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-dark);
}

.filter-select {
  padding: var(--spacing-3) var(--spacing-4);
  font-size: var(--font-size-base);
  color: var(--color-neutral-dark);
  background-color: var(--color-surface);
  border: 2px solid var(--color-neutral-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-select:hover {
  border-color: var(--color-secondary);
}

.filter-select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

/* Schedule Table */
.schedule {
  background-color: var(--color-surface-variant);
  padding-top: 0;
}

.schedule__wrapper {
  overflow-x: auto;
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-8);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.schedule-table th,
.schedule-table td {
  padding: var(--spacing-3);
  text-align: center;
  border: 1px solid var(--color-neutral-light);
}

.schedule-table th {
  background-color: var(--color-secondary);
  color: white;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-4);
}

.schedule-table__time-header {
  width: 120px;
}

.schedule-table__time {
  background-color: var(--color-surface-variant);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-dark);
  white-space: nowrap;
}

.schedule-table__cell {
  vertical-align: top;
  padding: var(--spacing-2);
  min-height: 80px;
  transition: background-color var(--transition-fast);
}

.schedule-table__cell:hover {
  background-color: var(--color-surface-variant);
}

/* Semester colors */
.schedule-table__cell--semester-1 { background-color: rgba(0, 61, 165, 0.1); }
.schedule-table__cell--semester-2 { background-color: rgba(0, 61, 165, 0.2); }
.schedule-table__cell--semester-3 { background-color: rgba(0, 61, 165, 0.3); }
.schedule-table__cell--semester-4 { background-color: rgba(0, 61, 165, 0.4); }
.schedule-table__cell--semester-5 { background-color: rgba(0, 61, 165, 0.5); }

.schedule-table__cell--semester-5 .schedule-item__subject,
.schedule-table__cell--semester-5 .schedule-item__professor,
.schedule-table__cell--semester-5 .schedule-item__room {
  color: white;
}

/* Schedule Item */
.schedule-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
}

.schedule-item__subject {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
}

.schedule-item__professor {
  font-size: 10px;
  color: #6B7280;
}

.schedule-item__room {
  font-size: 10px;
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
}

/* Legend */
.schedule__legend {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

.schedule__legend h3 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-4);
}

.legend-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-6);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: #6B7280;
}

.legend-color {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-sm);
}

.legend-color--1 { background-color: rgba(0, 61, 165, 0.1); }
.legend-color--2 { background-color: rgba(0, 61, 165, 0.2); }
.legend-color--3 { background-color: rgba(0, 61, 165, 0.3); }
.legend-color--4 { background-color: rgba(0, 61, 165, 0.4); }
.legend-color--5 { background-color: rgba(0, 61, 165, 0.5); }
</style>
