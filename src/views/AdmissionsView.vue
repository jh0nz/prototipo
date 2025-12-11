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
    <section class="section container">
      <div class="main-grid">
        
        <!-- Left Column: Requirements Checklist -->
        <div class="requirements-column">
          <h2 class="section-title">
            <span class="material-symbols-rounded icon-title">checklist</span>
            Checklist de Requisitos
          </h2>
          <p class="section-desc">Marca los pasos que ya has completado para llevar un control de tu inscripción.</p>
          
          <div class="checklist-container">
            <!-- Req 1 -->
            <div 
              class="req-card req-card--interactive" 
              :class="{ 'req-card--checked': isChecked('1') }"
              @click="toggleReq('1')"
            >
              <div class="checkbox-custom">
                <span v-if="isChecked('1')" class="material-symbols-rounded">check</span>
              </div>
              <div class="req-content">
                <h3>Ser Bachiller</h3>
                <p>Contar con el diploma de bachiller o libreta escolar.</p>
              </div>
              <span class="material-symbols-rounded req-icon-bg">school</span>
            </div>

            <!-- Req 2 -->
            <div 
              class="req-card req-card--interactive"
              :class="{ 'req-card--checked': isChecked('2') }"
              @click="toggleReq('2')"
            >
              <div class="checkbox-custom">
                <span v-if="isChecked('2')" class="material-symbols-rounded">check</span>
              </div>
              <div class="req-content">
                <h3>Formulario de Datos</h3>
                <p>Llenar e imprimir en <a href="http://admision.fcyt.umss.edu.bo" target="_blank" @click.stop>admision.fcyt.umss.edu.bo</a></p>
                <div class="note-box">
                  <strong>Nota:</strong> El formulario impreso es obligatorio para habilitar el pago.
                </div>
              </div>
              <span class="material-symbols-rounded req-icon-bg">description</span>
            </div>

            <!-- Req 3 -->
            <div 
              class="req-card req-card--interactive"
              :class="{ 'req-card--checked': isChecked('3') }"
              @click="toggleReq('3')"
            >
              <div class="checkbox-custom">
                <span v-if="isChecked('3')" class="material-symbols-rounded">check</span>
              </div>
              <div class="req-content">
                <h3>Fotografía Digital</h3>
                <div class="photo-specs">
                  <span class="spec-tag">Fondo blanco</span>
                  <span class="spec-tag">300x300 px</span>
                  <span class="spec-tag">JPG</span>
                  <span class="spec-tag">Máx 50 KB</span>
                </div>
                <div class="alert-box">
                  <span class="material-symbols-rounded alert-icon">info</span>
                  <p>La foto será revisada. Formularios antiguos NO son válidos.</p>
                </div>
              </div>
              <span class="material-symbols-rounded req-icon-bg">photo_camera</span>
            </div>

             <!-- Req 4: Pago -->
             <div 
              class="req-card req-card--interactive"
              :class="{ 'req-card--checked': isChecked('4') }"
              @click="toggleReq('4')"
            >
              <div class="checkbox-custom">
                <span v-if="isChecked('4')" class="material-symbols-rounded">check</span>
              </div>
              <div class="req-content">
                <h3>Pago de Inscripción</h3>
                <p>Realizar el pago QR o en Caja Facultativa según el cronograma.</p>
              </div>
               <span class="material-symbols-rounded req-icon-bg">payments</span>
            </div>

          </div>
        </div>

        <!-- Right Column: Exam Timeline -->
        <div class="timeline-column">
          <div class="timeline-sidebar">
            <h3 class="sidebar-title">
              <span class="material-symbols-rounded">event</span>
              Fechas de Examen
            </h3>
            
            <div class="vertical-timeline">
              <!-- Item 1 -->
              <div class="v-timeline-item">
                <div class="v-timeline-marker primary"></div>
                <div class="v-timeline-content">
                  <span class="v-date">Viernes 16 Ene</span>
                  <h4>Primera Opción</h4>
                  <p>Inscripciones: 5 - 8 Ene</p>
                </div>
              </div>

               <!-- Item 2 -->
               <div class="v-timeline-item">
                <div class="v-timeline-marker secondary"></div>
                <div class="v-timeline-content">
                  <span class="v-date">Lunes 2 Feb</span>
                  <h4>Segunda Opción</h4>
                  <p>Inscripciones: 21 - 23 Ene</p>
                </div>
              </div>

               <!-- Item 3 -->
               <div class="v-timeline-item">
                <div class="v-timeline-marker accent"></div>
                <div class="v-timeline-content">
                  <span class="v-date">Jueves 13 Feb</span>
                  <h4>Tercera Opción</h4>
                  <p>Inscripciones: 4 - 6 Feb</p>
                </div>
              </div>
            </div>

            <div class="sidebar-info-box">
               <span class="material-symbols-rounded">location_on</span>
               <p>
                 <strong>Lugar:</strong>
                 <a
                   href="https://maps.app.goo.gl/q94NuABAk8gGb2MH9"
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   Edificio Académico 2, FCyT
                 </a>
               </p>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Costos Section (Simplified) -->
    <section class="section bg-surface-variant">
      <div class="container">
        <div class="costs-header">
          <div>
            <h2 class="section-title">Costos</h2>
            <p class="costs-subtitle">Tarifas oficiales para el examen de ingreso I-2026. Incluye carpeta, material impreso y credencial.</p>
          </div>
          <span class="costs-pill">Pago único • Recibo digital</span>
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
              <span class="cost-chip cost-chip--success">Repitentes Pre-U</span>
              <strong class="cost-amount">Bs 200</strong>
            </header>
            <ul class="cost-details">
              <li>Disponible para postulantes de programas Pre-Universitarios</li>
              <li>Requiere certificado de aprobación del curso</li>
              <li>Mismos canales de pago habilitados</li>
            </ul>
          </article>
        </div>

        <div class="costs-footer">
          <span class="material-symbols-rounded">info</span>
          <p>Recuerda conservar el comprobante original. Presentarlo junto al formulario impreso el día de tu opción.</p>
        </div>
      </div>
    </section>

    <!-- Full Details Expandable or Detailed Section Below -->
    <section class="section container">
        <h2 class="section-title">Cronograma Detallado</h2>
        <!-- Reusing the detailed horizontal cards I made before, but maybe simplified -->
        <div class="timeline-options">
          <!-- Opcion 1 Card -->
          <div class="timeline-card">
            <div class="timeline-header primary">
              <h3>1ª Opción</h3>
              <span class="material-symbols-rounded">looks_one</span>
            </div>
            <div class="timeline-body">
              <div class="t-row"><strong>Llenado:</strong> 5-8 Ene</div>
              <div class="t-row"><strong>Pago QR:</strong> 9-11 Ene</div>
              <div class="t-row highlight"><strong>Examen:</strong> 16 Ene</div>
            </div>
          </div>
           <!-- Opcion 2 Card -->
           <div class="timeline-card">
            <div class="timeline-header secondary">
              <h3>2ª Opción</h3>
              <span class="material-symbols-rounded">looks_two</span>
            </div>
            <div class="timeline-body">
              <div class="t-row"><strong>Llenado:</strong> 21-23 Ene</div>
              <div class="t-row"><strong>Pago QR:</strong> 26-28 Ene</div>
              <div class="t-row highlight"><strong>Examen:</strong> 2 Feb</div>
            </div>
          </div>
           <!-- Opcion 3 Card -->
           <div class="timeline-card">
            <div class="timeline-header accent">
              <h3>3ª Opción</h3>
              <span class="material-symbols-rounded">looks_3</span>
            </div>
            <div class="timeline-body">
              <div class="t-row"><strong>Llenado:</strong> 4-6 Feb</div>
              <div class="t-row"><strong>Pago QR:</strong> 7-9 Feb</div>
              <div class="t-row highlight"><strong>Examen:</strong> 13 Feb</div>
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
.checklist-container { display: flex; flex-direction: column; gap: 16px; }

