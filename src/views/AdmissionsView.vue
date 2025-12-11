<template>
  <div class="admissions-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container header-content">
        <div class="header-text">
          <h1 class="page-header__title">Convocatoria Examen de Ingreso I-2026</h1>
          <p class="page-header__subtitle">
            Semestre I - 2026<br>
            Facultad de Ciencias y Tecnología
          </p>
        </div>
        
        <!-- Countdown Widget -->
        <div class="header-countdown">
          <div class="countdown-label">Tiempo restante para Primera Opción:</div>
          <div class="countdown-timer">
            <div class="timer-block">
              <span class="timer-value">{{ countdown.days }}</span>
              <span class="timer-unit">Días</span>
            </div>
            <div class="timer-separator">:</div>
            <div class="timer-block">
              <span class="timer-value">{{ countdown.hours }}</span>
              <span class="timer-unit">Horas</span>
            </div>
            <div class="timer-separator">:</div>
            <div class="timer-block">
              <span class="timer-value">{{ countdown.minutes }}</span>
              <span class="timer-unit">Min</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Grid: Checklist + Timeline -->
    <section id="requisitos" class="section container" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div v-if="loading" class="skeleton-admissions">
        <div class="skeleton-column">
          <div class="skeleton-header"></div>
          <div v-for="n in 5" :key="n" class="skeleton-req-card"></div>
        </div>
        <div class="skeleton-column">
          <div class="skeleton-header"></div>
          <div class="skeleton-timeline"></div>
        </div>
      </div>
      
      <div v-else class="main-grid">
        
        <div class="requirements-column">
          <div class="column-header">
            <h2 class="section-title">Requisitos</h2>
            <p class="section-desc">Marca los pasos completados para llevar un control de tu inscripción.</p>
          </div>
          
          <div class="checklist-container">
            <div 
              v-for="req in requirements" 
              :key="req.id"
              class="req-card" 
              :class="{ 'req-card--checked': isChecked(req.id) }"
              @click="toggleReq(req.id)"
            >
              <div class="checkbox-custom">
                <span v-if="isChecked(req.id)" class="mdi mdi-check"></span>
              </div>
              <div class="req-content">
                <div class="req-title-group">
                  <span class="mdi req-icon" :class="`mdi-${req.icon}`"></span>
                  <h3>{{ req.title }}</h3>
                </div>
                <p v-html="req.description"></p>
                <div v-if="req.specs" class="photo-specs">
                  <span v-for="spec in req.specs" :key="spec" class="spec-tag">{{ spec }}</span>
                </div>
              </div>
              <div v-if="req.tooltip" class="tooltip-icon" :title="req.tooltip">
                <span class="mdi mdi-information-outline"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Exam Timeline -->
        <div class="timeline-column">
          <div class="timeline-sidebar">
            <div class="sidebar-header">
              <div class="header-title-group">
                <span class="mdi mdi-calendar-clock header-icon"></span>
                <h3 class="sidebar-title">Fechas de Examen</h3>
              </div>
            </div>
            
            <div class="vertical-timeline">
              <div v-for="(option, idx) in examOptions" :key="idx" class="v-timeline-item">
                <div class="v-timeline-marker" :class="option.class"></div>
                <div class="v-timeline-content">
                  <span class="v-date">{{ option.date }}</span>
                  <h4>{{ option.title }}</h4>
                  <p>{{ option.inscription }}</p>
                </div>
              </div>
            </div>

            <div class="sidebar-info-box">
               <div class="info-icon-wrapper">
                 <span class="mdi mdi-map-marker"></span>
               </div>
               <div class="info-content">
                 <strong>Lugar del Examen</strong>
                 <a href="https://maps.app.goo.gl/q94NuABAk8gGb2MH9" target="_blank" rel="noopener noreferrer" class="location-link" title="Ver ubicación en Google Maps">
                   <span class="mdi mdi-open-in-new"></span>
                   Edificio Académico 2, FCyT
                 </a>
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Costos Section (Simplified) -->
    <section id="costos" class="section container" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
        <div class="costs-header">
          <div>
            <h2 class="section-title">Costos</h2>
            <p class="costs-subtitle">Tarifas oficiales para el examen de ingreso I-2026. Incluye carpeta, material impreso y credencial.</p>
          </div>
          <div class="costs-pill">
            <span class="mdi mdi-check-circle"></span>
            Pago único • Recibo digital
          </div>
        </div>

        <div class="costs-grid">
          <article class="cost-card">
            <header class="cost-card__header">
              <span class="cost-chip">General</span>
              <strong class="cost-amount">Bs 600</strong>
            </header>
            <ul class="cost-details">
              <li>Postulantes nuevos nacionales o extranjeros</li>
              <li>Incluye certificación médica básica</li>
              <li>Pago habilitado en QR, Banco Unión y Caja Facultativa</li>
            </ul>
          </article>

          <article class="cost-card cost-card--alt">
            <header class="cost-card__header">
              <span class="cost-chip cost-chip--success">Estudiantes Pre-U</span>
              <strong class="cost-amount">Bs 200</strong>
            </header>
            <ul class="cost-details">
              <li>Disponible para estudiantes de programas Pre-Universitarios</li>
              <li>Requiere certificado de aprobación del curso</li>
              <li>Mismos canales de pago habilitados</li>
            </ul>
          </article>
        </div>

        <div class="costs-footer">
          <div class="info-icon-wrapper info-icon-wrapper--warning">
            <span class="mdi mdi-alert-circle-outline"></span>
          </div>
          <p>Recuerda conservar el comprobante original. Presentarlo junto al formulario impreso el día de tu opción.</p>
        </div>
    </section>

    <!-- Full Details Expandable or Detailed Section Below -->
    <section id="cronograma" class="section container" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
        <h2 class="section-title">Cronograma Detallado</h2>
        <div class="timeline-options">
          <div v-for="option in timelineOptions" :key="option.number" class="timeline-card">
            <div class="timeline-header" :class="option.class">
              <h3>{{ option.number }}ª Opción</h3>
              <span class="mdi" :class="`mdi-numeric-${option.number}-circle`"></span>
            </div>
            <div class="timeline-body">
              <div class="t-row"><strong>Llenado:</strong> {{ option.fill }}</div>
              <div class="t-row"><strong>Pago QR:</strong> {{ option.payment }}</div>
              <div class="t-row highlight"><strong>Examen:</strong> {{ option.exam }}</div>
            </div>
          </div>
        </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePageSections } from '@/composables/usePageSections'

