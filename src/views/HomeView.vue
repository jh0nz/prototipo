<template>
  <main>
    <!-- Dashboard Grid: Carousel + Calendar -->
    <div class="container section dashboard-grid" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div class="dashboard-hero">
        <HeroCarousel />
      </div>
      <div class="dashboard-calendar">
        <AcademicTimeline />
      </div>
    </div>

    <!-- Stats Section -->
    <section id="estadisticas" class="section container stats-section" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div class="section-header">
        <h2 class="section-title">Estadísticas</h2>
        <p class="section-subtitle">Datos que respaldan nuestra excelencia académica</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">15,840</div>
            <div class="stat-label">Estudiantes Activos</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">21</div>
            <div class="stat-label">Programas Académicos</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">40+</div>
            <div class="stat-label">Años de Trayectoria</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-number">200+</div>
            <div class="stat-label">Docentes Especializados</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Careers Section -->
    <section id="carreras" class="section container careers-section" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div class="section-header">
        <h2 class="section-title">Nuestras Carreras</h2>
        <p class="section-subtitle">Formamos profesionales líderes en ciencia, tecnología e ingeniería</p>
      </div>
      
      <div class="careers-grid" :class="{ 'careers-grid--expanded': showAllCareers }">
        <div class="career-card" v-for="(career, index) in displayedCareers" :key="index">
          <div class="career-icon">{{ career.icon }}</div>
          <h3>{{ career.name }}</h3>
          <p>{{ career.description }}</p>
        </div>
      </div>

      <div class="careers-cta">
        <button @click="showAllCareers = !showAllCareers" class="btn btn-outline btn-lg">
          {{ showAllCareers ? 'Ver menos carreras' : 'Ver todas las carreras' }}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline :points="showAllCareers ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"/>
          </svg>
        </button>
      </div>
    </section>

    <!-- Services Section -->
    <section id="servicios" class="section container services-section" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div class="section-header">
        <h2 class="section-title">Servicios y Recursos</h2>
        <p class="section-subtitle">Todo lo que necesitas para tu formación académica</p>
      </div>

      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h3>Biblioteca Central</h3>
          <p>Más de 50,000 volúmenes especializados, acceso a bases de datos científicas y salas de estudio</p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <h3>Laboratorios Especializados</h3>
          <p>30+ laboratorios equipados con tecnología de punta para prácticas e investigación</p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          <h3>Bienestar Estudiantil</h3>
          <p>Carnet estudiantil, becas, seguro estudiantil y programas de salud</p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
          </div>
          <h3>Centro de Investigación</h3>
          <p>Proyectos de I+D+i con instituciones nacionales e internacionales</p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3>Aulas Virtuales</h3>
          <p>Plataforma Moodle y sistemas de gestión académica en línea</p>
        </div>

        <div class="service-card">
          <div class="service-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3>Orientación Académica</h3>
          <p>Asesoría para proyectos de grado, prácticas profesionales e intercambios</p>
        </div>
      </div>
    </section>

    <!-- Admissions CTA -->
    <section class="section container" style="padding-left: var(--spacing-4); padding-right: var(--spacing-4);">
      <div class="admissions-cta-home">
        <div class="cta-content">
          <div class="cta-badge">🎓 Admisiones 2026</div>
          <h2>Únete a la Comunidad FCyT</h2>
          <p>
            Inicia tu carrera profesional en una de las facultades más prestigiosas de Bolivia.
            Conoce los requisitos, fechas importantes y el proceso de admisión.
          </p>
          <div class="cta-highlights">
            <div class="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Examen: 15 de Enero 2026</span>
            </div>
            <div class="highlight-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Pre-inscripciones abiertas</span>
            </div>
          </div>
          <div class="cta-actions">
            <RouterLink to="/admision" class="btn btn-primary btn-lg">
              Ver Proceso de Admisión
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </RouterLink>
            <RouterLink to="/contacto" class="btn btn-outline btn-lg">
              Contactar Admisiones
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import AcademicTimeline from '@/components/home/AcademicTimeline.vue'
import { usePageSections } from '@/composables/usePageSections'

// Title is handled by router meta, but we can double check
document.title = 'Inicio - Facultad de Ciencias y Tecnología'

// Initialize page sections
usePageSections()

