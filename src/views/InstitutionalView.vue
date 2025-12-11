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
              Desde su creación, hemos sido pioneros en la formación de profesionales en ingeniería y tecnología, 
              contribuyendo al desarrollo científico y tecnológico del país con más de cuatro décadas de excelencia académica.
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
              <span class="mission-card__icon mdi mdi-target"></span>
              <h3 class="mission-card__title">Misión</h3>
            </div>
            <p class="mission-card__content">
              Formamos profesionales calificados, líderes, éticos y con conciencia ciudadana. Generamos y aplicamos conocimiento científico y tecnológico desde nuestro Parque Científico, ofreciendo servicios especializados de calidad. Transferimos tecnología y consolidamos sistemas de innovación para mejorar la competitividad regional y nacional.
            </p>
          </article>

          <article class="mission-card">
            <div class="mission-card__header">
              <span class="mission-card__icon mdi mdi-telescope"></span>
              <h3 class="mission-card__title">Visión</h3>
            </div>
            <p class="mission-card__content">
              Ser una facultad referente en ciencias y tecnología a nivel nacional e internacional, reconocida por la excelencia de nuestros profesionales, la calidad de nuestra investigación científica y tecnológica, y por impulsar la economía del conocimiento a través de nuestro Parque Científico.
            </p>
          </article>

          <article class="mission-card mission-card--full">
            <div class="mission-card__header">
              <span class="mission-card__icon mdi mdi-school"></span>
              <h3 class="mission-card__title">Metas y Objetivos</h3>
            </div>
            <p class="mission-card__content">
              Contribuir al desarrollo productivo de la región y el país mediante la formación profesional de excelencia, la investigación aplicada y la innovación tecnológica. Generamos procesos de desarrollo científico y tecnológico que impulsan la competitividad y el crecimiento sostenible.
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
                <!-- Header compacto -->
                <div class="manual-header">
                  <div v-if="item.unit" class="manual-header__unit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {{ item.unit }}
                  </div>
                </div>
                
                <!-- Objetivo destacado -->
                <div v-if="item.objective" class="manual-objective">
                  <svg class="manual-objective__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                  <p>{{ item.objective }}</p>
                </div>
                
                <!-- Grid de información -->
                <div class="manual-grid">
                  <div v-if="item.dependency" class="manual-item">
                    <span class="manual-item__label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="17 11 12 6 7 11"/>
                        <polyline points="17 18 12 13 7 18"/>
                      </svg>
                      Depende de
                    </span>
                    <span class="manual-item__value">{{ item.dependency }}</span>
                  </div>
                  
                  <div v-if="item.dependents" class="manual-item">
                    <span class="manual-item__label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      Supervisa
                    </span>
                    <span class="manual-item__value">{{ item.dependents }}</span>
                  </div>
                  
                  <div v-if="item.authority" class="manual-item">
                    <span class="manual-item__label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Autoridad
                    </span>
                    <span class="manual-item__value">{{ item.authority }}</span>
                  </div>
                  
                  <div v-if="item.relations" class="manual-item">
                    <span class="manual-item__label">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      Relaciones
                    </span>
                    <span class="manual-item__value">{{ item.relations }}</span>
                  </div>
                </div>
                
                <!-- Funciones compactas -->
                <div v-if="item.functions && item.functions.length > 0" class="manual-list">
                  <h4 class="manual-list__title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="9" y1="15" x2="15" y2="15"/>
                    </svg>
                    Funciones
                  </h4>
                  <ul class="manual-list__items">
                    <li v-for="(func, idx) in item.functions.slice(0, 5)" :key="idx">{{ func }}</li>
                    <li v-if="item.functions.length > 5" class="manual-list__more">
                      + {{ item.functions.length - 5 }} funciones más
                    </li>
                  </ul>
                </div>
                
                <!-- Responsabilidades compactas -->
                <div v-if="item.responsibilities && item.responsibilities.length > 0" class="manual-list">
                  <h4 class="manual-list__title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 11 12 14 22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    Responsabilidades
                  </h4>
                  <ul class="manual-list__items">
                    <li v-for="(resp, idx) in item.responsibilities.slice(0, 5)" :key="idx">{{ resp }}</li>
                    <li v-if="item.responsibilities.length > 5" class="manual-list__more">
                      + {{ item.responsibilities.length - 5 }} responsabilidades más
                    </li>
                  </ul>
                </div>
                
                <!-- Requisitos en formato chips -->
                <div v-if="item.requirements" class="manual-requirements">
                  <h4 class="manual-list__title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                    </svg>
                    Requisitos
                  </h4>
                  <div class="requirement-chips">
                    <div v-if="item.requirements.education" class="chip">
                      <span class="chip__label">Educación</span>
                      <span class="chip__value">{{ item.requirements.education }}</span>
                    </div>
                    <div v-if="item.requirements.experience" class="chip">
                      <span class="chip__label">Experiencia</span>
                      <span class="chip__value">{{ item.requirements.experience }}</span>
                    </div>
                    <div v-if="item.requirements.skills" class="chip chip--full">
                      <span class="chip__label">Habilidades</span>
                      <span class="chip__value">{{ item.requirements.skills }}</span>
                    </div>
                    <div v-if="item.requirements.knowledge" class="chip chip--full">
                      <span class="chip__label">Conocimientos</span>
                      <span class="chip__value">{{ item.requirements.knowledge }}</span>
                    </div>
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
  max-width: 600px; /* Keep max-width for readability */
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
  color: var(--color-secondary);
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
  padding: var(--spacing-4);
  background-color: #FAFBFC;
}