.req-card {
  background: white;
  border: 2px solid var(--color-neutral-light);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  position: relative;
  transition: all 0.2s;
  cursor: pointer;
}

.req-card:hover { border-color: var(--color-primary-light); background: #F8FAFC; }
.req-card--checked { border-color: var(--color-success); background: #F0FDF4; }

.checkbox-custom {
  width: 30px;
  height: 30px;
  border: 2px solid rgba(15, 23, 42, 0.25);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFF, #F4F7FB);
  flex-shrink: 0;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.req-card:hover .checkbox-custom {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(200, 16, 46, 0.1);
}

.req-card--checked .checkbox-custom {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  border-color: var(--color-primary);
  color: white;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.req-card--checked .checkbox-custom span {
  font-size: 20px;
  font-weight: bold;
}

.req-content { flex: 1; }
.req-content h3 { margin: 0 0 4px 0; font-size: 1rem; color: var(--color-neutral-dark); }
.req-content p { margin: 0; font-size: 0.9rem; color: #666; }

.req-icon-bg {
  position: absolute; right: 20px; top: 20px;
  font-size: 48px; opacity: 0.1; color: var(--color-primary); pointer-events: none;
}

.note-box { background: #FFFBEB; border-left: 3px solid #F59E0B; padding: 8px; margin-top: 8px; font-size: 0.85rem; color: #92400E; }
.photo-specs { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; margin-top: 4px; }
.spec-tag { background: #E2E8F0; padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; }
.alert-box { display: flex; gap: 8px; background: #EFF6FF; padding: 10px; border-radius: 8px; margin-top: 8px; font-size: 0.85rem; }
.alert-icon { font-size: 20px; color: var(--color-info); }

/* Sidebar Timeline */
.timeline-sidebar {
  position: sticky; top: 24px;
  background: white; border: 1px solid var(--color-neutral-light);
  border-radius: var(--radius-xl); padding: 24px;
  box-shadow: var(--shadow-md);
}

.sidebar-title { display: flex; align-items: center; gap: 8px; margin-top: 0; font-size: 1.2rem; }

.vertical-timeline {
  display: flex; flex-direction: column; 
  position: relative;
  padding-left: 20px;
  margin-top: 24px;
  border-left: 2px solid var(--color-neutral-light);
}

.v-timeline-item { position: relative; padding-bottom: 32px; padding-left: 24px; }
.v-timeline-item:last-child { padding-bottom: 0; }

.v-timeline-marker {
  width: 16px; height: 16px; border-radius: 50%;
  position: absolute; left: -9px; top: 0;
  background: white; border: 3px solid var(--color-neutral);
}
.v-timeline-marker.primary { border-color: var(--color-primary); }
.v-timeline-marker.secondary { border-color: var(--color-secondary); }
.v-timeline-marker.accent { border-color: var(--color-accent-dark); }

.v-date { font-weight: bold; color: var(--color-neutral-dark); display: block; margin-bottom: 4px; }
.v-timeline-content h4 { margin: 0; font-size: 1rem; color: var(--color-primary); }
.v-timeline-content p { margin: 0; font-size: 0.85rem; color: #666; }

.sidebar-info-box {
  margin-top: 24px; background: #F8FAFC; padding: 16px; border-radius: 8px;
  display: flex; gap: 12px; align-items: center; border: 1px dashed var(--color-neutral);
}

/* Costos */
.costs-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--spacing-4);
  align-items: center;
}

.costs-subtitle {
  margin: 8px 0 0 0;
  color: #475569;
  max-width: 640px;
}

.costs-pill {
  padding: 8px 16px;
  border-radius: var(--radius-full);
  background: white;
  border: 1px solid var(--color-neutral-light);
  font-weight: 600;
  font-size: 0.9rem;
}

.costs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--spacing-4);
  margin-top: var(--spacing-5);
}

.cost-card {
  background: white;
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-neutral-light);
  padding: var(--spacing-5);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.cost-card--alt {
  background: linear-gradient(135deg, rgba(0,61,165,0.04), rgba(0,61,165,0.08));
}

.cost-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-4);
}

.cost-chip {
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: rgba(200, 16, 46, 0.1);
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
}

.cost-chip--success {
  background: rgba(39, 174, 96, 0.15);
  color: var(--color-success);
}

.cost-amount {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
}

.cost-details {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #475569;
  font-size: 0.95rem;
}

.cost-details li {
  display: flex;
  gap: 8px;
}

.cost-details li::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
  margin-top: 8px;
  flex-shrink: 0;
}

.cost-card--alt .cost-details li::before {
  background: var(--color-success);
}

.costs-footer {
  margin-top: var(--spacing-5);
  display: flex;
  gap: var(--spacing-3);
  align-items: flex-start;
  background: white;
  border: 1px dashed var(--color-neutral-light);
  padding: var(--spacing-4);
  border-radius: var(--radius-lg);
  color: #475569;
}

.costs-footer span {
  color: var(--color-primary);
}

/* Timeline Options Grid */
.timeline-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 16px; }
@media (max-width: 768px) { .timeline-options { grid-template-columns: 1fr; } }
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
</style>
