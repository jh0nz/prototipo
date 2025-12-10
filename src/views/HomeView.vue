<template>
  <main>
    <!-- Dashboard Grid: Carousel + Calendar -->
    <div class="container section dashboard-grid">
      <div class="dashboard-hero">
        <HeroCarousel />
      </div>
      <div class="dashboard-calendar">
        <AcademicTimeline />
      </div>
    </div>

    <!-- About Section -->
    <section class="section container about-section">
      <div class="about-content">
        <h2 class="title-accent">Ciencia y Tecnología al Servicio del País</h2>
        <p>
          La <strong>Facultad de Ciencias y Tecnología (FCyT)</strong> es referente nacional en la formación de ingenieros y científicos de excelencia. 
          Con más de 40 años de trayectoria, impulsamos la investigación, la innovación tecnológica y el desarrollo académico 
          para responder a los desafíos del futuro.
        </p>
      </div>
    </section>

    <!-- Admissions CTA -->
    <section class="section container">
      <div class="admissions-cta-home">
        <div class="cta-text">
          <h2>Admisiones FCyT 2026</h2>
          <p>
            ¿Quieres formar parte de nuestra comunidad? Sigue nuestra guía paso a paso para postularte.
            <br>
            <strong>Próximo Examen: 15 de Enero 2026</strong>
          </p>
        </div>
        <div class="cta-action">
          <RouterLink to="/admision" class="btn btn-primary btn-lg">
            Ver Requisitos e Inscribirse
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import AcademicTimeline from '@/components/home/AcademicTimeline.vue'
import { usePageSections } from '@/composables/usePageSections'

// Title is handled by router meta, but we can double check
document.title = 'Inicio - Facultad de Ciencias y Tecnología'

// Initialize page sections
usePageSections()
</script>

<style scoped>
/* ... existing styles ... */
/* Add CTA styles */
.admissions-cta-home {
  background: linear-gradient(135deg, var(--color-primary-light) 0%, white 100%);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-6);
  box-shadow: var(--shadow-md);
}

.cta-text h2 {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-2);
}

.cta-text p {
  font-size: var(--font-size-lg);
  color: var(--color-neutral-dark);
  margin: 0;
}

@media (max-width: 768px) {
  .admissions-cta-home {
    flex-direction: column;
    text-align: center;
  }
}

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
    grid-template-columns: 1.4fr 1fr; /* Carousel larger than calendar */
    gap: var(--spacing-8);
    align-items: stretch; /* Stretch to fill height */
  }

  .dashboard-hero,
  .dashboard-calendar {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  /* Make children fill the height */
  .dashboard-hero :deep(section),
  .dashboard-calendar :deep(section) {
    height: 100%;
    flex: 1;
  }
}

.about-section {
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: var(--spacing-8);
}

.title-accent {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
  margin-bottom: var(--spacing-4);
}

.about-content p {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  color: var(--color-neutral-dark);
}
</style>
