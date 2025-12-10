<template>
  <div class="admissions-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Admisión FCyT</h1>
        <p class="page-header__subtitle">
          Tu futuro comienza aquí. Conoce las carreras que ofrecemos y cómo ingresar.
        </p>
      </div>
    </header>

    <!-- Careers Section -->
    <section class="careers section">
      <div class="container">
        <h2 class="section-title">Nuestras Carreras</h2>
        
        <div class="careers__grid">
          <article 
            v-for="career in careers" 
            :key="career.id"
            class="career-card"
            @click="selectCareer(career)"
            :class="{ 'career-card--selected': selectedCareer?.id === career.id }"
          >
            <div class="career-card__icon">
              <span>{{ career.icon }}</span>
            </div>
            <div class="career-card__content">
              <h3 class="career-card__title">{{ career.name }}</h3>
              <p class="career-card__description">{{ career.description }}</p>
              <div class="career-card__meta">
                <span class="career-card__duration">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ career.duration }}
                </span>
              </div>
            </div>
            <div v-if="selectedCareer?.id === career.id" class="career-card__check">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Requirements Section -->
    <section class="requirements section">
      <div class="container">
        <h2 class="section-title">Requisitos de Inscripción</h2>
        
        <div class="requirements__grid">
          <div class="requirements__list">
            <div 
              v-for="req in requirements" 
              :key="req.id"
              class="requirement-item"
            >
              <div class="requirement-item__icon">
                <span>{{ req.icon }}</span>
              </div>
              <div class="requirement-item__content">
                <h4 class="requirement-item__title">{{ req.title }}</h4>
                <p class="requirement-item__description">{{ req.description }}</p>
              </div>
              <span class="requirement-item__badge">{{ req.required ? 'Obligatorio' : 'Opcional' }}</span>
            </div>
          </div>
          
          <div class="requirements__info">
            <div class="info-card">
              <div class="info-card__header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <h3>Información Importante</h3>
              </div>
              <ul class="info-card__list">
                <li>Todos los documentos deben estar legalizados</li>
                <li>Las fotocopias deben ser claras y legibles</li>
                <li>El pago de matrícula se realiza en cualquier sucursal del Banco Unión</li>
                <li>El certificado médico tiene validez de 30 días</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Exam Info Section -->
    <section class="exam-info section">
      <div class="container">
        <h2 class="section-title">Examen de Ingreso</h2>
        
        <div class="exam-info__grid">
          <div class="exam-card">
            <div class="exam-card__header">
              <h3>Próximo Examen</h3>
              <span class="exam-card__badge">Inscripciones Abiertas</span>
            </div>
            <div class="exam-card__date">
              <span class="exam-card__day">15</span>
              <span class="exam-card__month">Enero 2026</span>
            </div>
            <div class="exam-card__countdown">
              <div class="countdown-item">
                <span class="countdown-value">{{ countdown.days }}</span>
                <span class="countdown-label">Días</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <span class="countdown-value">{{ countdown.hours }}</span>
                <span class="countdown-label">Horas</span>
              </div>
              <div class="countdown-separator">:</div>
              <div class="countdown-item">
                <span class="countdown-value">{{ countdown.minutes }}</span>
                <span class="countdown-label">Min</span>
              </div>
            </div>
          </div>
          
          <div class="exam-details">
            <div class="exam-detail-item">
              <div class="exam-detail-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div>
                <h4>Periodo de Inscripción</h4>
                <p>1 - 15 de Enero 2026</p>
              </div>
            </div>
            
            <div class="exam-detail-item">
              <div class="exam-detail-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <h4>Horario del Examen</h4>
                <p>09:00 - 12:00</p>
              </div>
            </div>
            
            <div class="exam-detail-item">
              <div class="exam-detail-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4>Lugar</h4>
                <p>Campus Central FCyT - Bloque A</p>
              </div>
            </div>
            
            <div class="exam-detail-item">
              <div class="exam-detail-item__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </div>
              <div>
                <h4>Materias del Examen</h4>
                <p>Matemáticas, Física, Lenguaje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>¿Listo para comenzar?</h2>
          <p>Contáctanos para más información sobre el proceso de admisión</p>
          <div class="cta-buttons">
            <a 
              href="https://wa.me/59144231765?text=Hola,%20quiero%20información%20sobre%20el%20examen%20de%20ingreso" 
              target="_blank"
              class="btn btn-primary btn-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              </svg>
              Contactar por WhatsApp
            </a>
            <RouterLink to="/contacto" class="btn btn-outline btn-lg">
              Ver más opciones
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Career, AdmissionRequirement } from '@/types'
import { usePageSections } from '@/composables/usePageSections'

document.title = 'Admisión - FCyT UMSS'

// Initialize page sections detection
usePageSections()

const selectedCareer = ref<Career | null>(null)
const countdown = ref({ days: 0, hours: 0, minutes: 0 })
let countdownInterval: number | null = null

