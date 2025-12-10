<template>
  <div class="institutional-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Nosotros</h1>
        <p class="page-header__subtitle">
          Conoce nuestra historia, misión y las personas que hacen posible la excelencia académica
        </p>
      </div>
    </header>

    <!-- History Section -->
    <section id="antecedentes" class="history section">
      <div class="container">
        <h2 class="section-title">Antecedentes</h2>
        
        <div class="history__content">
          <div class="history__text">
            <p>
              La <strong>Facultad de Ciencias y Tecnología (FCyT)</strong> fue fundada el <strong>21 de septiembre de 1979</strong> 
              como parte de la Universidad Mayor de San Simón (UMSS) en Cochabamba, Bolivia.
            </p>
            <p>
              Desde su creación, la FCyT ha sido pionera en la formación de profesionales en las áreas de ingeniería y tecnología, 
              contribuyendo significativamente al desarrollo científico y tecnológico del país.
            </p>
            <p>
              A lo largo de más de cuatro décadas, la facultad ha evolucionado constantemente, incorporando nuevas carreras, 
              actualizando sus planes de estudio y fortaleciendo su infraestructura para ofrecer educación de calidad 
              a miles de estudiantes bolivianos.
            </p>
          </div>
          
          <div class="history__timeline">
            <div class="timeline-card">
              <div class="timeline-card__year">1979</div>
              <div class="timeline-card__content">
                <h4>Fundación</h4>
                <p>Creación de la FCyT con las primeras carreras de ingeniería</p>
              </div>
            </div>
            <div class="timeline-card">
              <div class="timeline-card__year">1990</div>
              <div class="timeline-card__content">
                <h4>Expansión</h4>
                <p>Incorporación de nuevas carreras y programas de postgrado</p>
              </div>
            </div>
            <div class="timeline-card">
              <div class="timeline-card__year">2010</div>
              <div class="timeline-card__content">
                <h4>Modernización</h4>
                <p>Actualización de laboratorios y equipamiento tecnológico</p>
              </div>
            </div>
            <div class="timeline-card">
              <div class="timeline-card__year">2024</div>
              <div class="timeline-card__content">
                <h4>Actualidad</h4>
                <p>Más de 15,000 estudiantes y 8 carreras de ingeniería</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Authorities Section -->
    <section id="autoridades" class="authorities section">
      <div class="container">
        <h2 class="section-title">Autoridades</h2>
        
        <div class="authorities__grid">
          <article 
            v-for="authority in authorities" 
            :key="authority.id"
            class="authority-card"
          >
            <div class="authority-card__image">
              <img 
                v-if="authority.image"
                :src="authority.image" 
                :alt="authority.name"
                class="authority-card__photo"
              />
              <div v-else class="authority-card__placeholder">
                <span>{{ getInitials(authority.name) }}</span>
              </div>
            </div>
            <div class="authority-card__content">
              <h3 class="authority-card__name">{{ authority.name }}</h3>
              <p class="authority-card__role">{{ authority.role }}</p>
              <a v-if="authority.email" :href="`mailto:${authority.email}`" class="authority-card__email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {{ authority.email }}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Mission, Vision & Goals Section -->
    <section id="mision-vision" class="mission-vision section">
      <div class="container">
        <div class="mission-vision__grid">
          <article class="mission-card">
            <div class="mission-card__header">
              <span class="mission-card__icon">🎯</span>
              <h3 class="mission-card__title">Misión</h3>
            </div>
            <p class="mission-card__content">
              Es una unidad académica e investigativa en ciencias y tecnología de la UMSS que genera valor para la región, formando integralmente profesionales calificados, líderes, críticos, éticos, con conciencia ciudadana y ambiental; generando y aplicando conocimiento científico y tecnológico desde su Parque Científico, ofertando servicios especializados de calidad, divulgando y difundiendo conocimiento científico; transfiriendo tecnología y consolidando sistemas de innovación y emprendimiento, para mejorar la competitividad regional y nacional.
            </p>
          </article>

          <article class="mission-card">
            <div class="mission-card__header">
              <span class="mission-card__icon">🔭</span>
              <h3 class="mission-card__title">Visión</h3>
            </div>
            <p class="mission-card__content">
              Ser una Facultad referente en ciencias y tecnología a nivel nacional e internacional, reconocida por el desempeño profesional de sus titulados, por la calidad de los resultados de su actividad científica y tecnológica, por su adecuado rol en la articulación con el medio y el entorno internacional, y por propiciar la economía del conocimiento a través de su Parque Científico para la consolidación de Cochabamba como ciudad del conocimiento.
            </p>
          </article>

          <article class="mission-card mission-card--full">
            <div class="mission-card__header">
              <span class="mission-card__icon">🎓</span>
              <h3 class="mission-card__title">Metas y Objetivos</h3>
            </div>
            <p class="mission-card__content">
              Por el carácter de las disciplinas que regenta la Facultad de Ciencias y Tecnología, tiene como meta fundamental contribuir al desarrollo de las fuerzas productivas de la región y el país, a través de la preparación de los recursos naturales, por medio de una interacción equilibrada de elaboración teórica y experimental en el campo de la formación profesional, la investigación, la interacción y la producción. Asimismo, se pretende generar un proceso de desarrollo científico y tecnológico, a través de la asimilación, adecuación y desarrollo de procesos tecnológicos que contribuyan al desarrollo productivo de la región y del país.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- Manual de Funciones -->
    <section id="manual-funciones" class="manual section">
      <div class="container">
        <h2 class="section-title">Manual de Funciones</h2>
        
        <div class="accordion">
          <div 
            v-for="(item, index) in manualItems" 
            :key="index"
            class="accordion__item"
            :class="{ 'accordion__item--open': openAccordion === index }"
          >
            <button 
              class="accordion__trigger"
              @click="toggleAccordion(index)"
              :aria-expanded="openAccordion === index"
              :aria-controls="`accordion-content-${index}`"
            >
              <span class="accordion__title">{{ item.title }}</span>
              <svg 
                class="accordion__arrow" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            <div 
              :id="`accordion-content-${index}`"
              class="accordion__content"
              :hidden="openAccordion !== index"
            >
              <div class="accordion__body">
                <div v-if="item.unit" class="manual-section">
                  <h4>Unidad</h4>
                  <p>{{ item.unit }}</p>
                </div>
                
                <div v-if="item.position" class="manual-section">
                  <h4>Cargo</h4>
                  <p>{{ item.position }}</p>
                </div>
                
                <div v-if="item.dependency" class="manual-section">
                  <h4>Dependencia</h4>
                  <p>{{ item.dependency }}</p>
                </div>
                
                <div v-if="item.dependents" class="manual-section">
                  <h4>Dependientes</h4>
                  <p>{{ item.dependents }}</p>
                </div>
                
                <div v-if="item.authority" class="manual-section">
                  <h4>Autoridad</h4>
                  <p>{{ item.authority }}</p>
                </div>
                
                <div v-if="item.objective" class="manual-section">
                  <h4>Objetivo</h4>
                  <p>{{ item.objective }}</p>
                </div>
                
                <div v-if="item.functions && item.functions.length > 0" class="manual-section">
                  <h4>Funciones</h4>
                  <ul>
                    <li v-for="(func, idx) in item.functions" :key="idx">{{ func }}</li>
                  </ul>
                </div>
                
                <div v-if="item.responsibilities && item.responsibilities.length > 0" class="manual-section">
                  <h4>Responsabilidades</h4>
                  <ul>
                    <li v-for="(resp, idx) in item.responsibilities" :key="idx">{{ resp }}</li>
                  </ul>
                </div>
                
                <div v-if="item.relations" class="manual-section">
                  <h4>Relaciones</h4>
                  <p>{{ item.relations }}</p>
                </div>
                
                <div v-if="item.requirements" class="manual-section">
                  <h4>Requisitos</h4>
                  <div v-if="item.requirements.education" class="requirement-item">
                    <strong>Grado de Instrucción:</strong> {{ item.requirements.education }}
                  </div>
                  <div v-if="item.requirements.experience" class="requirement-item">
                    <strong>Experiencia:</strong> {{ item.requirements.experience }}
                  </div>
                  <div v-if="item.requirements.skills" class="requirement-item">
                    <strong>Habilidades y Destrezas:</strong> {{ item.requirements.skills }}
                  </div>
                  <div v-if="item.requirements.knowledge" class="requirement-item">
                    <strong>Otros Conocimientos:</strong> {{ item.requirements.knowledge }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Authority, InstitutionalGoal } from '@/types'