document.title = 'Admisión I-2026 - FCyT UMSS'
usePageSections()

const loading = ref(true)

const requirements = [
  {id: '1', title: 'Ser Bachiller', description: 'Diploma de bachiller o libreta escolar.', icon: 'school', tooltip: 'Documento oficial que acredite la culminación de estudios secundarios'},
  {id: '2', title: 'Formulario de Datos', description: 'Llenar e imprimir en <a href="https://admision.fcyt.umss.edu.bo" target="_blank">admision.fcyt.umss.edu.bo</a>', icon: 'file-document-edit', tooltip: 'El formulario debe ser impreso y presentado el día del examen'},
  {id: '3', title: 'Fotografía Digital', description: 'Formato requerido:', specs: ['Fondo blanco', '300x300 px', 'JPG', 'Máx 50 KB'], icon: 'camera', tooltip: 'La fotografía debe cumplir con las especificaciones técnicas indicadas'},
  {id: '4', title: 'Pago de Inscripción', description: 'Realizar el pago QR o en Caja Facultativa según cronograma.', icon: 'credit-card', tooltip: 'Conserva el comprobante de pago para presentarlo el día del examen'}
]

const examOptions = [
  {date: 'Viernes 16 Ene', title: 'Primera Opción', inscription: 'Inscripciones: 5 - 8 Ene', class: 'primary'},
  {date: 'Lunes 2 Feb', title: 'Segunda Opción', inscription: 'Inscripciones: 21 - 23 Ene', class: 'secondary'},
  {date: 'Jueves 13 Feb', title: 'Tercera Opción', inscription: 'Inscripciones: 4 - 6 Feb', class: 'accent'}
]

const timelineOptions = [
  {number: 1, fill: '5-8 Ene', payment: '9-11 Ene', exam: '16 Ene', class: 'primary'},
  {number: 2, fill: '21-23 Ene', payment: '26-28 Ene', exam: '2 Feb', class: 'secondary'},
  {number: 3, fill: '4-6 Feb', payment: '7-9 Feb', exam: '13 Feb', class: 'accent'}
]

// Checklist Logic
const checkedReqs = ref<string[]>([])
const STORAGE_KEY = 'fcyt_admission_checklist_v2'

function isChecked(id: string) {
  return checkedReqs.value.includes(id)
}

function toggleReq(id: string) {
  if (isChecked(id)) {
    checkedReqs.value = checkedReqs.value.filter(i => i !== id)
  } else {
    checkedReqs.value.push(id)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedReqs.value))
}

