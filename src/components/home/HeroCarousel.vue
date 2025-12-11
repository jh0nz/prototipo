<template>
  <section class="hero" aria-label="Noticias destacadas">
    <div class="carousel" role="region" aria-roledescription="carrusel" aria-label="Noticias principales">
      <!-- Carousel Track -->
      <div 
        class="carousel__track" 
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
          <article 
            v-for="(news, index) in newsItems" 
            :key="news.id"
            class="carousel__slide"
            :aria-hidden="index !== currentSlide"
            role="group"
            :aria-roledescription="`Slide ${index + 1} de ${newsItems.length}`"
            :aria-label="news.title"
          >
            <div class="news-card">
              <div class="news-card__image-wrapper">
                <iframe 
                  v-if="news.id === 1"
                  :src="`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`"
                  class="news-card__pdf-preview"
                  title="Vista previa del PDF"
                  scrolling="no"
                ></iframe>
                <img 
                  v-else
                  :src="news.image" 
                  :alt="news.title"
                  class="news-card__image"
                  loading="lazy"
                />
                <div class="news-card__overlay"></div>
              </div>
              <div class="news-card__content">
                <div class="news-card__tags">
                  <span 
                    v-for="tag in news.tags" 
                    :key="tag" 
                    class="chip"
                    :class="getTagClass(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
                <time class="news-card__date" :datetime="news.date">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ formatDate(news.date) }}
                </time>
                <h2 class="news-card__title">{{ news.title }}</h2>
                <p v-if="news.excerpt" class="news-card__excerpt">{{ news.excerpt }}</p>
                <button 
                  v-if="news.id === 1"
                  @click="openPdfPreview"
                  class="btn btn-primary btn-lg"
                >
                  {{ news.cta }}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
                <a 
                  v-else
                  :href="news.ctaLink" 
                  class="btn btn-primary btn-lg"
                >
                  {{ news.cta }}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- Carousel Controls -->
        <button 
          class="carousel__control carousel__control--prev"
          @click="prevSlide"
          aria-label="Noticia anterior"
          :disabled="currentSlide === 0"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button 
          class="carousel__control carousel__control--next"
          @click="nextSlide"
          aria-label="Siguiente noticia"
          :disabled="currentSlide === newsItems.length - 1"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <!-- Carousel Indicators -->
        <div class="carousel__indicators" role="tablist">
          <button 
            v-for="(news, index) in newsItems" 
            :key="index"
            class="carousel__indicator"
            :class="{ 'carousel__indicator--active': index === currentSlide }"
            @click="goToSlide(index)"
            role="tab"
            :aria-selected="index === currentSlide"
            :aria-label="`Ir a noticia ${index + 1}: ${news.title}`"
          >
            <span class="sr-only">Noticia {{ index + 1 }}</span>
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="carousel__progress">
          <div 
            class="carousel__progress-bar"
            :style="{ width: `${progressWidth}%` }"
          ></div>
        </div>
      </div>
    <!-- PDF Preview Modal -->
    <Teleport to="body">
      <div 
        v-if="showPdfModal" 
        class="pdf-modal"
        @click="closePdfPreview"
      >
        <div class="pdf-modal__content" @click.stop>
          <button 
            class="pdf-modal__close"
            @click="closePdfPreview"
            aria-label="Cerrar vista previa"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <iframe 
            :src="pdfUrl"
            class="pdf-modal__iframe"
            title="Vista previa del PDF"
          ></iframe>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { NewsItem } from '@/types'
import noticiasData from '@/data/noticias.json'

const showPdfModal = ref(false)
const pdfUrl = 'https://www.fcyt.umss.edu.bo/wp-content/uploads/2025/12/ConvocatoriaExamenIngreso-1-2026.pdf'

function openPdfPreview() {
  showPdfModal.value = true
  document.body.style.overflow = 'hidden'
}

function closePdfPreview() {
  showPdfModal.value = false
  document.body.style.overflow = ''
}

const newsItems: NewsItem[] = noticiasData as NewsItem[]

const currentSlide = ref(0)
const autoplayInterval = ref<number | null>(null)
const progressWidth = ref(0)
const progressInterval = ref<number | null>(null)

const SLIDE_DURATION = 5000 // 5 seconds

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % newsItems.length
  resetProgress()
}

function prevSlide() {
  currentSlide.value = currentSlide.value === 0 
    ? newsItems.length - 1 
    : currentSlide.value - 1
  resetProgress()
}

function goToSlide(index: number) {
  currentSlide.value = index
  resetProgress()
}

function resetProgress() {
  progressWidth.value = 0
}