import autoridadesData from '@/data/autoridades.json'
import manualFuncionesData from '@/data/manual-funciones.json'
import { usePageSections } from '@/composables/usePageSections'

document.title = 'Nosotros - FCyT UMSS'

// Initialize page sections detection
usePageSections()

const openAccordion = ref<number | null>(null)

const authorities: Authority[] = autoridadesData as Authority[]

const manualItems = manualFuncionesData

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(word => word.length > 2)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
}

function toggleAccordion(index: number) {
  openAccordion.value = openAccordion.value === index ? null : index
}
</script>

<style scoped>
.institutional-page {
  min-height: 100vh;
}

/* Quick Navigation */
/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px; /* Header (64px) + Breadcrumb (24px+padding) */
}

/* Page Header */
.page-header {
  padding: var(--spacing-6) 0 var(--spacing-8);
  background: linear-gradient(135deg, var(--color-primary) 0%, #002D7A 100%);
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

/* History Section */
.history {
  background-color: var(--color-surface);
}

.history__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-10);
  align-items: start;
}

@media (max-width: 1023px) {
  .history__content {
    grid-template-columns: 1fr;
  }
}

.history__text p {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: #4B5563;
}

.history__text strong {
  color: var(--color-neutral-dark);
}

.history__timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.timeline-card {
  display: flex;
  gap: var(--spacing-4);
  padding: var(--spacing-4);
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--color-secondary);
}