@media (min-width: 640px) {
  .accordion__body {
    padding: var(--spacing-6);
  }
}

/* Header del manual */
.manual-header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.manual-header__unit {
  font-size: var(--font-size-sm);
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.manual-header__unit svg {
  flex-shrink: 0;
  color: var(--color-secondary);
}

/* Objetivo destacado */
.manual-objective {
  background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  border-left: 4px solid #F59E0B;
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-4);
  display: flex;
  gap: var(--spacing-3);
  align-items: start;
}

.manual-objective__icon {
  flex-shrink: 0;
  color: #D97706;
  margin-top: 2px;
}

.manual-objective p {
  font-size: var(--font-size-sm);
  color: #92400E;
  line-height: 1.5;
  margin: 0;
}

/* Grid de información */
.manual-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

@media (min-width: 640px) {
  .manual-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.manual-item {
  background-color: white;
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
  border: 1px solid #E5E7EB;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.manual-item__label {
  font-size: var(--font-size-xs);
  color: #9CA3AF;
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
}

.manual-item__label svg {
  flex-shrink: 0;
  color: var(--color-secondary);
}

.manual-item__value {
  font-size: var(--font-size-sm);
  color: var(--color-neutral-dark);
  line-height: 1.4;
}

/* Listas compactas */
.manual-list {
  margin-bottom: var(--spacing-4);
}

.manual-list__title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  margin-bottom: var(--spacing-3);
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.manual-list__title svg {
  flex-shrink: 0;
  color: var(--color-secondary);
}

.manual-list__items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  padding-left: 0;
}

.manual-list__items li {
  font-size: var(--font-size-sm);
  color: #374151;
  padding-left: var(--spacing-4);
  position: relative;
  line-height: 1.5;
}

.manual-list__items li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-secondary);
  font-weight: bold;
  font-size: 1.2em;
}

.manual-list__more {
  color: #6B7280;
  font-style: italic;
  font-size: var(--font-size-xs);
}

.manual-list__more::before {
  content: '⋯';
  color: #9CA3AF;
}

/* Requisitos en formato chips */
.manual-requirements {
  margin-bottom: 0;
}

.requirement-chips {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-2);
}

@media (min-width: 640px) {
  .requirement-chips {
    grid-template-columns: repeat(2, 1fr);
  }
}

.chip {
  background-color: white;
  border: 1px solid #E5E7EB;
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
  transition: all var(--transition-fast);
}

.chip:hover {
  border-color: var(--color-secondary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.chip--full {
  grid-column: 1 / -1;
}

.chip__label {
  font-size: var(--font-size-xs);
  color: var(--color-secondary);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chip__value {
  font-size: var(--font-size-sm);
  color: #374151;
  line-height: 1.4;
}
</style>
