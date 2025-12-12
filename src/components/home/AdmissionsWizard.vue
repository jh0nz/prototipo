<template>
  <section class="wizard section" aria-label="Proceso de Admisión">
    <div class="container">
      <h2 class="section-title">Proceso de Admisión</h2>
      <p class="wizard__subtitle">
        Sigue estos pasos para ingresar a la FCyT. ¡Es más fácil de lo que piensas!
      </p>

      <!-- Progress Bar -->
      <div class="wizard__progress" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar">
          <div class="progress-bar__fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-steps">
          <div 
            v-for="(step, index) in steps" 
            :key="step.id"
            class="progress-step"
            :class="{ 
              'progress-step--active': currentStep === index,
              'progress-step--completed': currentStep > index
            }"
          >
            <div class="progress-step__number">
              <svg v-if="currentStep > index" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span class="progress-step__label hide-mobile">{{ step.shortTitle }}</span>
          </div>
        </div>
      </div>

      <!-- Wizard Content -->
      <div class="wizard__content">
        <Transition :name="slideDirection" mode="out-in">
          <!-- Step 1: Career Selection -->
          <div v-if="currentStep === 0" key="step1" class="wizard-step">
            <div class="wizard-step__header">
              <span class="wizard-step__icon">🎓</span>
              <div>
                <h3 class="wizard-step__title">{{ steps[0]?.title }}</h3>
                <p class="wizard-step__description">Selecciona la carrera que te interesa</p>
              </div>
            </div>

            <div class="careers-grid">
              <button 
                v-for="career in careers" 
                :key="career.id"
                class="career-card"
                :class="{ 'career-card--selected': selectedCareer?.id === career.id }"
                @click="selectCareer(career)"
              >
                <span class="career-card__icon">{{ career.icon }}</span>
                <div class="career-card__content">
                  <h4 class="career-card__name">{{ career.name }}</h4>
                  <p class="career-card__duration">{{ career.duration }}</p>
                </div>
                <div v-if="selectedCareer?.id === career.id" class="career-card__check">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Step 2: Requirements -->
          <div v-else-if="currentStep === 1" key="step2" class="wizard-step">
            <div class="wizard-step__header">
              <span class="wizard-step__icon">📋</span>
              <div>
                <h3 class="wizard-step__title">{{ steps[1]?.title }}</h3>
                <p class="wizard-step__description">Estos son los documentos que necesitas</p>
              </div>
            </div>

            <ul class="requirements-list">
              <li 
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
                <span v-if="req.required" class="requirement-item__badge">Obligatorio</span>
              </li>
            </ul>
          </div>

          <!-- Step 3: Dates -->
          <div v-else-if="currentStep === 2" key="step3" class="wizard-step">
            <div class="wizard-step__header">
              <span class="wizard-step__icon">📅</span>
              <div>
                <h3 class="wizard-step__title">{{ steps[2]?.title }}</h3>
                <p class="wizard-step__description">Próxima fecha de admisión</p>
              </div>
            </div>

            <div class="admission-date">
              <div class="admission-date__card">
                <div class="admission-date__label">Examen de Ingreso</div>
                <div class="admission-date__value">Enero 2026</div>
                <div class="admission-date__countdown">
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

              <div class="admission-info">
                <div class="admission-info__item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <div>
                    <span class="info-label">Inscripciones</span>
                    <span class="info-value">1 - 15 Enero 2026</span>
                  </div>
                </div>
                <div class="admission-info__item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div>
                    <span class="info-label">Horario de Atención</span>
                    <span class="info-value">08:30 - 12:30 / 14:30 - 18:30</span>
                  </div>
                </div>
                <div class="admission-info__item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div>
                    <span class="info-label">Lugar</span>
                    <span class="info-value">Oficina de Admisiones - Planta Baja</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Contact -->
          <div v-else-if="currentStep === 3" key="step4" class="wizard-step">
            <div class="wizard-step__header">
              <span class="wizard-step__icon">✅</span>
              <div>
                <h3 class="wizard-step__title">{{ steps[3]?.title }}</h3>
                <p class="wizard-step__description">¡Estás listo! Contáctanos para más información</p>
              </div>
            </div>

            <div class="contact-options">
              <a 
                href="https://wa.me/59144231765?text=Hola,%20quiero%20información%20sobre%20el%20examen%20de%20ingreso" 
                target="_blank"
                class="contact-card contact-card--whatsapp"
              >
                <div class="contact-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div class="contact-card__content">
                  <h4>WhatsApp</h4>
                  <p>Respuesta inmediata</p>
                </div>
                <svg class="contact-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>

              <a 
                href="mailto:admisiones@fcyt.umss.edu.bo" 
                class="contact-card contact-card--email"
              >
                <div class="contact-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="contact-card__content">
                  <h4>Correo Electrónico</h4>
                  <p>admisiones@fcyt.umss.edu.bo</p>
                </div>
                <svg class="contact-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </a>

              <div 
                class="contact-card contact-card--location"
              >
                <div class="contact-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div class="contact-card__content">
                  <h4>Visítanos</h4>
                  <p>Ver ubicación en mapa</p>
                </div>
                <svg class="contact-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Navigation Buttons -->
      <div class="wizard__nav">
        <button 
          class="btn btn-outline"
          :disabled="currentStep === 0"
          @click="prevStep"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Anterior
        </button>
        
        <button 
          v-if="currentStep < steps.length - 1"
          class="btn btn-primary"
          :disabled="currentStep === 0 && !selectedCareer"
          @click="nextStep"
        >
          Siguiente
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        
        <button 
          v-else
          class="btn btn-primary"
          @click="restartWizard"
        >
          Empezar de Nuevo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="1 4 1 10 7 10"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { Career, AdmissionRequirement } from '@/types'