.timeline-card__year {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  min-width: 60px;
}

.timeline-card__content h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-1);
  color: var(--color-neutral-dark);
}

.timeline-card__content p {
  font-size: var(--font-size-sm);
  color: #6B7280;
  margin: 0;
}

/* Authorities Section */
.authorities {
  background-color: var(--color-surface-variant);
}

.authorities__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 1023px) {
  .authorities__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 639px) {
  .authorities__grid {
    grid-template-columns: 1fr;
  }
}

.authority-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.authority-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.authority-card__image {
  padding: var(--spacing-6) var(--spacing-6) var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.authority-card__photo {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 4px solid var(--color-surface-variant);
}

.authority-card__placeholder {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--color-secondary) 0%, #002D7A 100%);
  border-radius: var(--radius-full);
  color: white;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.authority-card__content {
  padding: 0 var(--spacing-5) var(--spacing-6);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.authority-card__name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-2);
  min-height: 2.5em;
  line-height: 1.25;
  display: flex;
  align-items: center;
  justify-content: center;
}

.authority-card__role {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-3);
  min-height: 2.5em;
  line-height: 1.25;
  display: flex;
  align-items: center;
  justify-content: center;
}

.authority-card__email {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: #6B7280;
}

.authority-card__email:hover {
  color: var(--color-secondary);
}

/* Mission, Vision & Goals Section */
.mission-vision {
  background-color: var(--color-surface);
}

.mission-vision__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 767px) {
  .mission-vision__grid {
    grid-template-columns: 1fr;
  }
}

.mission-card {
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.mission-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.mission-card--full {
  grid-column: 1 / -1;
}

.mission-card__header {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.mission-card__icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.mission-card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  margin: 0;
}

.mission-card__content {
  font-size: var(--font-size-base);
  color: #4B5563;
  line-height: var(--line-height-relaxed);
  text-align: justify;
  margin: 0;
}

/* Manual Section (Accordion) */
.manual {
  background-color: var(--color-surface-variant);
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  max-width: 800px;
}

.accordion__item {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.accordion__trigger {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  padding: var(--spacing-5);
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background-color var(--transition-fast);
}

.accordion__trigger:hover {
  background-color: var(--color-surface-variant);
}

.accordion__icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.accordion__title {
  flex: 1;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
}

.accordion__arrow {
  color: #6B7280;
  transition: transform var(--transition-fast);
}

.accordion__item--open .accordion__arrow {
  transform: rotate(180deg);
}

.accordion__content {
  overflow: hidden;
}

.accordion__body {
  padding: var(--spacing-5);
}

.accordion__body p {
  font-size: var(--font-size-sm);
  color: #6B7280;
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-4);
}

.accordion__body ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
}

.accordion__body li {
  font-size: var(--font-size-sm);
  color: #4B5563;
  padding-left: var(--spacing-4);
  position: relative;
  line-height: var(--line-height-relaxed);
}

.accordion__body li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background-color: var(--color-secondary);
  border-radius: var(--radius-full);
}

.manual-section {
  margin-bottom: var(--spacing-6);
}

.manual-section:last-child {
  margin-bottom: 0;
}

.manual-section h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  border-bottom: 2px solid var(--color-surface-variant);
  padding-bottom: var(--spacing-2);
}

.manual-section p {
  margin-bottom: 0;
}

.requirement-item {
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: #4B5563;
  line-height: var(--line-height-relaxed);
}

.requirement-item strong {
  color: var(--color-neutral-dark);
  font-weight: var(--font-weight-semibold);
}
</style>
