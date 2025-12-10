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

    <!-- Admissions Wizard -->
    <AdmissionsWizard />
  </main>
</template>

<script setup lang="ts">
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import AcademicTimeline from '@/components/home/AcademicTimeline.vue'
import AdmissionsWizard from '@/components/home/AdmissionsWizard.vue'
import { usePageSections } from '@/composables/usePageSections'

// Title is handled by router meta, but we can double check
document.title = 'Inicio - Facultad de Ciencias y Tecnología'

// Initialize page sections
usePageSections()
</script>

<style scoped>
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
