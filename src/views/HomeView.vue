<template>
  <div class="home-page">
    <!-- Hero Carousel -->
    <HeroCarousel />
    
    <!-- Quick Access Buttons -->
    <QuickActions />
    
    <!-- Academic Calendar Timeline -->
    <AcademicTimeline />
    
    <!-- Admissions Wizard -->
    <AdmissionsWizard />
  </div>
</template>

<script setup lang="ts">
import HeroCarousel from '@/components/home/HeroCarousel.vue'
import QuickActions from '@/components/home/QuickActions.vue'
import AcademicTimeline from '@/components/home/AcademicTimeline.vue'
import AdmissionsWizard from '@/components/home/AdmissionsWizard.vue'
import { usePageSections } from '@/composables/usePageSections'

// SEO Meta
document.title = 'FCyT UMSS - Facultad de Ciencias y Tecnología'

// Initialize page sections detection (Home page doesn't have sections, but we initialize for consistency)
usePageSections()
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}
</style>