// Countdown
const countdown = ref({ days: 0, hours: 0, minutes: 0 })
let countdownInterval: number | null = null

function updateCountdown() {
    const target = new Date('2026-01-05T09:00:00') 
    const now = new Date()
    const diff = target.getTime() - now.getTime()
    if (diff > 0) {
        countdown.value = {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        }
    } else {
        countdown.value = { days: 0, hours: 0, minutes: 0 }
    }
}

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) checkedReqs.value = JSON.parse(saved)
  
  updateCountdown()
  countdownInterval = window.setInterval(updateCountdown, 60000)
  
  // Simulate loading
  setTimeout(() => { loading.value = false }, 500)
})
</script>

<style scoped>
.admissions-page { min-height: 100vh; }

/* Header */
.page-header {
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
  color: white;
  padding: 40px 0;
  margin-bottom: 40px; /* Add margin bottom */
  min-height: 220px;
  display: flex;
  align-items: center;
}
.header-content { display: flex; justify-content: space-between; align-items: center; gap: 32px; }
.page-header__title { font-size: 2rem; font-weight: bold; margin-bottom: 8px; color: white; }
.header-countdown { background: rgba(255,255,255,0.15); padding: 16px; border-radius: 12px; text-align: center; }
.countdown-timer { display: flex; gap: 12px; align-items: center; }
.timer-value { font-size: 2rem; font-weight: bold; line-height: 1; }
.timer-unit { font-size: 0.7rem; }

@media (max-width: 768px) {
  .header-content { flex-direction: column; text-align: center; }
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-8);
  margin-top: var(--spacing-6);
}

@media (max-width: 900px) {
  .main-grid { grid-template-columns: 1fr; }
}

/* Checklist Cards */
.checklist-container { display: flex; flex-direction: column; gap: 14px; }

.req-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  position: relative;
  transition: all 0.25s ease;
  cursor: pointer;
}

.req-card:hover { 
  border-color: var(--color-primary); 
  box-shadow: 0 4px 12px rgba(0, 61, 165, 0.1);
  transform: translateY(-2px);
}
.req-card--checked { 
  border-color: var(--color-success); 
  background: #FAFAFA;
}

.column-header {
  margin-bottom: 24px;
}

.header-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.header-icon {
  font-size: 28px;
  color: var(--color-primary);
  opacity: 0.9;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #CBD5E1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.req-card:hover .checkbox-custom {
  border-color: var(--color-primary);
}

.req-card--checked .checkbox-custom {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}

.req-card--checked .checkbox-custom span {
  font-size: 16px;
}

.req-content { flex: 1; }

.req-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.req-icon {
  font-size: 22px;
  color: var(--color-primary);
  opacity: 0.85;
}