const currentStep = ref(0)
const selectedCareer = ref<Career | null>(null)
const slideDirection = ref('slide-left')

const steps = [
  { id: 1, title: '¿Qué carrera te interesa?', shortTitle: 'Carrera' },
  { id: 2, title: '¿Cuáles son los requisitos?', shortTitle: 'Requisitos' },
  { id: 3, title: '¿Cuándo se abre la admisión?', shortTitle: 'Fechas' },
  { id: 4, title: 'Confirmación', shortTitle: 'Confirmación' }
]

const careers: Career[] = [
  { id: 'info', name: 'Ingeniería Informática', icon: '💻', description: 'Desarrollo de software y sistemas', duration: '5 años', faculty: 'FCyT' },
  { id: 'sistemas', name: 'Ingeniería de Sistemas', icon: '⚙️', description: 'Gestión de sistemas de información', duration: '5 años', faculty: 'FCyT' },
  { id: 'civil', name: 'Ingeniería Civil', icon: '🏗️', description: 'Construcción e infraestructura', duration: '5 años', faculty: 'FCyT' },
  { id: 'electronica', name: 'Ingeniería Electrónica', icon: '🔌', description: 'Circuitos y sistemas electrónicos', duration: '5 años', faculty: 'FCyT' },
  { id: 'industrial', name: 'Ingeniería Industrial', icon: '🏭', description: 'Optimización de procesos', duration: '5 años', faculty: 'FCyT' },
  { id: 'quimica', name: 'Ingeniería Química', icon: '⚗️', description: 'Procesos químicos industriales', duration: '5 años', faculty: 'FCyT' }
]

const requirements: AdmissionRequirement[] = [
  { id: '1', title: 'Cédula de Identidad', description: 'Original y 2 fotocopias', icon: '🪪', required: true },
  { id: '2', title: 'Certificado de Bachillerato', description: 'Original legalizado por el Ministerio de Educación', icon: '📜', required: true },
  { id: '3', title: 'Comprobante de Pago', description: 'Depósito bancario de la matrícula', icon: '💳', required: true },
  { id: '4', title: 'Certificado Médico', description: 'Emitido por un centro de salud autorizado', icon: '🏥', required: true },
  { id: '5', title: 'Fotografías 3x3', description: '4 fotos tamaño carnet con fondo rojo', icon: '📷', required: true }
]

const countdown = ref({ days: 0, hours: 0, minutes: 0 })
let countdownInterval: number | null = null

const progress = computed(() => {
  return ((currentStep.value + 1) / steps.length) * 100
})

function selectCareer(career: Career) {
  selectedCareer.value = career
}