const careers: Career[] = [
  { 
    id: 'info', 
    name: 'Ingeniería Informática', 
    icon: '💻', 
    description: 'Desarrolla software, aplicaciones y sistemas informáticos. Especialízate en programación, bases de datos y redes.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'sistemas', 
    name: 'Ingeniería de Sistemas', 
    icon: '⚙️', 
    description: 'Gestiona sistemas de información empresariales y optimiza procesos organizacionales.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'civil', 
    name: 'Ingeniería Civil', 
    icon: '🏗️', 
    description: 'Diseña y construye infraestructura: edificios, puentes, carreteras y obras hidráulicas.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'electronica', 
    name: 'Ingeniería Electrónica', 
    icon: '🔌', 
    description: 'Desarrolla circuitos, sistemas de control y telecomunicaciones.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'industrial', 
    name: 'Ingeniería Industrial', 
    icon: '🏭', 
    description: 'Optimiza procesos productivos, gestión de calidad y logística empresarial.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'quimica', 
    name: 'Ingeniería Química', 
    icon: '⚗️', 
    description: 'Transforma materias primas en productos químicos útiles para la industria.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'mecanica', 
    name: 'Ingeniería Mecánica', 
    icon: '🔧', 
    description: 'Diseña y fabrica maquinaria, equipos y sistemas mecánicos.',
    duration: '5 años',
    faculty: 'FCyT'
  },
  { 
    id: 'electrica', 
    name: 'Ingeniería Eléctrica', 
    icon: '⚡', 
    description: 'Genera, transmite y distribuye energía eléctrica de manera eficiente.',
    duration: '5 años',
    faculty: 'FCyT'
  }
]

const requirements: AdmissionRequirement[] = [
  { id: '1', title: 'Cédula de Identidad', description: 'Original vigente y 2 fotocopias legibles', icon: '🪪', required: true },
  { id: '2', title: 'Certificado de Bachillerato', description: 'Original legalizado por el Ministerio de Educación', icon: '📜', required: true },
  { id: '3', title: 'Formulario de Inscripción', description: 'Disponible en ventanilla o en línea', icon: '📋', required: true },
  { id: '4', title: 'Comprobante de Pago', description: 'Depósito bancario del examen de ingreso', icon: '💳', required: true },
  { id: '5', title: 'Certificado Médico', description: 'Emitido por centro de salud autorizado (30 días de validez)', icon: '🏥', required: true },
  { id: '6', title: 'Fotografías 3x3', description: '4 fotos tamaño carnet con fondo rojo', icon: '📷', required: true }
]

function selectCareer(career: Career) {
  selectedCareer.value = selectedCareer.value?.id === career.id ? null : career
}

function updateCountdown() {
  const target = new Date('2026-01-15T00:00:00')
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff > 0) {
    countdown.value = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    }
  }
}

onMounted(() => {
  updateCountdown()
  countdownInterval = window.setInterval(updateCountdown, 60000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.admissions-page {
  min-height: 100vh;
}

/* Page Header */
.page-header {
  padding: var(--spacing-6) 0 var(--spacing-8);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  color: white;
  margin-bottom: var(--spacing-6);
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

/* Careers Section */
.careers {
  background-color: var(--color-surface);
}

.careers__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 1023px) {
  .careers__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 639px) {
  .careers__grid {
    grid-template-columns: 1fr;
  }
}

.career-card {
  position: relative;
  padding: var(--spacing-6);
  background-color: var(--color-surface-variant);
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.career-card:hover {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.career-card--selected {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.career-card__icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-4);
}

.career-card__title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-2);
}

.career-card__description {
  font-size: var(--font-size-sm);
  color: #6B7280;
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
}

.career-card__meta {
  display: flex;
  gap: var(--spacing-4);
}

.career-card__duration {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--color-secondary);
  font-weight: var(--font-weight-medium);
}

.career-card__check {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  color: white;
}

/* Requirements Section */
.requirements {
  background-color: var(--color-surface-variant);
}

.requirements__grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-8);
  align-items: start;
}

@media (max-width: 1023px) {
  .requirements__grid {
    grid-template-columns: 1fr;
  }
}

.requirements__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.requirement-item__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-secondary-light);
  border-radius: var(--radius-md);
  font-size: 1.5rem;
  flex-shrink: 0;
}

.requirement-item__content {
  flex: 1;
}

.requirement-item__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: 2px;
}

.requirement-item__description {
  font-size: var(--font-size-xs);
  color: #6B7280;
  margin: 0;
}

.requirement-item__badge {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

/* Info Card */
.info-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
  border-left: 4px solid var(--color-accent);
}

.info-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
  color: #946D00;
}

.info-card__header h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  color: var(--color-neutral-dark);
}

.info-card__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.info-card__list li {
  font-size: var(--font-size-sm);
  color: #6B7280;
  padding-left: var(--spacing-5);
  position: relative;
}

.info-card__list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

/* Exam Info Section */
.exam-info {
  background-color: var(--color-surface);
}

.exam-info__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-8);
  align-items: start;
}

@media (max-width: 1023px) {
  .exam-info__grid {
    grid-template-columns: 1fr;
  }
}

.exam-card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  color: white;
  text-align: center;
}

.exam-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
}

.exam-card__header h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  color: white;
}

.exam-card__badge {
  padding: var(--spacing-1) var(--spacing-3);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.exam-card__date {
  margin-bottom: var(--spacing-6);
}

.exam-card__day {
  display: block;
  font-size: 4rem;
  font-weight: var(--font-weight-bold);
  line-height: 1;
}

.exam-card__month {
  font-size: var(--font-size-xl);
  opacity: 0.9;
}

.exam-card__countdown {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2);
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-md);
  min-width: 60px;
}

.countdown-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
}

.countdown-label {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

.countdown-separator {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  opacity: 0.6;
}

.exam-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.exam-detail-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-lg);
}

.exam-detail-item__icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-secondary-light);
  border-radius: var(--radius-md);
  flex-shrink: 0;
  color: var(--color-secondary);
}

.exam-detail-item h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: 2px;
}

.exam-detail-item p {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #002D7A 100%);
  padding: var(--spacing-16) 0;
}

.cta-content {
  text-align: center;
  color: white;
}

.cta-content h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-4);
  color: white;
}

.cta-content p {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: var(--spacing-8);
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

.cta-buttons .btn-outline {
  border-color: white;
  color: white;
}

.cta-buttons .btn-outline:hover {
  background-color: white;
  color: var(--color-secondary);
}
</style>