function startAutoplay() {
  // Progress animation
  const startTime = Date.now()
  progressInterval.value = window.setInterval(() => {
    const elapsed = Date.now() - startTime
    progressWidth.value = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
  }, 50)

  // Slide change
  autoplayInterval.value = window.setInterval(() => {
    nextSlide()
  }, SLIDE_DURATION)
}

function stopAutoplay() {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value)
    autoplayInterval.value = null
  }
  if (progressInterval.value) {
    clearInterval(progressInterval.value)
    progressInterval.value = null
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-BO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getTagClass(tag: string): string {
  if (tag.includes('Admisión') || tag.includes('Nuevo')) return 'chip-primary'
  if (tag.includes('Investigación')) return 'chip-secondary'
  if (tag.includes('Eventos')) return 'chip-accent'
  return 'chip-primary'
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.hero {
  /* Removed padding and background to fit in grid */
  height: 100%;
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}

.carousel__track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel__slide {
  flex: 0 0 100%;
  min-width: 100%;
}

/* News Card */
.news-card {
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: flex-end;
}

@media (max-width: 767px) {
  .news-card {
    min-height: 400px;
  }
}

.news-card__image-wrapper {
  position: absolute;
  inset: 0;
}

.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__pdf-preview {
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none;
  overflow: hidden;
  transform: scale(1.1);
  transform-origin: top center;
}

.news-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(15, 23, 42, 0.7) 40%,
    rgba(15, 23, 42, 0.2) 100%
  );
}

.news-card__content {
  position: relative;
  z-index: 1;
  padding: var(--spacing-10);
  color: white;
  max-width: 700px;
}

@media (max-width: 767px) {
  .news-card__content {
    padding: var(--spacing-6);
  }
}

.news-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-4);
}

.news-card__tags .chip {
  font-size: var(--font-size-xs);
  padding: var(--spacing-1) var(--spacing-3);
}

.news-card__date {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--spacing-3);
}

.news-card__title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  margin-bottom: var(--spacing-4);
  color: white;
}

@media (min-width: 768px) {
  .news-card__title {
    font-size: var(--font-size-3xl);
  }
}

.news-card__excerpt {
  font-size: var(--font-size-base);
  color: rgba(255, 255, 255, 0.85);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-6);
  max-width: 550px;
}

/* Carousel Controls */
.carousel__control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-neutral-dark);
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-md);
  z-index: 2;
}

.carousel__control:hover:not(:disabled) {
  background-color: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel__control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel__control--prev {
  left: var(--spacing-4);
}

.carousel__control--next {
  right: var(--spacing-4);
}

@media (max-width: 767px) {
  .carousel__control {
    width: 40px;
    height: 40px;
  }
  
  .carousel__control--prev {
    left: var(--spacing-2);
  }
  
  .carousel__control--next {
    right: var(--spacing-2);
  }
}

/* Carousel Indicators */
.carousel__indicators {
  position: absolute;
  bottom: var(--spacing-6);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-2);
  z-index: 2;
}

.carousel__indicator {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.carousel__indicator:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.carousel__indicator--active {
  background-color: white;
  width: 32px;
}

/* Progress Bar */
.carousel__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
}

.carousel__progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  transition: width 0.05s linear;
}

/* PDF Modal */
.pdf-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--spacing-4);
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pdf-modal__content {
  background-color: white;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: var(--shadow-2xl);
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.pdf-modal__close {
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all var(--transition-fast);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.3);
  z-index: 10;
  transform: translate(65%, -45%);
}

.pdf-modal__close:hover,
.pdf-modal__close:focus-visible {
  background: rgba(200, 16, 46, 0.95);
  border-color: transparent;
  transform: translate(65%, -45%) scale(1.03);
}

.pdf-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--color-neutral-light);
  gap: var(--spacing-4);
}

.pdf-modal__header h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-dark);
  margin: 0;
  flex: 1;
}

.pdf-modal__header .btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  white-space: nowrap;
}

.pdf-modal__iframe {
  flex: 1;
  border: none;
  width: 100%;
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

@media (max-width: 767px) {
  .pdf-modal {
    padding: 0;
  }

  .pdf-modal__content {
    height: 100vh;
    max-width: 100%;
    border-radius: 0;
  }

  .pdf-modal__header {
    flex-direction: column;
    align-items: flex-start;
    padding: var(--spacing-4);
  }

  .pdf-modal__header h3 {
    font-size: var(--font-size-lg);
  }

  .pdf-modal__close {
    top: var(--spacing-2);
    right: var(--spacing-2);
  }

  .pdf-modal__iframe {
    border-radius: 0;
  }
}
</style>