// Careers data
const careers = [
  { icon: '💻', name: 'Ingeniería de Sistemas', description: 'Desarrollo de software, sistemas de información y soluciones tecnológicas' },
  { icon: '🏗️', name: 'Ingeniería Civil', description: 'Construcción, infraestructura y gestión de proyectos' },
  { icon: '🏭', name: 'Ingeniería Industrial', description: 'Optimización de procesos y gestión de producción' },
  { icon: '⚙️', name: 'Ingeniería Electromecánica', description: 'Sistemas mecánicos, eléctricos y automatización industrial' },
  { icon: '🔬', name: 'Ingeniería Química', description: 'Procesos químicos, biotecnología y control de calidad' },
  { icon: '💾', name: 'Ingeniería Informática', description: 'Arquitectura de computadoras, redes y seguridad informática' },
  { icon: '⚡', name: 'Ingeniería Eléctrica', description: 'Sistemas de potencia, energías renovables y control automático' },
  { icon: '📡', name: 'Ingeniería Electrónica', description: 'Diseño de circuitos, telecomunicaciones y sistemas electrónicos' },
  { icon: '🍔', name: 'Ingeniería de Alimentos', description: 'Tecnología alimentaria y control de calidad' },
  { icon: '🔧', name: 'Ingeniería Mecánica', description: 'Diseño mecánico, manufactura y sistemas de energía' },
  { icon: '🧬', name: 'Ingeniería en Biotecnología', description: 'Aplicaciones biotecnológicas e ingeniería genética' },
  { icon: '🌿', name: 'Licenciatura en Biología', description: 'Ciencias biológicas, ecología y biodiversidad' },
  { icon: '🧪', name: 'Licenciatura en Química', description: 'Investigación científica y análisis químico aplicado' },
  { icon: '🔭', name: 'Licenciatura en Física', description: 'Investigación en física aplicada y teórica' },
  { icon: '📐', name: 'Ingeniería Matemática', description: 'Modelado matemático aplicado a problemas de ingeniería' },
  { icon: '📊', name: 'Licenciatura en Matemáticas', description: 'Matemática pura y análisis cuantitativo' },
  { icon: '🍽️', name: 'Tecnología Superior en Gastronomía', description: 'Arte culinario y gestión gastronómica' },
  { icon: '⚡', name: 'Ingeniería en Energía', description: 'Energías renovables y eficiencia energética' },
  { icon: '📚', name: 'Didáctica de la Matemática', description: 'Enseñanza y metodología educativa en matemáticas' },
  { icon: '🔬', name: 'Didáctica de la Física', description: 'Pedagogía y enseñanza de la física' }
]

const showAllCareers = ref(false)

const displayedCareers = computed(() => {
  return showAllCareers.value ? careers : careers.slice(0, 8)
})
</script>

<style scoped>
/* Dashboard Grid */
.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-6);
  padding-top: var(--spacing-6);
  padding-bottom: var(--spacing-6);
  min-height: 500px;
}

@media (min-width: 1024px) {
  .dashboard-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: var(--spacing-8);
    align-items: stretch;
  }

  .dashboard-hero,
  .dashboard-calendar {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .dashboard-hero :deep(section),
  .dashboard-calendar :deep(section) {
    height: 100%;
    flex: 1;
  }
}

/* Stats Section */
.stats-section {
  padding: var(--spacing-8) var(--spacing-4);
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-8);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-6);
}

.stat-card {
  background: white;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s, box-shadow 0.3s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--color-primary) 0%, #0066CC 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  stroke: white;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-secondary);
  font-weight: 600;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: var(--spacing-8);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-2);
}

.section-subtitle {
  font-size: 1.125rem;
  color: var(--color-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Careers Section */
.careers-section {
  padding: var(--spacing-10) var(--spacing-4);
}

.careers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

.career-card {
  background: white;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  border: 2px solid #E2E8F0;
  transition: all 0.3s;
  text-align: center;
}

.career-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.career-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-3);
}

.career-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-2);
}

.career-card p {
  font-size: 0.9rem;
  color: var(--color-secondary);
  line-height: 1.5;
  margin: 0;
}

.careers-cta {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-8);
}

/* Services Section */
.services-section {
  padding: var(--spacing-10) var(--spacing-4);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-6);
}

.service-card {
  background: white;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}

.service-card:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-4px);
/* Careers Section */
.careers-section {
  padding: var(--spacing-10) var(--spacing-4);
}

.careers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-8);
  transition: all 0.3s ease;
} margin-bottom: var(--spacing-4);
}

.service-icon svg {
  stroke: var(--color-primary);
}

.service-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-neutral-dark);
  margin-bottom: var(--spacing-2);
}

.service-card p {
  font-size: 0.95rem;
  color: var(--color-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Admissions CTA */
.admissions-cta-home {
  background: linear-gradient(135deg, var(--color-primary) 0%, #0052A3 100%);
  border-radius: var(--radius-xl);
  padding: var(--spacing-10);
  color: white;
  box-shadow: var(--shadow-2xl);
  position: relative;
  overflow: hidden;
}

.admissions-cta-home::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  border-radius: 50%;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-badge {
  display: inline-block;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--spacing-4);
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: var(--spacing-3);
  color: white;
}

.cta-content p {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-6);
  opacity: 0.95;
  line-height: 1.6;
}

.cta-highlights {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.15);
  padding: 10px 20px;
  border-radius: var(--radius-lg);
  font-weight: 600;
}

.highlight-item svg {
  stroke: #4ADE80;
  flex-shrink: 0;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-4);
  justify-content: center;
}

.cta-actions .btn {
  min-width: 200px;
}

.cta-actions .btn-outline {
  background: white;
  color: var(--color-primary);
  border-color: white;
}

.cta-actions .btn-outline:hover {
  background: transparent;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-card {
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }

  .careers-grid {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }

  .cta-actions {
    flex-direction: column;
  }

  .cta-actions .btn {
    width: 100%;
  }

  .cta-highlights {
    flex-direction: column;
  }
}
</style>