function nextStep() {
  if (currentStep.value < steps.length - 1) {
    slideDirection.value = 'slide-left'
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    slideDirection.value = 'slide-right'
    currentStep.value--
  }
}

function restartWizard() {
  slideDirection.value = 'slide-right'
  currentStep.value = 0
  selectedCareer.value = null
}

function updateCountdown() {
  // Target date: January 15, 2026
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
  countdownInterval = window.setInterval(updateCountdown, 60000) // Update every minute
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
.wizard {
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-variant) 100%);
}

.wizard__subtitle {
  color: #6B7280;
  margin-bottom: var(--spacing-8);
  max-width: 500px;
}

/* Progress Bar */
.wizard__progress {
  margin-bottom: var(--spacing-10);
}

.progress-bar {
  height: 6px;
  background-color: var(--color-neutral-light);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-6);
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-full);
  transition: width var(--transition-slow);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.progress-step__number {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-neutral-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #6B7280;
  transition: all var(--transition-normal);
}

.progress-step--active .progress-step__number {
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0 0 0 4px var(--color-primary-light);
}

.progress-step--completed .progress-step__number {
  background-color: var(--color-success);
  color: white;
}

.progress-step__label {
  font-size: var(--font-size-xs);
  color: #6B7280;
  text-align: center;
}

.progress-step--active .progress-step__label {
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
}

/* Wizard Content */
.wizard__content {
  min-height: 400px;
  margin-bottom: var(--spacing-8);
}

.wizard-step {
  animation: fadeIn var(--transition-normal) ease-out;
}

.wizard-step__header {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-6);
  border-bottom: 1px solid var(--color-neutral-light);
}

.wizard-step__icon {
  font-size: 2.5rem;
}

.wizard-step__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-1);
}

.wizard-step__description {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
}

/* Career Cards */
.careers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-4);
}

@media (max-width: 767px) {
  .careers-grid {
    grid-template-columns: 1fr;
  }
}

.career-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background-color: var(--color-surface);
  border: 2px solid var(--color-neutral-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.career-card:hover {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-md);
}

.career-card--selected {
  border-color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.career-card__icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.career-card__content {
  flex: 1;
}

.career-card__name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: 2px;
}

.career-card__duration {
  font-size: var(--font-size-xs);
  color: #6B7280;
  margin: 0;
}

.career-card__check {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  color: white;
}

/* Requirements List */
.requirements-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
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

/* Admission Date */
.admission-date {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-6);
}

@media (max-width: 767px) {
  .admission-date {
    grid-template-columns: 1fr;
  }
}

.admission-date__card {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-hover) 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  color: white;
  text-align: center;
}

.admission-date__label {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin-bottom: var(--spacing-2);
}

.admission-date__value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-6);
}

.admission-date__countdown {
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

.admission-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  padding: var(--spacing-2);
}

.admission-info__item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
}

.admission-info__item svg {
  color: var(--color-secondary);
  flex-shrink: 0;
  margin-top: 2px;
}

.admission-info__item > div {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: var(--font-size-xs);
  color: #6B7280;
  margin-bottom: 2px;
}

.info-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-dark);
}

/* Contact Options */
.contact-options {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-5);
  background-color: var(--color-surface);
  border: 2px solid var(--color-neutral-light);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.contact-card:hover {
  border-color: currentColor;
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
  text-decoration: none;
}

.contact-card--whatsapp {
  color: #25D366;
}

.contact-card--email {
  color: var(--color-secondary);
}

.contact-card--location {
  color: var(--color-primary);
}

.contact-card__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: currentColor;
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.contact-card__icon svg {
  color: white;
}

.contact-card__content {
  flex: 1;
}

.contact-card__content h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: 2px;
}

.contact-card__content p {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
}

.contact-card__arrow {
  flex-shrink: 0;
  color: currentColor;
  opacity: 0;
  transform: translateX(-8px);
  transition: all var(--transition-fast);
}

.contact-card:hover .contact-card__arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Navigation */
.wizard__nav {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-4);
  padding-top: var(--spacing-6);
  border-top: 1px solid var(--color-neutral-light);
}

/* Slide Transitions */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all var(--transition-normal);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