.req-content h3 { margin: 0; font-size: 0.95rem; font-weight: 600; color: var(--color-neutral-dark); }
.req-content p { margin: 0; font-size: 0.875rem; color: #64748B; line-height: 1.5; }

.tooltip-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F5F9;
  border-radius: 50%;
  cursor: help;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.tooltip-icon:hover {
  background: var(--color-primary);
  color: white;
  transform: scale(1.1);
}

.tooltip-icon .mdi {
  font-size: 18px;
}

.photo-specs { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.spec-tag { background: #F1F5F9; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 500; color: #475569; }

.timeline-sidebar { position: sticky; top: 24px; background: white; border: 1px solid #E2E8F0; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); }
.sidebar-header { margin-bottom: 20px; }
.sidebar-title { margin: 0; font-size: 1.1rem; font-weight: 600; }
.vertical-timeline { display: flex; flex-direction: column; position: relative; padding-left: 20px; margin-top: 24px; border-left: 2px solid var(--color-neutral-light); }
.v-timeline-item { position: relative; padding-bottom: 32px; padding-left: 24px; }
.v-timeline-item:last-child { padding-bottom: 0; }
.v-timeline-marker { width: 16px; height: 16px; border-radius: 50%; position: absolute; left: -9px; top: 0; background: white; border: 3px solid var(--color-neutral); }
.v-timeline-marker.primary { border-color: var(--color-primary); }
.v-timeline-marker.secondary { border-color: var(--color-secondary); }
.v-timeline-marker.accent { border-color: var(--color-accent-dark); }
.v-date { font-weight: bold; color: var(--color-neutral-dark); display: block; margin-bottom: 4px; }
.v-timeline-content h4 { margin: 0; font-size: 1rem; color: var(--color-primary); }
.v-timeline-content p { margin: 0; font-size: 0.85rem; color: #666; }

.sidebar-info-box { 
  margin-top: 24px; 
  background: #F8FAFC; 
  padding: 16px; 
  border-radius: 10px; 
  display: flex; 
  gap: 14px; 
  align-items: flex-start; 
  border: 1px solid #E2E8F0;
  transition: all 0.2s ease;
}

.sidebar-info-box:hover {
  background: #EFF6FF;
  border-color: var(--color-primary);
}

.info-icon-wrapper {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #E2E8F0;
}

.info-icon-wrapper .mdi {
  font-size: 20px;
  color: var(--color-primary);
}

.info-icon-wrapper--warning {
  background: #FEF3C7;
  border-color: #FDE047;
}

.info-icon-wrapper--warning .mdi {
  color: #D97706;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-content strong {
  color: var(--color-neutral-dark);
  font-size: 0.85rem;
  font-weight: 600;
}

.location-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.location-link:hover {
  color: var(--color-primary-dark);
  gap: 8px;
}

.location-link .mdi {
  font-size: 16px;
}
.costs-header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--spacing-4); align-items: center; }
.costs-subtitle { margin: 8px 0 0 0; color: #475569; max-width: 640px; }
.costs-pill { 
  padding: 10px 18px; 
  border-radius: 50px; 
  background: white; 
  border: 1px solid #E2E8F0; 
  font-weight: 600; 
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.costs-pill .mdi {
  font-size: 18px;
  color: var(--color-success);
}

.costs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--spacing-4); margin-top: var(--spacing-5); }

.cost-card { background: white; border-radius: var(--radius-xl); border: 1px solid var(--color-neutral-light); padding: var(--spacing-5); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: var(--spacing-4); }

.cost-card--alt { background: linear-gradient(135deg, rgba(0,61,165,0.04), rgba(0,61,165,0.08)); }

.cost-card__header { display: flex; justify-content: space-between; align-items: center; gap: var(--spacing-4); }

.cost-chip { padding: 4px 12px; border-radius: var(--radius-full); background: rgba(200, 16, 46, 0.1); color: var(--color-primary); font-weight: 600; font-size: 0.85rem; }

.cost-chip--success { background: rgba(39, 174, 96, 0.15); color: var(--color-success); }

.cost-amount { font-size: 1.75rem; font-weight: 700; color: var(--color-neutral-dark); }

.cost-details { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; color: #475569; font-size: 0.95rem; }

.cost-details li { display: flex; gap: 8px; }

.cost-details li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); margin-top: 8px; flex-shrink: 0; }

.cost-card--alt .cost-details li::before { background: var(--color-success); }

.costs-footer { 
  margin-top: var(--spacing-5); 
  display: flex; 
  gap: 14px; 
  align-items: flex-start; 
  background: #FFFBEB; 
  border: 1px solid #FDE047; 
  padding: 16px; 
  border-radius: 10px; 
  color: #78350F;
}

.costs-footer p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.timeline-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 16px; }
.timeline-card { background: white; border-radius: 12px; overflow: hidden; border: 1px solid var(--color-neutral-light); box-shadow: var(--shadow-sm); }
.timeline-header { padding: 12px 16px; color: white; display: flex; justify-content: space-between; align-items: center; }
.timeline-header h3 { margin: 0; font-size: 1rem; color: white; }
.timeline-header.primary { background: var(--color-primary); }
.timeline-header.secondary { background: var(--color-secondary); }
.timeline-header.accent { background: var(--color-accent-dark); }
.timeline-body { padding: 16px; font-size: 0.9rem; }
.t-row { margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #eee; }
.t-row:last-child { border: none; margin: 0; padding: 0; }
.t-row.highlight { color: var(--color-primary); font-weight: bold; }

/* Skeleton Styles */
.skeleton-admissions {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: var(--spacing-6);
  animation: fadeIn 0.3s ease;
}

.skeleton-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.skeleton-header {
  height: 60px;
  background-color: #E2E8F0;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.skeleton-header::after {
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

.skeleton-req-card {
  height: 120px;
  background-color: #E2E8F0;
  border: 1px solid #CBD5E1;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.skeleton-req-card::after {
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

.skeleton-timeline {
  height: 500px;
  background-color: #E2E8F0;
  border: 1px solid #CBD5E1;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}

.skeleton-timeline::after {
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
  100% { transform: translateX(100%); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 1024px) {
  .skeleton-admissions {
    grid-template-columns: 1fr;
  }
}
</style>
