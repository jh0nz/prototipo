<template>
  <div class="institutional-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb container" aria-label="Ubicación">
      <RouterLink to="/" class="breadcrumb__link">Inicio</RouterLink>
      <span class="breadcrumb__separator">/</span>
      <span class="breadcrumb__current">Institucional</span>
    </nav>

    <!-- Page Header -->
    <header class="page-header">
      <div class="container">
        <h1 class="page-header__title">Información Institucional</h1>
        <p class="page-header__subtitle">
          Conoce nuestra historia, misión y las personas que hacen posible la excelencia académica
        </p>
      </div>
    </header>

    <!-- History Section -->
    <section class="history section">
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
    <section class="authorities section">
      <div class="container">
        <h2 class="section-title">Autoridades</h2>
        
        <div class="authorities__grid">
          <article 
            v-for="authority in authorities" 
            :key="authority.id"
            class="authority-card"
          >
            <div class="authority-card__image">
              <div class="authority-card__placeholder">
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

    <!-- Goals Section -->
    <section class="goals section">
      <div class="container">
        <h2 class="section-title">Metas y Objetivos</h2>
        
        <div class="goals__grid">
          <article 
            v-for="goal in goals" 
            :key="goal.id"
            class="goal-card"
          >
            <div class="goal-card__icon">
              <span>{{ goal.icon }}</span>
            </div>
            <h3 class="goal-card__title">{{ goal.title }}</h3>
            <p class="goal-card__description">{{ goal.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Manual de Funciones -->
    <section class="manual section">
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
              <span class="accordion__icon">{{ item.icon }}</span>
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
                <p>{{ item.content }}</p>
                <ul v-if="item.items">
                  <li v-for="subitem in item.items" :key="subitem">{{ subitem }}</li>
                </ul>
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

document.title = 'Institucional - FCyT UMSS'

const openAccordion = ref<number | null>(null)

const authorities: Authority[] = [
  { 
    id: 1, 
    name: 'Dr. Juan Carlos Mendoza García',
    role: 'Decano',
    image: '',
    email: 'decanato@fcyt.umss.edu.bo'
  },
  { 
    id: 2, 
    name: 'Ing. María Elena Rojas Velásquez',
    role: 'Directora Académica',
    image: '',
    email: 'academica@fcyt.umss.edu.bo'
  },
  { 
    id: 3, 
    name: 'Dr. Roberto Fernández Quiroga',
    role: 'Director de Investigación',
    image: '',
    email: 'investigacion@fcyt.umss.edu.bo'
  },
  { 
    id: 4, 
    name: 'Msc. Ana Patricia Vargas López',
    role: 'Directora de Postgrado',
    image: '',
    email: 'postgrado@fcyt.umss.edu.bo'
  }
]

const goals: InstitutionalGoal[] = [
  {
    id: 1,
    title: 'Excelencia Académica',
    description: 'Formar profesionales competentes con sólidos conocimientos científicos y tecnológicos, capaces de responder a las demandas del mercado laboral.',
    icon: '🎓'
  },
  {
    id: 2,
    title: 'Investigación e Innovación',
    description: 'Promover la investigación científica y tecnológica para contribuir al desarrollo sostenible de Bolivia y la región.',
    icon: '🔬'
  },
  {
    id: 3,
    title: 'Vinculación Social',
    description: 'Establecer vínculos con la sociedad, el sector productivo y las instituciones públicas para transferir conocimiento y tecnología.',
    icon: '🤝'
  },
  {
    id: 4,
    title: 'Internacionalización',
    description: 'Fomentar la cooperación internacional y la movilidad académica para enriquecer la formación de estudiantes y docentes.',
    icon: '🌍'
  }
]

const manualItems = [
  {
    title: 'Decanato',
    icon: '👔',
    content: 'El Decanato es la máxima autoridad ejecutiva de la Facultad, responsable de la gestión administrativa y académica.',
    items: [
      'Representar oficialmente a la Facultad',
      'Presidir el Consejo Facultativo',
      'Supervisar la gestión académica y administrativa',
      'Gestionar convenios interinstitucionales'
    ]
  },
  {
    title: 'Dirección Académica',
    icon: '📚',
    content: 'La Dirección Académica coordina y supervisa las actividades de enseñanza-aprendizaje de todas las carreras.',
    items: [
      'Planificar y coordinar actividades académicas',
      'Supervisar el cumplimiento de planes de estudio',
      'Gestionar procesos de evaluación docente',
      'Coordinar calendarios académicos'
    ]
  },
  {
    title: 'Dirección de Investigación',
    icon: '🔬',
    content: 'La Dirección de Investigación promueve y coordina las actividades de investigación científica y tecnológica.',
    items: [
      'Promover proyectos de investigación',
      'Gestionar financiamiento para investigación',
      'Coordinar publicaciones científicas',
      'Organizar eventos académicos y científicos'
    ]
  },
  {
    title: 'Dirección de Postgrado',
    icon: '🎓',
    content: 'La Dirección de Postgrado administra los programas de especialización, maestría y doctorado.',
    items: [
      'Diseñar y actualizar programas de postgrado',
      'Coordinar actividades de formación continua',
      'Gestionar admisiones a programas de postgrado',
      'Supervisar la calidad académica de los programas'
    ]
  },
  {
    title: 'Administración y Finanzas',
    icon: '💼',
    content: 'El área de Administración y Finanzas gestiona los recursos económicos y materiales de la Facultad.',
    items: [
      'Elaborar y ejecutar el presupuesto',
      'Gestionar adquisiciones y contratos',
      'Administrar recursos humanos',
      'Mantener la infraestructura física'
    ]
  }
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(word => word.length > 2)
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

function toggleAccordion(index: number) {
  openAccordion.value = openAccordion.value === index ? null : index
}
</script>

<style scoped>
.institutional-page {
  min-height: 100vh;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding-top: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  font-size: var(--font-size-sm);
}

.breadcrumb__link {
  color: var(--color-secondary);
}

.breadcrumb__separator {
  color: #9CA3AF;
}

.breadcrumb__current {
  color: #6B7280;
}

/* Page Header */
.page-header {
  padding: var(--spacing-8) 0 var(--spacing-12);
  background: linear-gradient(135deg, var(--color-secondary) 0%, #002D7A 100%);
  color: white;
  margin-bottom: var(--spacing-8);
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
}

.authority-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.authority-card__image {
  padding: var(--spacing-6) var(--spacing-6) var(--spacing-4);
}

.authority-card__placeholder {
  width: 100px;
  height: 100px;
  margin: 0 auto;
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
}

.authority-card__name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-1);
}

.authority-card__role {
  font-size: var(--font-size-sm);
  color: var(--color-primary);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-3);
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

/* Goals Section */
.goals {
  background-color: var(--color-surface);
}

.goals__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-6);
}

@media (max-width: 1023px) {
  .goals__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 639px) {
  .goals__grid {
    grid-template-columns: 1fr;
  }
}

.goal-card {
  padding: var(--spacing-6);
  background-color: var(--color-surface-variant);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all var(--transition-normal);
}

.goal-card:hover {
  background-color: var(--color-secondary-light);
  transform: translateY(-4px);
}

.goal-card__icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-4);
}

.goal-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-3);
}

.goal-card__description {
  font-size: var(--font-size-sm);
  color: #6B7280;
  line-height: var(--line-height-relaxed);
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
  padding: 0 var(--spacing-5) var(--spacing-5);
  padding-left: calc(var(--spacing-5) + 1.5rem + var(--spacing-4));
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
}

.accordion__body li {
  font-size: var(--font-size-sm);
  color: #4B5563;
  padding-left: var(--spacing-4);
  position: relative;
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
</style>
